@extends('layouts.app')

@section('title', 'Online Courses - PINCOREHUB')
@section('description', 'Browse our extensive catalog of online courses in web development, IT, digital marketing, and more. Learn from industry experts.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Our Online Courses</h1>

            <p class="text-center text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                Unlock your potential with our expertly crafted online courses. Whether you're a beginner or
                looking to advance your skills, PINCOREHUB offers a diverse range of programs to help you succeed.
            </p>

            {{-- Search and Filter --}}
            <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-10">
                <form action="{{ route('courses.index') }}" method="GET" class="w-full md:w-auto flex-grow flex space-x-2">
                    <input type="search" name="search" placeholder="Search courses..." class="form-input flex-grow" value="{{ request('search') }}">
                    <select name="category" class="form-input w-auto">
                        <option value="all">All Categories</option>
                        @foreach($categories as $category)
                            <option value="{{ $category }}" {{ request('category') == $category ? 'selected' : '' }}>{{ $category }}</option>
                        @endforeach
                    </select>
                    <button type="submit" class="btn-primary px-4 py-2">Filter</button>
                </form>
            </div>

            @if($courses->isEmpty())
                <p class="text-center text-gray-700 dark:text-gray-300 text-xl">No courses found matching your criteria.</p>
            @else
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    @foreach($courses as $course)
                        <div class="card overflow-hidden">
                            @if($course->image)
                                <img src="{{ $course->image }}" alt="{{ $course->title }}" class="w-full h-48 object-cover">
                            @else
                                <img src="/placeholder.svg?height=300&width=400" alt="Placeholder Image" class="w-full h-48 object-cover">
                            @endif
                            <div class="p-6">
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ $course->title }}</h2>
                                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    {{ Str::limit(strip_tags($course->description), 100) }}
                                </p>
                                <div class="flex justify-between items-center mb-3">
                                    <span class="bg-qserver-yellow text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">{{ $course->category }}</span>
                                    <span class="text-lg font-bold text-qserver-teal">₦{{ number_format($course->price, 2) }}</span>
                                </div>
                                <div class="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                    Instructor: {{ $course->instructor->name ?? 'N/A' }}
                                    @if($course->duration_hours)
                                        <span class="mx-2">&bull;</span> {{ $course->duration_hours }} hours
                                    @endif
                                </div>
                                <a href="{{ route('courses.show', $course->id) }}" class="btn-primary w-full text-center">View Course</a>
                            </div>
                        </div>
                    @endforeach
                </div>

                <div class="mt-12">
                    {{ $courses->links() }}
                </div>
            @endif
        </div>
    </section>
@endsection
