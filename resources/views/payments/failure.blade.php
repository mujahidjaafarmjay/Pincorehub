@extends('layouts.app')

@section('title', 'Payment Failed - PINCOREHUB')
@section('description', 'Your payment could not be processed. Please try again or contact support.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800 text-center">
        <div class="container mx-auto px-4 max-w-md">
            <div class="card p-8 flex flex-col items-center">
                <div class="bg-red-100 dark:bg-red-800 rounded-full p-4 mb-6">
                    <svg class="w-16 h-16 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Payment Failed!</h1>
                <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Unfortunately, your payment could not be processed.
                </p>
                @if(session('error'))
                    <p class="text-red-500 dark:text-red-400 mb-4">{{ session('error') }}</p>
                @endif
                <p class="text-gray-600 dark:text-gray-400 mb-8">
                    Please try again or contact our support team if the issue persists.
                </p>
                <div class="flex space-x-4">
                    <a href="{{ route('home') }}" class="btn-secondary">Back to Home</a>
                    <a href="{{ route('contact') }}" class="btn-primary">Contact Support</a>
                </div>
            </div>
        </div>
    </section>
@endsection
