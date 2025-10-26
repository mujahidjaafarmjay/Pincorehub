<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = $request->user()->bookings()->latest()->get();
        return response()->json($bookings);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
            'location' => 'required|string',
            'message' => 'nullable|string',
            'phone' => 'required|string',
        ]);

        $booking = $request->user()->bookings()->create($validated);

        return response()->json($booking, 201);
    }

    public function destroy(Booking $booking)
    {
        Gate::authorize('delete', $booking);

        $booking->update(['status' => 'CANCELLED']);

        return response()->json(['message' => 'Booking cancelled successfully']);
    }
}
