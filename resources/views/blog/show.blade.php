@extends('layouts.app')

@section('title', $blogPost->title . ' - PINCOREHUB Blog')
@section('description', Str::limit(strip_tags($blogPost->content), 160))
@section('keywords', implode(', ', $blogPost->tags ?? []) . ', ' . $blogPost->category)

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4 max-w-4xl">
            <article class="card p-8">
                @if($blogPost->featured_image)
                    <img src="{{ $blogPost->featured_image }}" alt="{{ $blogPost->title }}" class="w-full h-96 object-cover rounded-lg mb-8">
                @else
                    <img src="/placeholder.svg?height=500&width=800" alt="Placeholder Image" class="w-full h-96 object-cover rounded-lg mb-8">
                @endif

                <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">{{ $blogPost->title }}</h1>

                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <span>By {{ $blogPost->author->name ?? 'Unknown' }}</span>
                    <span class="mx-2">&bull;</span>
                    <span>{{ $blogPost->published_at ? $blogPost->published_at->format('M d, Y') : 'N/A' }}</span>
                    @if($blogPost->category)
                        <span class="mx-2">&bull;</span>
                        <span class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">{{ $blogPost->category }}</span>
                    @endif
                </div>

                <div class="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed mb-8">
                    {!! $blogPost->content !!} {{-- Render HTML content --}}
                </div>

                @if($blogPost->tags)
                    <div class="mb-8">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tags:</h3>
                        <div class="flex flex-wrap gap-2">
                            @foreach($blogPost->tags as $tag)
                                <span class="bg-qserver-yellow text-gray-900 px-3 py-1 rounded-full text-sm">{{ $tag }}</span>
                            @endforeach
                        </div>
                    </div>
                @endif

                {{-- Comments Section --}}
                <div class="mt-10">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments ({{ $blogPost->comments->count() }})</h2>

                    @auth
                        <div class="mb-8">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Leave a Comment</h3>
                            <form action="{{ route('comments.store') }}" method="POST" class="space-y-4">
                                @csrf
                                <input type="hidden" name="blog_post_id" value="{{ $blogPost->id }}">
                                <div>
                                    <label for="comment_content" class="sr-only">Your Comment</label>
                                    <textarea id="comment_content" name="content" rows="4" class="form-input" placeholder="Write your comment here..." required></textarea>
                                </div>
                                <button type="submit" class="btn-primary">Submit Comment</button>
                            </form>
                        </div>
                    @else
                        <p class="text-gray-700 dark:text-gray-300 mb-8">
                            <a href="{{ route('login') }}" class="text-qserver-teal hover:underline">Log in</a> to leave a comment.
                        </p>
                    @endauth

                    @if($blogPost->comments->isEmpty())
                        <p class="text-gray-700 dark:text-gray-300">No comments yet. Be the first to comment!</p>
                    @else
                        <div class="space-y-6">
                            @foreach($blogPost->comments as $comment)
                                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                                    <div class="flex items-center mb-2">
                                        <img src="{{ $comment->user->avatar_url ?? asset('images/placeholder-user.jpg') }}" alt="{{ $comment->user->name }}" class="w-8 h-8 rounded-full object-cover mr-3">
                                        <div>
                                            <p class="font-semibold text-gray-900 dark:text-white">{{ $comment->user->name }}</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">{{ $comment->created_at->diffForHumans() }}</p>
                                        </div>
                                    </div>
                                    <p class="text-gray-700 dark:text-gray-300">{{ $comment->content }}</p>
                                </div>
                            @endforeach
                        </div>
                    @endif
                </div>
            </article>
        </div>
    </section>
@endsection
