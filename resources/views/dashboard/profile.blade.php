@extends('layouts.app')

@section('title', 'Profile Settings - PINCOREHUB Dashboard')
@section('description', 'Manage your PINCOREHUB profile, update personal information, and change your password.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4 max-w-2xl">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Profile Settings</h1>

            <p class="text-center text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                Update your personal details, change your password, and manage your account information here.
            </p>

            <div class="card p-8">
                <form action="{{ route('dashboard.profile.update') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
                    @csrf
                    @method('PUT')

                    {{-- Avatar Upload --}}
                    <div class="flex flex-col items-center mb-6">
                        <img src="{{ Auth::user()->avatar_url ?? asset('images/placeholder-user.jpg') }}" alt="User Avatar" class="w-32 h-32 rounded-full object-cover mb-4 border-2 border-qserver-teal">
                        <label for="avatar" class="btn-secondary cursor-pointer">
                            Change Avatar
                            <input type="file" id="avatar" name="avatar" class="hidden" accept="image/*">
                        </label>
                        @error('avatar')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Name --}}
                    <div>
                        <label for="name" class="form-label">Name</label>
                        <input type="text" id="name" name="name" value="{{ old('name', Auth::user()->name) }}" class="form-input" required>
                        @error('name')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Email --}}
                    <div>
                        <label for="email" class="form-label">Email</label>
                        <input type="email" id="email" name="email" value="{{ old('email', Auth::user()->email) }}" class="form-input" required>
                        @error('email')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">Change Password</h2>

                    {{-- Current Password --}}
                    <div>
                        <label for="current_password" class="form-label">Current Password</label>
                        <input type="password" id="current_password" name="current_password" class="form-input">
                        @error('current_password')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- New Password --}}
                    <div>
                        <label for="password" class="form-label">New Password</label>
                        <input type="password" id="password" name="password" class="form-input">
                        @error('password')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Confirm New Password --}}
                    <div>
                        <label for="password_confirmation" class="form-label">Confirm New Password</label>
                        <input type="password" id="password_confirmation" name="password_confirmation" class="form-input">
                        @error('password_confirmation')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <button type="submit" class="btn-primary w-full">Update Profile</button>
                </form>
            </div>
        </div>
    </section>
@endsection
