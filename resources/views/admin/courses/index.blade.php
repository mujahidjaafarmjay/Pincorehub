@extends('layouts.app')

@section('title', 'Manage Courses - Admin')
@section('description', 'Admin panel to manage all online courses on PINCOREHUB.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Manage Courses</h1>

            <div class="flex justify-end mb-6">
                <a href="{{ route('admin.courses.create') }}" class="btn-primary">Add New Course</a>
            </div>

            @if(session('success'))
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span class="block sm:inline">{{ session('success') }}</span>
                </div>
            @endif

            @if($courses->isEmpty())
                <p class="text-center text-gray-700 dark:text-gray-300 text-xl">No courses found.</p>
            @else
                <div class="overflow-x-auto">
                    <table class="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
                        <thead>
                            <tr class="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 uppercase text-sm leading-normal">
                                <th class="py-3 px-6 text-left">Title</th>
                                <th class="py-3 px-6 text-left">Category</th>
                                <th class="py-3 px-6 text-left">Price</th>
                                <th class="py-3 px-6 text-left">Instructor</th>
                                <th class="py-3 px-6 text-left">Status</th>
                                <th class="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 dark:text-gray-300 text-sm font-light">
                            @foreach($courses as $course)
                                <tr class="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td class="py-3 px-6 text-left whitespace-nowrap">{{ $course->title }}</td>
                                    <td class="py-3 px-6 text-left">{{ $course->category }}</td>
                                    <td class="py-3 px-6 text-left">₦{{ number_format($course->price, 2) }}</td>
                                    <td class="py-3 px-6 text-left">{{ $course->instructor->name ?? 'N/A' }}</td>
                                    <td class="py-3 px-6 text-left">
                                        <span class="py-1 px-3 rounded-full text-xs font-semibold
                                            @if($course->status === 'PUBLISHED') bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200
                                            @elseif($course->status === 'DRAFT') bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200
                                            @else bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200
                                            @endif">
                                            {{ $course->status }}
                                        </span>
                                    </td>
                                    <td class="py-3 px-6 text-center">
                                        <div class="flex item-center justify-center">
                                            <a href="{{ route('admin.courses.edit', $course->id) }}" class="w-4 mr-2 transform hover:text-qserver-teal hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </a>
                                            <form action="{{ route('admin.courses.destroy', $course->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this course?');">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <div class="mt-12">
                    {{ $courses->links() }}
                </div>
            @endif
        </div>
    </section>
@endsection
