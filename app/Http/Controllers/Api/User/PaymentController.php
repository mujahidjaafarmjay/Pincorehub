<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $payments = $request->user()->payments()->latest()->get();
        return response()->json($payments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric',
            'currency' => 'required|string',
            'reference' => 'required|string|unique:payments,reference',
            'payment_method' => 'nullable|string',
            'description' => 'nullable|string',
            'metadata' => 'nullable|array',
        ]);

        // In a real application, you would integrate a payment gateway here.
        // For now, we'll just create a payment record with a 'completed' status.

        $payment = $request->user()->payments()->create(array_merge($validated, ['status' => 'COMPLETED']));

        return response()->json($payment, 201);
    }
}
