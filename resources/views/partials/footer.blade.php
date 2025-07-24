<footer class="bg-gray-100 dark:bg-gray-800 py-8 mt-12">
    <div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">PINCOREHUB</h3>
                <p class="text-sm">Your partner in digital transformation, offering cutting-edge tech solutions, online courses, and expert consultations.</p>
            </div>
            <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
                <ul class="space-y-2 text-sm">
                    <li><a href="{{ route('home') }}" class="hover:text-qserver-teal dark:hover:text-qserver-teal">Home</a></li>
                    <li><a href="{{ route('about') }}" class="hover:text-qserver-teal dark:hover:text-qserver-teal">About Us</a></li>
                    <li><a href="{{ route('services') }}" class="hover:text-qserver-teal dark:hover:text-qserver-teal">Services</a></li>
                    <li><a href="{{ route('courses.index') }}" class="hover:text-qserver-teal dark:hover:text-qserver-teal">Courses</a></li>
                    <li><a href="{{ route('blog.index') }}" class="hover:text-qserver-teal dark:hover:text-qserver-teal">Blog</a></li>
                    <li><a href="{{ route('contact') }}" class="hover:text-qserver-teal dark:hover:text-qserver-teal">Contact</a></li>
                </ul>
            </div>
            <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
                <p class="text-sm">123 Tech Hub, Innovation Street, Lagos, Nigeria</p>
                <p class="text-sm">Email: info@pincohub.com.ng</p>
                <p class="text-sm">Phone: +234 801 234 5678</p>
                <div class="flex justify-center space-x-4 mt-4">
                    {{-- Social Media Icons (placeholders) --}}
                    <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div class="border-t border-gray-200 dark:border-gray-700 pt-6 text-sm">
            <p>&copy; {{ date('Y') }} PINCOREHUB. All rights reserved.</p>
            <p>
                <a href="#" class="hover:text-qserver-teal dark:hover:text-qserver-teal">Privacy Policy</a> |
                <a href="#" class="hover:text-qserver-teal dark:hover:text-qserver-teal">Terms of Service</a>
            </p>
        </div>
    </div>
</footer>
