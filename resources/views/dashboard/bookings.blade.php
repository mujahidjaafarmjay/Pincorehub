@extends('layouts.app')

@section('title', 'My Bookings - PINCOREHUB Dashboard')
@section('description', 'View and manage your scheduled consultations and service bookings at PINCOREHUB.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">My Bookings</h1>

            <p class="text-center text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                Here's a list of your upcoming and past consultations and service bookings.
            </p>

            @if($bookings->isEmpty())
                <p class="text-center text-gray-700 dark:text-gray-300 text-xl">You have no bookings yet.</p>
                <div class="text-center mt-6">
                    <a href="{{ route('book') }}" class="btn-primary">Book a Consultation</a>
                </div>
            @else
                <div class="overflow-x-auto">
                    <table class="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
                        <thead>
                            <tr class="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 uppercase text-sm leading-normal">
                                <th class="py-3 px-6 text-left">Service Type</th>
                                <th class="py-3 px-6 text-left">Scheduled At</th>
                                <th class="py-3 px-6 text-left">Status</th>
                                <th class="py-3 px-6 text-left">Notes</th>
                                <th class="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 dark:text-gray-300 text-sm font-light">
                            @foreach($bookings as $booking)
                                <tr class="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td class="py-3 px-6 text-left whitespace-nowrap">{{ $booking->service_type }}</td>
                                    <td class="py-3 px-6 text-left">{{ $booking->scheduled_at->format('M d, Y H:i A') }}</td>
                                    <td class="py-3 px-6 text-left">
                                        <span class="py-1 px-3 rounded-full text-xs font-semibold
                                            @if($booking->status === 'CONFIRMED') bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200
                                            @elseif($booking->status === 'PENDING') bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200
                                            @elseif($booking->status === 'CANCELLED') bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200
                                            @else bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200
                                            @endif">
                                            {{ $booking->status }}
                                        </span>
                                    </td>
                                    <td class="py-3 px-6 text-left">{{ Str::limit($booking->notes, 50) }}</td>
                                    <td class="py-3 px-6 text-center">
                                        {{-- Add actions like "View Details", "Cancel" if applicable --}}
                                        <a href="#" class="text-qserver-teal hover:underline">View</a>
                                        @if($booking->status === 'PENDING' || $booking->status === 'CONFIRMED')
                                            <button class="ml-4 text-red-500 hover:underline" onclick="confirm('Are you sure you want to cancel this booking?')">Cancel</button>
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <div class="mt-12">
                    {{ $bookings->links() }}
                </div>
            @endif
        </div>
    </section>
@endsection
