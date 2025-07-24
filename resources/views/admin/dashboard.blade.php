@extends('layouts.app')

@section('title', 'Admin Dashboard - PINCOREHUB')
@section('description', 'Admin panel for PINCOREHUB. Manage users, courses, blog posts, and view key statistics.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>
            <p class="text-center text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                Welcome to the administration panel. Here you can manage all aspects of the PINCOREHUB platform.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {{-- Stat Card: Total Users --}}
                <div class="card p-6 text-center">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Total Users</h2>
                    <p class="text-4xl font-bold text-qserver-teal">{{ $totalUsers }}</p>
                </div>

                {{-- Stat Card: Total Courses --}}
                <div class="card p-6 text-center">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Total Courses</h2>
                    <p class="text-4xl font-bold text-qserver-teal">{{ $totalCourses }}</p>
                </div>

                {{-- Stat Card: Total Blog Posts --}}
                <div class="card p-6 text-center">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Total Blog Posts</h2>
                    <p class="text-4xl font-bold text-qserver-teal">{{ $totalBlogPosts }}</p>
                </div>

                {{-- Stat Card: Total Revenue --}}
                <div class="card p-6 text-center">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Total Revenue</h2>
                    <p class="text-4xl font-bold text-qserver-teal">₦{{ number_format($totalRevenue, 2) }}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {{-- Recent Registrations --}}
                <div class="card p-6">
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Recent Registrations</h2>
                    @if($recentRegistrations->isEmpty())
                        <p class="text-gray-700 dark:text-gray-300">No recent registrations.</p>
                    @else
                        <ul class="space-y-4">
                            @foreach($recentRegistrations as $user)
                                <li class="flex items-center space-x-4">
                                    <img src="{{ $user->avatar_url ?? asset('images/placeholder-user.jpg') }}" alt="{{ $user->name }}" class="w-10 h-10 rounded-full object-cover">
                                    <div>
                                        <p class="font-semibold text-gray-900 dark:text-white">{{ $user->name }}</p>
                                        <p class="text-sm text-gray-600 dark:text-gray-400">{{ $user->email }} - {{ $user->created_at->diffForHumans() }}</p>
                                    </div>
                                </li>
                            @endforeach
                        </ul>
                    @endif
                </div>

                {{-- Recent Payments --}}
                <div class="card p-6">
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Recent Payments</h2>
                    @if($recentPayments->isEmpty())
                        <p class="text-gray-700 dark:text-gray-300">No recent payments.</p>
                    @else
                        <ul class="space-y-4">
                            @foreach($recentPayments as $payment)
                                <li class="flex items-center justify-between">
                                    <div>
                                        <p class="font-semibold text-gray-900 dark:text-white">₦{{ number_format($payment->amount, 2) }} - {{ $payment->user->name ?? 'N/A' }}</p>
                                        <p class="text-sm text-gray-600 dark:text-gray-400">{{ $payment->reference }} ({{ $payment->status }})</p>
                                    </div>
                                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ $payment->created_at->diffForHumans() }}</span>
                                </li>
                            @endforeach
                        </ul>
                    @endif
                </div>
            </div>

            <div class="mt-12 text-center">
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Admin Actions</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <a href="{{ route('admin.courses.index') }}" class="btn-primary py-4">Manage Courses</a>
                    <a href="{{ route('admin.blog.index') }}" class="btn-primary py-4">Manage Blog Posts</a>
                    <a href="#" class="btn-primary py-4">Manage Users</a> {{-- Link to user management if implemented --}}
                </div>
            </div>
        </div>
    </section>
@endsection
