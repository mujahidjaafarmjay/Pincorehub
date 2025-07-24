@extends('layouts.app')

@section('title', 'Contact Us - PINCOREHUB')
@section('description', 'Get in touch with PINCOREHUB for inquiries, support, or collaboration. We are here to help you with your tech needs.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Contact Us</h1>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
                    <p class="text-gray-700 dark:text-gray-300 mb-6">
                        Have a question, need support, or want to discuss a project? Fill out the form below, and we'll get back to you as soon as possible.
                    </p>

                    <form action="#" method="POST" class="space-y-6">
                        @csrf
                        <div>
                            <label for="name" class="form-label">Your Name</label>
                            <input type="text" id="name" name="name" class="form-input" required>
                        </div>
                        <div>
                            <label for="email" class="form-label">Your Email</label>
                            <input type="email" id="email" name="email" class="form-input" required>
                        </div>
                        <div>
                            <label for="subject" class="form-label">Subject</label>
                            <input type="text" id="subject" name="subject" class="form-input" required>
                        </div>
                        <div>
                            <label for="message" class="form-label">Message</label>
                            <textarea id="message" name="message" rows="5" class="form-input" required></textarea>
                        </div>
                        <button type="submit" class="btn-primary w-full">Send Message</button>
                    </form>
                </div>

                <div>
                    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Information</h2>
                    <div class="space-y-6 text-gray-700 dark:text-gray-300">
                        <div class="flex items-center space-x-3">
                            <svg class="w-6 h-6 text-qserver-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <p>123 Tech Hub, Innovation Street, Lagos, Nigeria</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <svg class="w-6 h-6 text-qserver-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            <p>info@pincohub.com.ng</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <svg class="w-6 h-6 text-qserver-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            <p>+234 801 234 5678</p>
                        </div>
                    </div>

                    <div class="mt-8">
                        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Find Us on Map</h3>
                        {{-- Placeholder for Google Map iframe --}}
                        <div class="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden h-64">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3340000000003!2d3.379205!3d6.59569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9231a2b3b3b3%3A0x123456789abcdef!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style="border:0;"
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
