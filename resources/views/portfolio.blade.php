@extends('layouts.app')

@section('title', 'Our Portfolio - PINCOREHUB')
@section('description', 'Explore a selection of our successful projects in web development, IT consulting, and digital marketing. See how PINCOREHUB delivers results.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Our Portfolio</h1>

            <p class="text-center text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                Discover the impact of our work through a curated selection of projects. We pride ourselves on
                delivering innovative, high-quality solutions that meet our clients' unique challenges and exceed their expectations.
            </p>

            {{-- Project Categories/Filters (Optional: Add dynamic filtering with JavaScript later) --}}
            <div class="flex justify-center space-x-4 mb-10">
                <button class="px-6 py-2 rounded-full bg-qserver-teal text-white text-sm font-semibold hover:bg-teal-600 transition-colors duration-200">All</button>
                <button class="px-6 py-2 rounded-full bg-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">Web Development</button>
                <button class="px-6 py-2 rounded-full bg-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">IT Consulting</button>
                <button class="px-6 py-2 rounded-full bg-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">Digital Marketing</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {{-- Project Card 1 --}}
                <div class="card overflow-hidden">
                    <img src="/placeholder.svg?height=300&width=400" alt="E-commerce Website Project" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">E-commerce Platform for Retailer X</h3>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            Developed a scalable e-commerce solution with custom product management, secure payment gateway integration, and intuitive user experience.
                        </p>
                        <span class="inline-block bg-qserver-yellow text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">Web Development</span>
                        <a href="#" class="text-qserver-teal hover:underline ml-4 text-sm">View Case Study &rarr;</a>
                    </div>
                </div>

                {{-- Project Card 2 --}}
                <div class="card overflow-hidden">
                    <img src="/placeholder.svg?height=300&width=400" alt="Corporate Website Project" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Corporate Website for Service Provider Y</h3>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            Designed and built a modern, responsive corporate website to enhance brand presence and facilitate client engagement.
                        </p>
                        <span class="inline-block bg-qserver-yellow text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">Web Development</span>
                        <a href="#" class="text-qserver-teal hover:underline ml-4 text-sm">View Case Study &rarr;</a>
                    </div>
                </div>

                {{-- Project Card 3 --}}
                <div class="card overflow-hidden">
                    <img src="/placeholder.svg?height=300&width=400" alt="Data Analytics Dashboard Project" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Data Analytics Dashboard for Startup Z</h3>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            Implemented a custom data analytics dashboard to provide real-time insights into user behavior and business performance.
                        </p>
                        <span class="inline-block bg-qserver-yellow text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">IT Consulting</span>
                        <a href="#" class="text-qserver-teal hover:underline ml-4 text-sm">View Case Study &rarr;</a>
                    </div>
                </div>

                {{-- Project Card 4 --}}
                <div class="card overflow-hidden">
                    <img src="/placeholder.svg?height=300&width=400" alt="Social Media Campaign Project" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Social Media Strategy for Brand A</h3>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            Developed and executed a comprehensive social media marketing strategy that significantly increased brand engagement and reach.
                        </p>
                        <span class="inline-block bg-qserver-yellow text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">Digital Marketing</span>
                        <a href="#" class="text-qserver-teal hover:underline ml-4 text-sm">View Case Study &rarr;</a>
                    </div>
                </div>

                {{-- Project Card 5 --}}
                <div class="card overflow-hidden">
                    <img src="/placeholder.svg?height=300&width=400" alt="Mobile App Design Project" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Mobile App UI/UX for Fintech B</h3>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            Designed an intuitive and user-friendly mobile application interface for a new fintech startup, focusing on seamless user experience.
                        </p>
                        <span class="inline-block bg-qserver-yellow text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">UI/UX Design</span>
                        <a href="#" class="text-qserver-teal hover:underline ml-4 text-sm">View Case Study &rarr;</a>
                    </div>
                </div>

                {{-- Project Card 6 --}}
                <div class="card overflow-hidden">
                    <img src="/placeholder.svg?height=300&width=400" alt="Cloud Migration Project" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Cloud Infrastructure Migration for Enterprise C</h3>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            Successfully migrated legacy IT infrastructure to a robust cloud-based solution, improving scalability and reducing operational costs.
                        </p>
                        <span class="inline-block bg-qserver-yellow text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">IT Consulting</span>
                        <a href="#" class="text-qserver-teal hover:underline ml-4 text-sm">View Case Study &rarr;</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
