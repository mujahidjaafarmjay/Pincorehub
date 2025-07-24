@extends('layouts.app')

@section('title', 'PINCOREHUB - Tech Solutions & Online Courses')
@section('description', 'PINCOREHUB offers cutting-edge tech solutions, online courses, and expert consultations. Your partner in digital transformation.')

@section('content')
    <section class="hero-background text-white py-20 md:py-32 relative overflow-hidden">
        <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
            <div class="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                {{-- Placeholder for QServers logo, mirroring the image --}}
                <img src="{{ asset('images/placeholder-logo.png') }}" alt="QServers Web Hosting" class="mb-4 mx-auto md:mx-0 w-48">

                <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-4">
                    Quality, Fast, Affordable, Innovative<br>
                    Web Hosting Services
                </h1>
                <p class="text-xl md:text-2xl mb-6">
                    SHARED // RESELLER // VPS // DEDICATED
                </p>
                <div class="flex justify-center md:justify-start space-x-4">
                    <a href="#" class="btn-secondary">Hosting Plans</a>
                    <a href="#" class="btn-primary">Your Site? Go!</a>
                </div>
            </div>
            <div class="md:w-1/2 flex justify-center md:justify-end">
                {{-- Illustration mirroring the image --}}
                <img src="{{ asset('qservers-hero-illustration.png') }}" alt="Web Hosting Illustration" class="max-w-full h-auto">
            </div>
        </div>
        {{-- Client Area button, mirroring the image --}}
        <div class="absolute top-4 right-4 z-20">
            <a href="#" class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold">Client Area</a>
        </div>
        {{-- Pricing badge, mirroring the image --}}
        <div class="absolute top-1/3 right-1/4 transform -translate-y-1/2 translate-x-1/2 z-10 hidden md:block">
            <div class="bg-red-500 text-white rounded-full p-4 text-center shadow-lg" style="clip-path: polygon(50% 0%, 100% 35%, 100% 70%, 50% 100%, 0% 70%, 0% 35%); width: 120px; height: 120px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <span class="text-sm">Starting at</span>
                <span class="text-2xl font-bold">₦1,900</span>
                <span class="text-xs">/Month</span>
            </div>
        </div>
    </section>

    {{-- Placeholder for other sections like About, Services, Courses, Blog --}}
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Core Services</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="card">
                    <h3 class="text-xl font-semibold mb-2">Web Development</h3>
                    <p class="text-gray-600 dark:text-gray-300">Building responsive and high-performance websites tailored to your needs.</p>
                </div>
                <div class="card">
                    <h3 class="text-xl font-semibold mb-2">IT Consulting</h3>
                    <p class="text-gray-600 dark:text-gray-300">Expert guidance to optimize your IT infrastructure and digital strategy.</p>
                </div>
                <div class="card">
                    <h3 class="text-xl font-semibold mb-2">Online Courses</h3>
                    <p class="text-gray-600 dark:text-gray-300">Learn cutting-edge tech skills with our comprehensive online courses.</p>
                </div>
            </div>
        </div>
    </section>
@endsection
