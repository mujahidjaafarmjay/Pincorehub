@extends('layouts.app')

@section('title', 'Our Services - PINCOREHUB')
@section('description', 'Explore the comprehensive range of tech services offered by PINCOREHUB, including web development, IT consulting, and digital marketing.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Our Services</h1>

            <p class="text-center text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                At PINCOREHUB, we offer a diverse range of cutting-edge technology services designed to help
                businesses and individuals thrive in the digital landscape. Our expertise spans across various domains,
                ensuring comprehensive solutions for your unique needs.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {{-- Service Card 1: Web Development --}}
                <div class="card flex flex-col items-center text-center">
                    <div class="bg-qserver-teal text-white rounded-full p-4 mb-4">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Web Development</h2>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        Crafting responsive, high-performance, and secure websites tailored to your business goals.
                        From e-commerce platforms to custom web applications, we build digital experiences that engage.
                    </p>
                    <ul class="text-left text-gray-700 dark:text-gray-400 text-sm space-y-1">
                        <li>&#x2022; Custom Website Design & Development</li>
                        <li>&#x2022; E-commerce Solutions (Shopify, WooCommerce)</li>
                        <li>&#x2022; CMS Development (WordPress, Laravel Nova)</li>
                        <li>&#x2022; API Integration & Backend Development</li>
                    </ul>
                    <a href="{{ route('contact') }}" class="btn-primary mt-6">Get a Quote</a>
                </div>

                {{-- Service Card 2: IT Consulting --}}
                <div class="card flex flex-col items-center text-center">
                    <div class="bg-qserver-teal text-white rounded-full p-4 mb-4">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5a3 3 0 00-3-3H9a3 3 0 00-3 3v5m3 4h.01M12 12h.01M15 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">IT Consulting</h2>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        Strategic guidance to optimize your IT infrastructure, enhance cybersecurity, and streamline
                        operations for maximum efficiency and growth.
                    </p>
                    <ul class="text-left text-gray-700 dark:text-gray-400 text-sm space-y-1">
                        <li>&#x2022; Digital Transformation Strategy</li>
                        <li>&#x2022; Cloud Solutions & Migration</li>
                        <li>&#x2022; Cybersecurity Audits & Implementation</li>
                        <li>&#x2022; Network Infrastructure Design</li>
                    </ul>
                    <a href="{{ route('contact') }}" class="btn-primary mt-6">Consult Now</a>
                </div>

                {{-- Service Card 3: Digital Marketing --}}
                <div class="card flex flex-col items-center text-center">
                    <div class="bg-qserver-teal text-white rounded-full p-4 mb-4">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Digital Marketing</h2>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        Boost your online presence and reach your target audience with our data-driven digital marketing
                        strategies, including SEO, social media, and content marketing.
                    </p>
                    <ul class="text-left text-gray-700 dark:text-gray-400 text-sm space-y-1">
                        <li>&#x2022; Search Engine Optimization (SEO)</li>
                        <li>&#x2022; Social Media Marketing (SMM)</li>
                        <li>&#x2022; Content Marketing & Strategy</li>
                        <li>&#x2022; Pay-Per-Click (PPC) Advertising</li>
                    </ul>
                    <a href="{{ route('contact') }}" class="btn-primary mt-6">Grow Your Brand</a>
                </div>

                {{-- Service Card 4: UI/UX Design --}}
                <div class="card flex flex-col items-center text-center">
                    <div class="bg-qserver-teal text-white rounded-full p-4 mb-4">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m15.364 4.364l-.707-.707M6.343 17.657l-.707.707M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"></path></svg>
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">UI/UX Design</h2>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        Creating intuitive, engaging, and aesthetically pleasing user interfaces and experiences
                        that delight your users and achieve your business objectives.
                    </p>
                    <ul class="text-left text-gray-700 dark:text-gray-400 text-sm space-y-1">
                        <li>&#x2022; User Research & Persona Development</li>
                        <li>&#x2022; Wireframing & Prototyping</li>
                        <li>&#x2022; User Interface (UI) Design</li>
                        <li>&#x2022; User Experience (UX) Strategy</li>
                    </ul>
                    <a href="{{ route('contact') }}" class="btn-primary mt-6">Design Your Experience</a>
                </div>

                {{-- Service Card 5: Mobile App Development --}}
                <div class="card flex flex-col items-center text-center">
                    <div class="bg-qserver-teal text-white rounded-full p-4 mb-4">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Mobile App Development</h2>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        Building native and cross-platform mobile applications that deliver seamless performance
                        and exceptional user experiences on iOS and Android devices.
                    </p>
                    <ul class="text-left text-gray-700 dark:text-gray-400 text-sm space-y-1">
                        <li>&#x2022; iOS App Development</li>
                        <li>&#x2022; Android App Development</li>
                        <li>&#x2022; Cross-Platform (React Native, Flutter)</li>
                        <li>&#x2022; App Store Optimization (ASO)</li>
                    </ul>
                    <a href="{{ route('contact') }}" class="btn-primary mt-6">Build Your App</a>
                </div>

                {{-- Service Card 6: Data Analytics & AI --}}
                <div class="card flex flex-col items-center text-center">
                    <div class="bg-qserver-teal text-white rounded-full p-4 mb-4">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Data Analytics & AI</h2>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        Leveraging the power of data to provide actionable insights and implement intelligent
                        AI solutions that drive efficiency and innovation for your business.
                    </p>
                    <ul class="text-left text-gray-700 dark:text-gray-400 text-sm space-y-1">
                        <li>&#x2022; Business Intelligence Dashboards</li>
                        <li>&#x2022; Predictive Analytics</li>
                        <li>&#x2022; Machine Learning Model Development</li>
                        <li>&#x2022; Data Visualization & Reporting</li>
                    </ul>
                    <a href="{{ route('contact') }}" class="btn-primary mt-6">Unlock Insights</a>
                </div>
            </div>
        </div>
    </section>
@endsection
