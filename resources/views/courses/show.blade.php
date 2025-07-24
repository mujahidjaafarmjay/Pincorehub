@extends('layouts.app')

@section('title', $course->title . ' - PINCOREHUB Courses')
@section('description', Str::limit(strip_tags($course->description), 160))
@section('keywords', $course->category . ', ' . $course->title)

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4 max-w-4xl">
            <div class="card p-8">
                @if($course->image)
                    <img src="{{ $course->image }}" alt="{{ $course->title }}" class="w-full h-64 object-cover rounded-lg mb-8">
                @else
                    <img src="/placeholder.svg?height=400&width=800" alt="Placeholder Image" class="w-full h-64 object-cover rounded-lg mb-8">
                @endif

                <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">{{ $course->title }}</h1>

                <div class="flex items-center justify-between text-gray-600 dark:text-gray-300 text-lg mb-6">
                    <span>Category: <span class="font-semibold text-qserver-teal">{{ $course->category }}</span></span>
                    <span>Price: <span class="font-bold text-qserver-teal">₦{{ number_format($course->price, 2) }}</span></span>
                </div>

                <div class="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    <p>{{ $course->description }}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-gray-700 dark:text-gray-300">
                    <div>
                        <p><span class="font-semibold">Instructor:</span> {{ $course->instructor->name ?? 'N/A' }}</p>
                        <p><span class="font-semibold">Duration:</span> {{ $course->duration_hours ?? 'N/A' }} hours</p>
                    </div>
                    <div>
                        <p><span class="font-semibold">Lessons:</span> {{ $course->lessons->count() }}</p>
                        <p><span class="font-semibold">Status:</span> {{ $course->status }}</p>
                    </div>
                </div>

                @if($isEnrolled)
                    <p class="text-center text-green-600 dark:text-green-400 text-xl font-semibold mb-6">You are already enrolled in this course!</p>
                    @if($course->lessons->first())
                        <a href="{{ route('courses.lessons.show', ['course' => $course->id, 'lesson' => $course->lessons->first()->id]) }}" class="btn-primary w-full text-center">Continue Learning</a>
                    @else
                        <p class="text-center text-gray-700 dark:text-gray-300">No lessons available yet.</p>
                    @endif
                @else
                    <form action="{{ route('payments.initialize') }}" method="POST" class="mt-6">
                        @csrf
                        <input type="hidden" name="amount" value="{{ $course->price * 100 }}"> {{-- Amount in kobo --}}
                        <input type="hidden" name="item_type" value="course">
                        <input type="hidden" name="item_id" value="{{ $course->id }}">
                        <button type="submit" class="btn-primary w-full">Enroll Now for ₦{{ number_format($course->price, 2) }}</button>
                    </form>
                @endif

                <div class="mt-10">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Course Curriculum</h2>
                    @if($course->lessons->isEmpty())
                        <p class="text-gray-700 dark:text-gray-300">No lessons have been added to this course yet.</p>
                    @else
                        <ul class="space-y-4">
                            @foreach($course->lessons as $lesson)
                                <li class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm flex items-center justify-between">
                                    <div class="flex items-center space-x-3">
                                        <span class="text-qserver-teal font-bold text-lg">{{ $lesson->order }}.</span>
                                        <span class="text-gray-900 dark:text-white text-lg">{{ $lesson->title }}</span>
                                    </div>
                                    @if($isEnrolled)
                                        <a href="{{ route('courses.lessons.show', ['course' => $course->id, 'lesson' => $lesson->id]) }}" class="text-qserver-teal hover:underline text-sm">View Lesson &rarr;</a>
                                    @else
                                        <span class="text-gray-500 dark:text-gray-400 text-sm">Enroll to access</span>
                                    @endif
                                </li>
                            @endforeach
                        </ul>
                    @endif
                </div>
            </div>
        </div>
    </section>
@endsection
