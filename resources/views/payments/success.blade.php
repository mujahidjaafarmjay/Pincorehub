@extends('layouts.app')

@section('title', 'Payment Successful - PINCOREHUB')
@section('description', 'Your payment was successful. Thank you for your purchase with PINCOREHUB.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800 text-center">
        <div class="container mx-auto px-4 max-w-md">
            <div class="card p-8 flex flex-col items-center">
                <div class="bg-green-100 dark:bg-green-800 rounded-full p-4 mb-6">
                    <svg class="w-16 h-16 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Payment Successful!</h1>
                <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Thank you for your purchase. Your transaction has been completed successfully.
                </p>
                <p class="text-gray-600 dark:text-gray-400 mb-8">
                    You will receive a confirmation email shortly with details of your purchase.
                </p>
                <a href="{{ route('dashboard') }}" class="btn-primary">Go to Dashboard</a>
            </div>
        </div>
    </section>
@endsection
