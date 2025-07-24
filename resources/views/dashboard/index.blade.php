@extends('layouts.app')

@section('title', 'User Dashboard - PINCOREHUB')
@section('description', 'Access your personalized PINCOREHUB dashboard to manage courses, bookings, and profile settings.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Welcome, {{ Auth::user()->name }}!</h1>

            <p class="text-center text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                This is your personalized dashboard where you can manage your courses, bookings, and profile.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {{-- Card: My Courses --}}
                <div class="card flex flex-col items-center text-center p-6">
                    <div class="bg-qserver-teal text-white rounded-full p-4 mb-4">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13.426m0-13.426a3.001 3.001 0 00-2.775 1.535L3 16.5m9-10.247a3.001 3.001 0 012.775 1.535L21 16.5m-9-10.247V3m0 13.426a3.001 3.001 0 01-2.775 1.535L3 20.5m9-10.247a3.001 3.001 0 002.775 1.535L21 20.5m-9-10.247V3"></path></svg>
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">My Courses</h2>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        Access all the online courses you've enrolled in and track your learning progress.
                    </p>
                    <a href="{{ route('dashboard.enrollments') }}" class="btn-primary mt-auto">View Courses</a>
                </div>

                {{-- Card: My Bookings --}}
                <div class="card flex flex-col items-center text-center p-6">
                    <div class="bg-qserver-teal text-white rounded-full p-4 mb-4">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">My Bookings</h2>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        Review your scheduled consultations and service bookings.
                    </p>
                    <a href="{{ route('dashboard.bookings') }}" class="btn-primary mt-auto">View Bookings</a>
                </div>

                {{-- Card: Profile Settings --}}
                <div class="card flex flex-col items-center text-center p-6">
                    <div class="bg-qserver-teal text-white rounded-full p-4 mb-4">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Profile Settings</h2>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        Update your personal information, change password, and manage your account details.
                    </p>
                    <a href="{{ route('dashboard.profile.edit') }}" class="btn-primary mt-auto">Edit Profile</a>
                </div>
            </div>
        </div>
    </section>
@endsection
