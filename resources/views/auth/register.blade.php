@extends('layouts.app')

@section('title', 'Register - PINCOREHUB')
@section('description', 'Create an account with PINCOREHUB to access exclusive courses, services, and your personalized dashboard.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4 max-w-md">
            <div class="card p-8">
                <h1 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Create Your Account</h1>

                <form method="POST" action="{{ route('register') }}" class="space-y-6">
                    @csrf

                    {{-- Name --}}
                    <div>
                        <label for="name" class="form-label">Name</label>
                        <input id="name" type="text" name="name" value="{{ old('name') }}" required autofocus autocomplete="name" class="form-input">
                        @error('name')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Email Address --}}
                    <div>
                        <label for="email" class="form-label">Email</label>
                        <input id="email" type="email" name="email" value="{{ old('email') }}" required autocomplete="username" class="form-input">
                        @error('email')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Password --}}
                    <div>
                        <label for="password" class="form-label">Password</label>
                        <input id="password" type="password" name="password" required autocomplete="new-password" class="form-input">
                        @error('password')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Confirm Password --}}
                    <div>
                        <label for="password_confirmation" class="form-label">Confirm Password</label>
                        <input id="password_confirmation" type="password" name="password_confirmation" required autocomplete="new-password" class="form-input">
                        @error('password_confirmation')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <button type="submit" class="btn-primary w-full">Register</button>
                </form>

                <div class="mt-6 text-center">
                    <p class="text-gray-700 dark:text-gray-300">Already have an account? <a href="{{ route('login') }}" class="text-qserver-teal hover:underline">Login here</a></p>
                </div>

                <div class="mt-6 flex items-center justify-center">
                    <span class="text-gray-500 dark:text-gray-400">Or register with</span>
                </div>
                <div class="mt-4 text-center">
                    <a href="{{ route('auth.google.redirect') }}" class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <img src="/placeholder.svg?height=20&width=20" alt="Google Logo" class="mr-2">
                        Google
                    </a>
                </div>
            </div>
        </div>
    </section>
@endsection
