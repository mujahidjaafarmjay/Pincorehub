@extends('layouts.app')

@section('title', $lesson->title . ' - ' . $course->title)
@section('description', Str::limit(strip_tags($lesson->content), 160))

@section('content')
    <section class="py-10 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
            {{-- Sidebar for Lessons Navigation --}}
            <aside class="lg:w-1/4 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md h-fit sticky top-4">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Course Lessons</h2>
                <nav>
                    <ul class="space-y-3">
                        @foreach($lessons as $navLesson)
                            <li>
                                <a href="{{ route('courses.lessons.show', ['course' => $course->id, 'lesson' => $navLesson->id]) }}"
                                   class="block p-3 rounded-md transition-colors duration-200
                                   {{ $navLesson->id === $lesson->id ? 'bg-qserver-teal text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600' }}">
                                    <span class="font-semibold">{{ $navLesson->order }}.</span> {{ $navLesson->title }}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </nav>
            </aside>

            {{-- Main Lesson Content --}}
            <main class="lg:w-3/4 card p-8">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">{{ $lesson->title }}</h1>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-6">Part of: <a href="{{ route('courses.show', $course->id) }}" class="text-qserver-teal hover:underline">{{ $course->title }}</a></p>

                @if($lesson->video_url)
                    <div class="aspect-video w-full bg-black rounded-lg overflow-hidden mb-8">
                        {{-- Using a simple iframe for YouTube/Vimeo. For more advanced features, integrate a dedicated video player library like Video.js --}}
                        <iframe
                            src="{{ $lesson->video_url }}"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            class="w-full h-full"
                        ></iframe>
                        {{-- Example for Video.js (requires JS setup) --}}
                        {{-- <video id="my-video" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264"
                            poster="MY_VIDEO_POSTER.jpg" data-setup="{}">
                            <source src="{{ $lesson->video_url }}" type="video/mp4">
                            <p class="vjs-no-js">
                                To view this video please enable JavaScript, and consider upgrading to a web browser that
                                <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                            </p>
                        </video> --}}
                    </div>
                @endif

                <div class="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed mb-8">
                    {!! $lesson->content !!}
                </div>

                {{-- Navigation Buttons --}}
                <div class="flex justify-between mt-8">
                    @php
                        $currentLessonIndex = $lessons->search(function($item) use ($lesson) {
                            return $item->id === $lesson->id;
                        });
                        $prevLesson = $lessons->get($currentLessonIndex - 1);
                        $nextLesson = $lessons->get($currentLessonIndex + 1);
                    @endphp

                    @if($prevLesson)
                        <a href="{{ route('courses.lessons.show', ['course' => $course->id, 'lesson' => $prevLesson->id]) }}" class="btn-secondary flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                            Previous Lesson
                        </a>
                    @else
                        <span></span> {{-- Empty span to maintain spacing --}}
                    @endif

                    @if($nextLesson)
                        <a href="{{ route('courses.lessons.show', ['course' => $course->id, 'lesson' => $nextLesson->id]) }}" class="btn-primary flex items-center">
                            Next Lesson
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </a>
                    @else
                        <a href="{{ route('dashboard.enrollments') }}" class="btn-primary flex items-center">
                            Finish Course
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </a>
                    @endif
                </div>
            </main>
        </div>
    </section>
@endsection
