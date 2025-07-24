@extends('layouts.app')

@section('title', 'My Courses - PINCOREHUB Dashboard')
@section('description', 'View and manage all the online courses you are enrolled in at PINCOREHUB.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">My Courses</h1>

            <p class="text-center text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                Here you can find all the courses you've enrolled in. Click on a course to continue your learning journey!
            </p>

            @if($enrollments->isEmpty())
                <p class="text-center text-gray-700 dark:text-gray-300 text-xl">You haven't enrolled in any courses yet.</p>
                <div class="text-center mt-6">
                    <a href="{{ route('courses.index') }}" class="btn-primary">Browse Courses</a>
                </div>
            @else
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    @foreach($enrollments as $enrollment)
                        <div class="card overflow-hidden">
                            @if($enrollment->course->image)
                                <img src="{{ $enrollment->course->image }}" alt="{{ $enrollment->course->title }}" class="w-full h-48 object-cover">
                            @else
                                <img src="/placeholder.svg?height=300&width=400" alt="Placeholder Image" class="w-full h-48 object-cover">
                            @endif
                            <div class="p-6">
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ $enrollment->course->title }}</h2>
                                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    {{ Str::limit(strip_tags($enrollment->course->description), 100) }}
                                </p>
                                <div class="flex justify-between items-center mb-3">
                                    <span class="bg-qserver-yellow text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">{{ $enrollment->course->category }}</span>
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Progress: {{ $enrollment->progress }}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
                                    <div class="bg-qserver-teal h-2.5 rounded-full" style="width: {{ $enrollment->progress }}%"></div>
                                </div>
                                @if($enrollment->course->lessons->first())
                                    <a href="{{ route('courses.lessons.show', ['course' => $enrollment->course->id, 'lesson' => $enrollment->course->lessons->first()->id]) }}" class="btn-primary w-full text-center">Continue Learning</a>
                                @else
                                    <p class="text-center text-gray-700 dark:text-gray-300">No lessons available yet.</p>
                                @endif
                            </div>
                        </div>
                    @endforeach
                </div>

                <div class="mt-12">
                    {{ $enrollments->links() }}
                </div>
            @endif
        </div>
    </section>
@endsection
