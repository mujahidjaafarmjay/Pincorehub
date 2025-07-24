@extends('layouts.app')

@section('title', 'Create Blog Post - Admin Panel')
@section('description', 'Admin panel for creating new blog posts on PINCOREHUB.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4 max-w-3xl">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Create New Blog Post</h1>

            <div class="card p-8">
                <form action="{{ route('admin.blog.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
                    @csrf

                    {{-- Title --}}
                    <div>
                        <label for="title" class="form-label">Title</label>
                        <input type="text" id="title" name="title" value="{{ old('title') }}" class="form-input" required>
                        @error('title')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Content (Rich Text Editor Placeholder) --}}
                    <div>
                        <label for="content" class="form-label">Content</label>
                        <textarea id="content" name="content" rows="10" class="form-input" required>{{ old('content') }}</textarea>
                        {{-- Integrate a rich text editor like Quill.js here --}}
                        {{-- Example: <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
                        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
                        <div id="editor" style="height: 300px;"></div>
                        <script>
                            var quill = new Quill('#editor', {
                                theme: 'snow'
                            });
                            quill.on('text-change', function() {
                                document.getElementById('content').value = quill.root.innerHTML;
                            });
                            // Set initial content if old('content') exists
                            quill.root.innerHTML = document.getElementById('content').value;
                        </script> --}}
                        @error('content')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Featured Image --}}
                    <div>
                        <label for="featured_image" class="form-label">Featured Image</label>
                        <input type="file" id="featured_image" name="featured_image" class="form-input p-2" accept="image/*">
                        @error('featured_image')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Category --}}
                    <div>
                        <label for="category" class="form-label">Category</label>
                        <input type="text" id="category" name="category" value="{{ old('category') }}" class="form-input">
                        @error('category')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Tags --}}
                    <div>
                        <label for="tags" class="form-label">Tags (comma-separated)</label>
                        <input type="text" id="tags" name="tags" value="{{ old('tags') }}" class="form-input" placeholder="e.g., web development, laravel, tutorial">
                        @error('tags')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    {{-- Status --}}
                    <div>
                        <label for="status" class="form-label">Status</label>
                        <select id="status" name="status" class="form-input" required>
                            <option value="DRAFT" {{ old('status') == 'DRAFT' ? 'selected' : '' }}>Draft</option>
                            <option value="PUBLISHED" {{ old('status') == 'PUBLISHED' ? 'selected' : '' }}>Published</option>
                        </select>
                        @error('status')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="flex justify-end space-x-4">
                        <a href="{{ route('admin.blog.index') }}" class="btn-secondary">Cancel</a>
                        <button type="submit" class="btn-primary">Create Post</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
@endsection
