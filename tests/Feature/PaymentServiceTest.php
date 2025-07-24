<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Course;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\PaymentConfirmationEmail;
use Exception;

class PaymentServiceTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $paymentService;
    protected $user;
    protected $course;

    protected function setUp(): void
    {
        parent::setUp();
        $this->paymentService = new PaymentService();
        $this->user = User::factory()->create();
        $this->course = Course::factory()->create(['price' => 100.00]);

        // Mock Paystack API responses
        Http::fake([
            'https://api.paystack.co/transaction/initialize' => Http::response([
                'status' => true,
                'message' => 'Authorization URL created',
                'data' => [
                    'authorization_url' => 'https://checkout.paystack.com/mock_auth_url',
                    'access_code' => 'mock_access_code',
                    'reference' => 'mock_ref_' . uniqid(),
                ],
            ], 200),
            'https://api.paystack.co/transaction/verify/*' => Http::response([
                'status' => true,
                'message' => 'Verification successful',
                'data' => [
                    'id' => $this->faker->randomNumber(5),
                    'reference' => 'mock_ref_verified',
                    'status' => 'success',
                    'amount' => 10000, // 100 Naira in kobo
                    'currency' => 'NGN',
                    'metadata' => [
                        'user_id' => $this->user->id,
                        'payable_type' => Course::class,
                        'payable_id' => $this->course->id,
                    ],
                    'customer' => ['email' => $this->user->email],
                ],
            ], 200),
        ]);

        Mail::fake(); // Fake mail sending
        Log::fake(); // Fake logging
    }

    /** @test */
    public function it_can_initialize_a_payment()
    {
        $amount = 100.00;
        $callbackUrl = 'http://localhost/payments/callback';
        $reference = 'test_ref_' . uniqid();
        $payableType = Course::class;
        $payableId = $this->course->id;

        $result = $this->paymentService->initializePayment(
            $this->user,
            $amount,
            $callbackUrl,
            $reference,
            $payableType,
            $payableId
        );

        $this->assertArrayHasKey('authorization_url', $result);
        $this->assertArrayHasKey('access_code', $result);
        $this->assertArrayHasKey('reference', $result);
        $this->assertEquals('https://checkout.paystack.com/mock_auth_url', $result['authorization_url']);

        Http::assertSent(function ($request) use ($amount, $reference, $callbackUrl, $payableType, $payableId) {
            return $request->url() === 'https://api.paystack.co/transaction/initialize' &&
                   $request->method() === 'POST' &&
                   $request['email'] === $this->user->email &&
                   $request['amount'] === $amount * 100 &&
                   $request['callback_url'] === $callbackUrl &&
                   $request['reference'] === $reference &&
                   $request['metadata']['user_id'] === $this->user->id &&
                   $request['metadata']['payable_type'] === $payableType &&
                   $request['metadata']['payable_id'] === $payableId;
        });
    }

    /** @test */
    public function it_throws_exception_on_failed_initialization()
    {
        Http::fake([
            'https://api.paystack.co/transaction/initialize' => Http::response([
                'status' => false,
                'message' => 'Invalid Data',
            ], 400),
        ]);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Paystack initialization failed: Invalid Data');

        $this->paymentService->initializePayment(
            $this->user,
            100.00,
            'http://localhost/payments/callback',
            'test_ref_fail',
            Course::class,
            $this->course->id
        );

        Log::assertSent('error', function ($message, $context) {
            return str_contains($message, 'Paystack initialization failed: Invalid Data');
        });
    }

    /** @test */
    public function it_can_verify_a_successful_payment_and_enroll_user()
    {
        $reference = 'mock_ref_verified';

        $payment = $this->paymentService->verifyPayment($reference);

        $this->assertInstanceOf(Payment::class, $payment);
        $this->assertEquals($reference, $payment->reference);
        $this->assertEquals('success', $payment->status);
        $this->assertEquals(100.00, $payment->amount); // 10000 kobo / 100
        $this->assertEquals($this->user->id, $payment->user_id);
        $this->assertEquals(Course::class, $payment->payable_type);
        $this->assertEquals($this->course->id, $payment->payable_id);

        $this->assertDatabaseHas('payments', [
            'reference' => $reference,
            'status' => 'success',
            'user_id' => $this->user->id,
            'payable_type' => Course::class,
            'payable_id' => $this->course->id,
        ]);

        $this->assertDatabaseHas('enrollments', [
            'user_id' => $this->user->id,
            'course_id' => $this->course->id,
            'status' => 'ENROLLED',
        ]);

        Mail::assertQueued(PaymentConfirmationEmail::class, function ($mail) use ($payment) {
            return $mail->hasTo($this->user->email) &&
                   $mail->payment->id === $payment->id &&
                   $mail->item->id === $this->course->id;
        });

        Log::assertSent('info', function ($message, $context) {
            return str_contains($message, "User {$this->user->id} enrolled in course {$this->course->id} after payment.");
        });
    }

    /** @test */
    public function it_does_not_re_enroll_user_if_already_enrolled()
    {
        // Manually enroll user first
        $this->course->enrollments()->create([
            'user_id' => $this->user->id,
            'enrollment_date' => now(),
            'status' => 'ENROLLED',
        ]);

        $this->assertDatabaseCount('enrollments', 1);

        $reference = 'mock_ref_verified';
        $this->paymentService->verifyPayment($reference);

        // Assert that only one enrollment record exists
        $this->assertDatabaseCount('enrollments', 1);

        Log::assertNotSent('info', function ($message) {
            return str_contains($message, 'enrolled in course');
        });
    }

    /** @test */
    public function it_throws_exception_on_failed_verification()
    {
        Http::fake([
            'https://api.paystack.co/transaction/verify/*' => Http::response([
                'status' => false,
                'message' => 'Transaction not found',
            ], 404),
        ]);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Payment verification failed or not successful.');

        $this->paymentService->verifyPayment('invalid_ref');

        Log::assertSent('warning', function ($message, $context) {
            return str_contains($message, 'Paystack verification failed or not successful: Transaction not found');
        });
    }

    /** @test */
    public function it_throws_exception_on_unsuccessful_paystack_status()
    {
        Http::fake([
            'https://api.paystack.co/transaction/verify/*' => Http::response([
                'status' => true,
                'message' => 'Verification successful',
                'data' => [
                    'id' => $this->faker->randomNumber(5),
                    'reference' => 'mock_ref_pending',
                    'status' => 'pending', // Not 'success'
                    'amount' => 10000,
                    'currency' => 'NGN',
                    'metadata' => [
                        'user_id' => $this->user->id,
                        'payable_type' => Course::class,
                        'payable_id' => $this->course->id,
                    ],
                    'customer' => ['email' => $this->user->email],
                ],
            ], 200),
        ]);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Payment verification failed or not successful.');

        $this->paymentService->verifyPayment('mock_ref_pending');

        Log::assertSent('warning', function ($message, $context) {
            return str_contains($message, 'Paystack verification failed or not successful');
        });
    }
}
