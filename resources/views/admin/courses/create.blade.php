@extends('layouts.app')

@section('title', 'Create Course - Admin')
@section('description', 'Admin panel to create a new online course on PINCOREHUB.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4 max-w-3xl">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Create New Course</h1>

            <div class="card p-8">
                <form action="{{ route('admin.courses.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
                    @csrf

                    <div>
                        <label for="title" class="form-label">Course Title</label>
                        <input type="text" id="title" name="title" value="{{ old('title') }}" class="form-input" required>
                        @error('title')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="description" class="form-label">Description</label>
                        <textarea id="description" name="description" rows="6" class="form-input" required>{{ old('description') }}</textarea>
                        @error('description')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="price" class="form-label">Price (₦)</label>
                        <input type="number" id="price" name="price" value="{{ old('price') }}" step="0.01" min="0" class="form-input" required>
                        @error('price')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="category" class="form-label">Category</label>
                        <input type="text" id="category" name="category" value="{{ old('category') }}" class="form-input" required>
                        @error('category')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="duration_hours" class="form-label">Duration (Hours)</label>
                        <input type="number" id="duration_hours" name="duration_hours" value="{{ old('duration_hours') }}" min="1" class="form-input">
                        @error('duration_hours')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="image" class="form-label">Course Image</label>
                        <input type="file" id="image" name="image" class="form-input p-2" accept="image/*">
                        @error('image')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="instructor_id" class="form-label">Instructor</label>
                        <select id="instructor_id" name="instructor_id" class="form-input">
                            <option value="">Select an Instructor (Optional)</option>
                            @foreach($instructors as $instructor)
                                <option value="{{ $instructor->id }}" {{ old('instructor_id') == $instructor->id ? 'selected' : '' }}>{{ $instructor->name }}</option>
                            @endforeach
                        </select>
                        @error('instructor_id')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="status" class="form-label">Status</label>
                        <select id="status" name="status" class="form-input" required>
                            <option value="DRAFT" {{ old('status') == 'DRAFT' ? 'selected' : '' }}>Draft</option>
                            <option value="PUBLISHED" {{ old('status') == 'PUBLISHED' ? 'selected' : '' }}>Published</option>
                            <option value="ARCHIVED" {{ old('status') == 'ARCHIVED' ? 'selected' : '' }}>Archived</option>
                        </select>
                        @error('status')
                            <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="flex justify-end space-x-4">
                        <a href="{{ route('admin.courses.index') }}" class="btn-secondary">Cancel</a>
                        <button type="submit" class="btn-primary">Create Course</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
@endsection
