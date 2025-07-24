<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Unicodeveloper\Paystack\Facades\Paystack;
use App\Models\Payment;
use App\Models\Course;
use App\Models\Booking;
use App\Models\Enrollment;
use App\Mail\PaymentConfirmationEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class PaymentApiController extends Controller
{
    /**
     * Initialize a payment.
     * @param Request $request
     * @return JsonResponse
     */
    public function initialize(Request $request): JsonResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:100', // Paystack amounts are in kobo
            'item_type' => 'required|in:course,booking',
            'item_id' => 'required|integer',
        ]);

        $user = Auth::user();
        $amountInKobo = $request->amount;

        try {
            // Create a pending payment record
            $payment = Payment::create([
                'user_id' => $user->id,
                'reference' => Paystack::generateReference(),
                'amount' => $amountInKobo / 100, // Store in Naira
                'currency' => 'NGN',
                'status' => 'PENDING',
                'payment_gateway' => 'PAYSTACK',
                'payable_type' => $request->item_type === 'course' ? Course::class : Booking::class,
                'payable_id' => $request->item_id,
            ]);

            $paystackData = [
                'email' => $user->email,
                'amount' => $amountInKobo,
                'reference' => $payment->reference,
                'callback_url' => route('payments.success'), // Redirect after successful payment
                'metadata' => json_encode([
                    'user_id' => $user->id,
                    'payment_id' => $payment->id,
                    'item_type' => $request->item_type,
                    'item_id' => $request->item_id,
                ]),
            ];

            $authorizationUrl = Paystack::getAuthorizationUrl($paystackData)->url;

            return response()->json(['authorization_url' => $authorizationUrl]);

        } catch (\Exception $e) {
            Log::error('Paystack API initialization failed: ' . $e->getMessage());
            return response()->json(['message' => 'Payment initialization failed.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Handle Paystack webhooks for real-time updates.
     * @param Request $request
     * @return JsonResponse
     */
    public function handleWebhook(Request $request): JsonResponse
    {
        // Verify webhook signature
        $secret = config('paystack.webhookSecret');
        if ($request->header('x-paystack-signature') !== hash_hmac('sha512', $request->getContent(), $secret)) {
            Log::warning('Invalid Paystack webhook signature.');
            return response()->json(['status' => 'error', 'message' => 'Invalid signature'], 401);
        }

        $event = $request->json()->all();
        Log::info('Paystack Webhook Received:', $event);

        if ($event['event'] === 'charge.success') {
            $data = $event['data'];
            $reference = $data['reference'];
            $status = $data['status'];

            $payment = Payment::where('reference', $reference)->first();

            if ($payment && $payment->status === 'PENDING') {
                DB::transaction(function () use ($payment, $status, $data) {
                    $payment->status = strtoupper($status); // 'SUCCESS'
                    $payment->save();

                    // Handle enrollment/booking based on payable type
                    $metadata = json_decode($data['metadata'], true);
                    $item = null;
                    if (isset($metadata['item_type']) && isset($metadata['item_id'])) {
                        if ($metadata['item_type'] === 'course') {
                            Enrollment::firstOrCreate([
                                'user_id' => $metadata['user_id'],
                                'course_id' => $metadata['item_id'],
                            ], [
                                'status' => 'ENROLLED',
                                'progress' => 0,
                            ]);
                            $item = Course::find($metadata['item_id']);
                        } elseif ($metadata['item_type'] === 'booking') {
                            $booking = Booking::find($metadata['item_id']);
                            if ($booking) {
                                $booking->status = 'CONFIRMED';
                                $booking->payment_id = $payment->id;
                                $booking->save();
                            }
                            $item = $booking;
                        }
                    }

                    // Send confirmation email
                    if ($payment->user) {
                        Mail::to($payment->user->email)->send(new PaymentConfirmationEmail($payment, $item));
                    }
                });
            }
        } elseif ($event['event'] === 'charge.failed') {
            $data = $event['data'];
            $reference = $data['reference'];
            $payment = Payment::where('reference', $reference)->first();
            if ($payment && $payment->status === 'PENDING') {
                $payment->status = 'FAILED';
                $payment->save();
            }
        }

        return response()->json(['status' => 'success'], 200);
    }
}
