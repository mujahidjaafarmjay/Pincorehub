<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Course;
use App\Models\Booking;
use App\Models\User;
use App\Mail\PaymentConfirmationEmail;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Exception;

class PaymentService
{
    protected $paystackSecretKey;
    protected $paystackPublicKey;

    public function __construct()
    {
        $this->paystackSecretKey = config('paystack.secretKey');
        $this->paystackPublicKey = config('paystack.publicKey');
    }

    /**
     * Initialize a payment with Paystack.
     *
     * @param User $user
     * @param float $amount
     * @param string $callbackUrl
     * @param string $reference
     * @param string $payableType
     * @param int $payableId
     * @return array
     * @throws Exception
     */
    public function initializePayment(User $user, float $amount, string $callbackUrl, string $reference, string $payableType, int $payableId): array
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->paystackSecretKey,
            'Content-Type' => 'application/json',
        ])->post('https://api.paystack.co/transaction/initialize', [
            'email' => $user->email,
            'amount' => $amount * 100, // Amount in kobo
            'callback_url' => $callbackUrl,
            'reference' => $reference,
            'metadata' => [
                'user_id' => $user->id,
                'payable_type' => $payableType,
                'payable_id' => $payableId,
            ],
        ]);

        if ($response->successful()) {
            $data = $response->json();
            if ($data['status']) {
                return $data['data'];
            } else {
                Log::error('Paystack initialization failed: ' . $data['message']);
                throw new Exception('Paystack initialization failed: ' . $data['message']);
            }
        } else {
            Log::error('Paystack initialization HTTP error: ' . $response->status() . ' - ' . $response->body());
            throw new Exception('Failed to initialize payment with Paystack.');
        }
    }

    /**
     * Verify a payment with Paystack.
     *
     * @param string $reference
     * @return Payment
     * @throws Exception
     */
    public function verifyPayment(string $reference): Payment
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->paystackSecretKey,
        ])->get("https://api.paystack.co/transaction/verify/{$reference}");

        if ($response->successful()) {
            $data = $response->json();
            if ($data['status'] && $data['data']['status'] === 'success') {
                $transaction = $data['data'];

                // Find or create payment record
                $payment = Payment::firstOrCreate(
                    ['reference' => $transaction['reference']],
                    [
                        'user_id' => $transaction['metadata']['user_id'] ?? null,
                        'amount' => $transaction['amount'] / 100, // Convert back to Naira
                        'currency' => $transaction['currency'],
                        'status' => $transaction['status'],
                        'payment_method' => 'Paystack',
                        'transaction_id' => $transaction['id'],
                        'payable_type' => $transaction['metadata']['payable_type'] ?? null,
                        'payable_id' => $transaction['metadata']['payable_id'] ?? null,
                    ]
                );

                // Update status if it was not 'success' initially
                if ($payment->status !== 'success') {
                    $payment->status = 'success';
                    $payment->save();
                }

                // Handle item-specific logic (e.g., course enrollment)
                $this->handlePayableItem($payment);

                return $payment;
            } else {
                Log::warning('Paystack verification failed or not successful: ' . ($data['message'] ?? 'Unknown error'));
                throw new Exception('Payment verification failed or not successful.');
            }
        } else {
            Log::error('Paystack verification HTTP error: ' . $response->status() . ' - ' . $response->body());
            throw new Exception('Failed to verify payment with Paystack.');
        }
    }

    /**
     * Handle the item associated with the payment (e.g., enroll user in course).
     *
     * @param Payment $payment
     * @return void
     */
    protected function handlePayableItem(Payment $payment): void
    {
        if ($payment->payable_type === Course::class && $payment->payable_id) {
            $course = Course::find($payment->payable_id);
            $user = User::find($payment->user_id);

            if ($course && $user) {
                // Enroll user in course if not already enrolled
                if (!$course->enrollments()->where('user_id', $user->id)->exists()) {
                    $course->enrollments()->create([
                        'user_id' => $user->id,
                        'enrollment_date' => now(),
                        'status' => 'ENROLLED',
                    ]);
                    Log::info("User {$user->id} enrolled in course {$course->id} after payment.");
                }

                // Send payment confirmation email
                Mail::to($user->email)->queue(new PaymentConfirmationEmail($payment, $course));
            } else {
                Log::warning("Course or User not found for payment ID: {$payment->id}");
            }
        } elseif ($payment->payable_type === Booking::class && $payment->payable_id) {
            $booking = Booking::find($payment->payable_id);
            $user = User::find($payment->user_id);

            if ($booking && $user) {
                $booking->status = 'CONFIRMED';
                $booking->save();
                Log::info("Booking {$booking->id} confirmed after payment.");

                // Send payment confirmation email
                Mail::to($user->email)->queue(new PaymentConfirmationEmail($payment, $booking));
            } else {
                Log::warning("Booking or User not found for payment ID: {$payment->id}");
            }
        }
    }
}
