@extends('layouts.app')

@section('title', 'Blog - PINCOREHUB Insights')
@section('description', 'Stay updated with the latest tech trends, industry insights, and expert articles from the PINCOREHUB blog.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Our Blog</h1>

            <p class="text-center text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                Dive into our collection of articles, tutorials, and insights on web development, IT consulting,
                digital marketing, and emerging technologies.
            </p>

            {{-- Search and Filter (Basic example, can be enhanced with JS) --}}
            <div class="flex justify-center mb-10">
                <form action="{{ route('blog.index') }}" method="GET" class="w-full max-w-md flex space-x-2">
                    <input type="search" name="search" placeholder="Search blog posts..." class="form-input flex-grow" value="{{ request('search') }}">
                    <button type="submit" class="btn-primary px-4 py-2">Search</button>
                </form>
            </div>

            @if($blogPosts->isEmpty())
                <p class="text-center text-gray-700 dark:text-gray-300 text-xl">No blog posts found.</p>
            @else
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    @foreach($blogPosts as $post)
                        <div class="card overflow-hidden">
                            @if($post->featured_image)
                                <img src="{{ $post->featured_image }}" alt="{{ $post->title }}" class="w-full h-48 object-cover">
                            @else
                                <img src="/placeholder.svg?height=300&width=400" alt="Placeholder Image" class="w-full h-48 object-cover">
                            @endif
                            <div class="p-6">
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ $post->title }}</h2>
                                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    {{ Str::limit(strip_tags($post->content), 150) }}
                                </p>
                                <div class="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                                    <span>By {{ $post->author->name ?? 'Unknown' }}</span>
                                    <span class="mx-2">&bull;</span>
                                    <span>{{ $post->published_at ? $post->published_at->format('M d, Y') : 'N/A' }}</span>
                                    @if($post->category)
                                        <span class="mx-2">&bull;</span>
                                        <span class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">{{ $post->category }}</span>
                                    @endif
                                </div>
                                <a href="{{ route('blog.show', $post->slug) }}" class="text-qserver-teal hover:underline font-medium">Read More &rarr;</a>
                            </div>
                        </div>
                    @endforeach
                </div>

                <div class="mt-12">
                    {{ $blogPosts->links() }}
                </div>
            @endif
        </div>
    </section>
@endsection
