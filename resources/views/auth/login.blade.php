@extends('layouts.app')

@section('title', 'Login - PINCOREHUB')
@section('description', 'Log in to your PINCOREHUB account to access your dashboard, courses, and manage your profile.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4 max-w-md">
            <div class="card p-8">
                <h1 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Login to Your Account</h1>

                <form method="POST" action="{{ route('login') }}" class="space-y-6">
                    @csrf

                    {{-- Email Address --}}
                    <div>
                        <label for="email" class="form-label">Email</label>
                        <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus autocomplete="username" class="form-input">
                        @error('email')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Password --}}
                    <div>
                        <label for="password" class="form-label">Password</label>
                        <input id="password" type="password" name="password" required autocomplete="current-password" class="form-input">
                        @error('password')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Remember Me --}}
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember_me" type="checkbox" class="rounded border-gray-300 text-qserver-teal shadow-sm focus:ring-qserver-teal" name="remember">
                            <label for="remember_me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember me</label>
                        </div>
                        @if (Route::has('password.request'))
                            <a class="text-sm text-qserver-teal hover:underline" href="{{ route('password.request') }}">
                                Forgot your password?
                            </a>
                        @endif
                    </div>

                    <button type="submit" class="btn-primary w-full">Login</button>
                </form>

                <div class="mt-6 text-center">
                    <p class="text-gray-700 dark:text-gray-300">Don't have an account? <a href="{{ route('register') }}" class="text-qserver-teal hover:underline">Register here</a></p>
                </div>

                <div class="mt-6 flex items-center justify-center">
                    <span class="text-gray-500 dark:text-gray-400">Or login with</span>
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
