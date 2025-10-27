<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CourseController extends Controller
{
    public function index()
    {
        Gate::authorize('admin');
        $courses = Course::with('lessons')->latest()->get();
        return response()->json($courses);
    }

    public function store(Request $request)
    {
        Gate::authorize('admin');

        $validated = $request->validate([
            'title' => 'required|string|min:1',
            'slug' => 'required|string|unique:courses,slug',
            'description' => 'nullable|string',
            'image' => 'nullable|string|url',
            'price' => 'required|numeric',
            'instructor' => 'required|string',
            'category' => 'required|string',
            'is_published' => 'nullable|boolean',
        ]);

        $course = Course::create($validated);

        return response()->json($course, 201);
    }

    public function show(Course $course)
    {
        Gate::authorize('admin');
        return response()->json($course->load('lessons'));
    }



    public function update(Request $request, Course $course)
    {
        Gate::authorize('admin');

        $validated = $request->validate([
            'title' => 'string|min:1',
            'slug' => 'string|unique:courses,slug,' . $course->id,
            'description' => 'nullable|string',
            'image' => 'nullable|string|url',
            'price' => 'numeric',
            'instructor' => 'string',
            'category' => 'string',
            'is_published' => 'nullable|boolean',
        ]);

        $course->update($validated);

        return response()->json($course);
    }

    public function destroy(Course $course)
    {
        Gate::authorize('admin');
        $course->delete();
        return response()->json(['message' => 'Course deleted successfully']);
    }
}
