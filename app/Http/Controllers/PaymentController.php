<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Services\PaymentService;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    /**
     * Initialize payment for a course or booking.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function initialize(Request $request)
    {
        $request->validate([
            'item_type' => 'required|in:course,booking',
            'item_id' => 'required|integer',
        ]);

        $user = Auth::user();
        $item = null;
        $payableType = null;

        if ($request->item_type === 'course') {
            $item = Course::find($request->item_id);
            $payableType = Course::class;
        } elseif ($request->item_type === 'booking') {
            $item = Booking::find($request->item_id);
            $payableType = Booking::class;
        }

        if (!$item) {
            return back()->with('error', 'Item not found.');
        }

        $amount = $item->price; // Assuming both Course and Booking have a 'price' attribute
        $reference = Str::uuid()->toString();
        $callbackUrl = route('payments.verify', ['reference' => $reference]);

        try {
            $paystackData = $this->paymentService->initializePayment(
                $user,
                $amount,
                $callbackUrl,
                $reference,
                $payableType,
                $item->id
            );

            // Redirect to Paystack authorization URL
            return redirect()->away($paystackData['authorization_url']);
        } catch (\Exception $e) {
            Log::error("Payment initialization failed: " . $e->getMessage());
            return back()->with('error', 'Failed to initialize payment: ' . $e->getMessage());
        }
    }

    /**
     * Verify payment after callback from Paystack.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function verify(Request $request)
    {
        $reference = $request->query('reference');

        if (!$reference) {
            return redirect()->route('payments.failure')->with('error', 'Payment reference not provided.');
        }

        try {
            $payment = $this->paymentService->verifyPayment($reference);

            if ($payment->status === 'success') {
                return redirect()->route('payments.success')->with('success', 'Payment successful!');
            } else {
                return redirect()->route('payments.failure')->with('error', 'Payment not successful. Status: ' . $payment->status);
            }
        } catch (\Exception $e) {
            Log::error("Payment verification failed: " . $e->getMessage());
            return redirect()->route('payments.failure')->with('error', 'Payment verification failed: ' . $e->getMessage());
        }
    }

    /**
     * Handle Paystack webhook notifications.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function handleWebhook(Request $request)
    {
        $paystackSecretKey = config('paystack.secretKey');
        $input = $request->getContent();
        $hash = hash_hmac('sha512', $input, $paystackSecretKey);

        if ($hash !== $request->header('x-paystack-signature')) {
            Log::warning('Paystack Webhook: Invalid signature.');
            return response()->json(['message' => 'Invalid signature'], 401);
        }

        $event = json_decode($input, true);
        Log::info('Paystack Webhook Event Received:', $event);

        if ($event['event'] === 'charge.success') {
            $transaction = $event['data'];
            $reference = $transaction['reference'];

            try {
                $payment = $this->paymentService->verifyPayment($reference);
                Log::info("Webhook: Payment {$reference} processed successfully.");
                return response()->json(['message' => 'Webhook processed successfully'], 200);
            } catch (\Exception $e) {
                Log::error("Webhook: Failed to process payment {$reference}: " . $e->getMessage());
                return response()->json(['message' => 'Failed to process payment'], 500);
            }
        }

        return response()->json(['message' => 'Event not handled'], 200);
    }
}
