<header class="bg-white shadow-sm dark:bg-gray-800">
    <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="{{ route('home') }}" class="flex items-center space-x-2">
            {{-- Placeholder for your logo --}}
            <img src="{{ asset('images/placeholder-logo.png') }}" alt="PINCOREHUB Logo" class="h-8 w-auto">
            <span class="text-xl font-bold text-gray-900 dark:text-white">PINCOREHUB</span>
        </a>

        <div class="hidden md:flex items-center space-x-6">
            <a href="{{ route('home') }}" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Home</a>
            <a href="{{ route('about') }}" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">About</a>
            <a href="{{ route('services') }}" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Services</a>
            <a href="{{ route('courses.index') }}" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Courses</a>
            <a href="{{ route('blog.index') }}" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Blog</a>
            <a href="{{ route('contact') }}" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Contact</a>
            <a href="{{ route('book') }}" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Book</a>
        </div>

        <div class="flex items-center space-x-4">
            @auth
                <div class="relative group">
                    <button class="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal transition-colors duration-200 focus:outline-none">
                        <img src="{{ Auth::user()->avatar_url ?? asset('images/placeholder-user.jpg') }}" alt="User Avatar" class="h-8 w-8 rounded-full object-cover">
                        <span>{{ Auth::user()->name }}</span>
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <a href="{{ route('dashboard') }}" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Dashboard</a>
                        <a href="{{ route('dashboard.profile.edit') }}" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Profile</a>
                        @if(Auth::user()->hasRole('admin'))
                            <a href="{{ route('admin.dashboard') }}" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Admin Panel</a>
                        @endif
                        @if(Auth::user()->hasRole('instructor'))
                            <a href="{{ route('instructor.dashboard') }}" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Instructor Panel</a>
                        @endif
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Logout</button>
                        </form>
                    </div>
                </div>
            @else
                <a href="{{ route('login') }}" class="text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal transition-colors duration-200 hidden md:block">Login</a>
                <a href="{{ route('register') }}" class="btn-primary hidden md:block">Sign Up</a>
            @endauth

            {{-- Mobile Menu Button --}}
            <button class="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
        </div>
    </nav>

    {{-- Mobile Menu (hidden by default) --}}
    <div id="mobile-menu" class="hidden md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div class="flex flex-col space-y-2 px-4">
            <a href="{{ route('home') }}" class="block text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal transition-colors duration-200">Home</a>
            <a href="{{ route('about') }}" class="block text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal transition-colors duration-200">About</a>
            <a href="{{ route('services') }}" class="block text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal transition-colors duration-200">Services</a>
            <a href="{{ route('courses.index') }}" class="block text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal transition-colors duration-200">Courses</a>
            <a href="{{ route('blog.index') }}" class="block text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal transition-colors duration-200">Blog</a>
            <a href="{{ route('contact') }}" class="block text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal transition-colors duration-200">Contact</a>
            <a href="{{ route('book') }}" class="block text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal transition-colors duration-200">Book</a>
            @auth
                <a href="{{ route('dashboard') }}" class="block text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal transition-colors duration-200">Dashboard</a>
                @if(Auth::user()->hasRole('admin'))
                    <a href="{{ route('admin.dashboard') }}" class="block text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal transition-colors duration-200">Admin Panel</a>
                @endif
                @if(Auth::user()->hasRole('instructor'))
                    <a href="{{ route('instructor.dashboard') }}" class="block text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal transition-colors duration-200">Instructor Panel</a>
                @endif
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal transition-colors duration-200">Logout</button>
                </form>
            @else
                <a href="{{ route('login') }}" class="block text-gray-600 dark:text-gray-300 hover:text-qserver-teal dark:hover:text-qserver-teal transition-colors duration-200">Login</a>
                <a href="{{ route('register') }}" class="block btn-primary mt-2">Sign Up</a>
            @endauth
        </div>
    </div>
</header>
