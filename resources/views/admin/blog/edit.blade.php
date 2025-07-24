@extends('layouts.app')

@section('title', 'Edit Blog Post - Admin')
@section('description', 'Admin panel to edit a blog post on PINCOREHUB.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4 max-w-3xl">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Edit Blog Post: {{ $blogPost->title }}</h1>

            <div class="card p-8">
                <form action="{{ route('admin.blog.update', $blogPost->id) }}" method="POST" enctype="multipart/form-data" class="space-y-6">
                    @csrf
                    @method('PUT')

                    <div>
                        <label for="title" class="form-label">Title</label>
                        <input type="text" id="title" name="title" value="{{ old('title', $blogPost->title) }}" class="form-input" required>
                        @error('title')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="content" class="form-label">Content</label>
                        <textarea id="content" name="content" rows="10" class="form-input" required>{{ old('content', $blogPost->content) }}</textarea>
                        @error('content')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="featured_image" class="form-label">Current Featured Image</label>
                        @if($blogPost->featured_image)
                            <img src="{{ $blogPost->featured_image }}" alt="Current Featured Image" class="w-48 h-auto object-cover rounded-md mb-2">
                        @else
                            <p class="text-gray-600 dark:text-gray-400">No image uploaded.</p>
                        @endif
                        <label for="featured_image" class="form-label mt-4">Upload New Image (Optional)</label>
                        <input type="file" id="featured_image" name="featured_image" class="form-input p-2" accept="image/*">
                        @error('featured_image')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="category" class="form-label">Category</label>
                        <input type="text" id="category" name="category" value="{{ old('category', $blogPost->category) }}" class="form-input">
                        @error('category')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="tags" class="form-label">Tags (comma-separated)</label>
                        <input type="text" id="tags" name="tags" value="{{ old('tags', implode(',', $blogPost->tags ?? [])) }}" class="form-input" placeholder="e.g., web development, laravel, tutorial">
                        @error('tags')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="status" class="form-label">Status</label>
                        <select id="status" name="status" class="form-input" required>
                            <option value="DRAFT" {{ old('status', $blogPost->status) == 'DRAFT' ? 'selected' : '' }}>Draft</option>
                            <option value="PUBLISHED" {{ old('status', $blogPost->status) == 'PUBLISHED' ? 'selected' : '' }}>Published</option>
                        </select>
                        @error('status')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="flex justify-end space-x-4">
                        <a href="{{ route('admin.blog.index') }}" class="btn-secondary">Cancel</a>
                        <button type="submit" class="btn-primary">Update Post</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
@endsection
