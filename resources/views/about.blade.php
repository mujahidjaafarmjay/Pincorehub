@extends('layouts.app')

@section('title', 'About Us - PINCOREHUB')
@section('description', 'Learn more about PINCOREHUB, our mission, vision, and the team behind our innovative tech solutions and online courses.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">About PINCOREHUB</h1>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div class="text-gray-700 dark:text-gray-300 space-y-6">
                    <p class="text-lg leading-relaxed">
                        PINCOREHUB is a leading technology solutions provider dedicated to empowering individuals and businesses in the digital age.
                        We believe in the transformative power of technology and are committed to delivering innovative, high-quality services
                        that drive growth and foster learning.
                    </p>
                    <p class="text-lg leading-relaxed">
                        Our journey began with a vision to bridge the gap between complex technological advancements and practical, accessible solutions.
                        Today, we offer a comprehensive suite of services, including bespoke web development, strategic IT consulting, and
                        a robust platform for online learning.
                    </p>
                    <p class="text-lg leading-relaxed">
                        We are passionate about nurturing talent and fostering a community of tech enthusiasts. Our online courses are meticulously
                        designed by industry experts to equip learners with in-demand skills, ensuring they are well-prepared for the challenges
                        and opportunities of the modern tech landscape.
                    </p>
                </div>
                <div class="flex justify-center">
                    <img src="/placeholder.svg?height=400&width=600" alt="Our Team" class="rounded-lg shadow-lg object-cover w-full h-auto max-w-md">
                </div>
            </div>

            <div class="mt-16 text-center">
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission & Vision</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="card">
                        <h3 class="text-2xl font-semibold text-qserver-teal mb-3">Our Mission</h3>
                        <p class="text-gray-600 dark:text-gray-300">
                            To provide accessible, high-quality technology education and innovative digital solutions that empower individuals and businesses to thrive in a rapidly evolving world.
                        </p>
                    </div>
                    <div class="card">
                        <h3 class="text-2xl font-semibold text-qserver-teal mb-3">Our Vision</h3>
                        <p class="text-gray-600 dark:text-gray-300">
                            To be the leading hub for technological excellence and digital empowerment, fostering a global community of skilled professionals and successful enterprises.
                        </p>
                    </div>
                </div>
            </div>

            <div class="mt-16 text-center">
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Meet Our Team</h2>
                <p class="text-gray-700 dark:text-gray-300 text-lg mb-10">
                    Our team comprises dedicated professionals, passionate educators, and seasoned industry experts committed to your success.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="card flex flex-col items-center">
                        <img src="/placeholder.svg?height=150&width=150" alt="Team Member 1" class="w-32 h-32 rounded-full object-cover mb-4">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">John Doe</h3>
                        <p class="text-qserver-teal">CEO & Founder</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Visionary leader with a passion for innovation and digital transformation.</p>
                    </div>
                    <div class="card flex flex-col items-center">
                        <img src="/placeholder.svg?height=150&width=150" alt="Team Member 2" class="w-32 h-32 rounded-full object-cover mb-4">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Jane Smith</h3>
                        <p class="text-qserver-teal">Lead Developer</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Expert in full-stack development and building scalable web applications.</p>
                    </div>
                    <div class="card flex flex-col items-center">
                        <img src="/placeholder.svg?height=150&width=150" alt="Team Member 3" class="w-32 h-32 rounded-full object-cover mb-4">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">David Lee</h3>
                        <p class="text-qserver-teal">Head of Education</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Experienced educator dedicated to creating impactful learning experiences.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
