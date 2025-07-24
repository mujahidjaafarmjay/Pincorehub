<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Jobs\ProcessImageUpload;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    /**
     * Display a listing of the courses for admin.
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $courses = Course::with('instructor')->paginate(10);
        return view('admin.courses.index', compact('courses'));
    }

    /**
     * Show the form for creating a new course.
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $instructors = User::where('role', User::ROLE_INSTRUCTOR)->get();
        return view('admin.courses.create', compact('instructors'));
    }

    /**
     * Store a newly created course in storage.
     * @param StoreCourseRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreCourseRequest $request)
    {
        $courseData = $request->validated();
        $imageUrl = null;

        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');
            $path = $imageFile->store('temp', 'public'); // Store temporarily
            $fullPath = Storage::disk('public')->path($path);

            // Create the course first to get an ID
            $course = Course::create(array_merge($courseData, ['image' => null])); // Set image to null initially

            // Dispatch job to upload image to Cloudinary and update course
            ProcessImageUpload::dispatch($fullPath, $course, 'image');
        } else {
            Course::create($courseData);
        }

        return redirect()->route('admin.courses.index')->with('success', 'Course created successfully.');
    }

    /**
     * Show the form for editing the specified course.
     * @param Course $course
     * @return \Illuminate\View\View
     */
    public function edit(Course $course)
    {
        // Authorization handled by UpdateCourseRequest policy/middleware if applied globally
        $instructors = User::where('role', User::ROLE_INSTRUCTOR)->get();
        return view('admin.courses.edit', compact('course', 'instructors'));
    }

    /**
     * Update the specified course in storage.
     * @param UpdateCourseRequest $request
     * @param Course $course
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $courseData = $request->validated();
        $imageUrl = $course->image;

        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');
            $path = $imageFile->store('temp', 'public'); // Store temporarily
            $fullPath = Storage::disk('public')->path($path);

            // Dispatch job to upload image to Cloudinary and update course
            ProcessImageUpload::dispatch($fullPath, $course, 'image');
            unset($courseData['image']); // Prevent immediate update, job will handle it
        }

        $course->update($courseData);

        return redirect()->route('admin.courses.index')->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified course from storage.
     * @param Course $course
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Course $course)
    {
        // Authorization handled by policy/middleware if applied globally
        // Optionally delete image from Cloudinary if needed (can be a separate job)
        // if ($course->image) {
        //     Cloudinary::destroy(pathinfo($course->image)['filename']);
        // }
        $course->delete();
        return redirect()->route('admin.courses.index')->with('success', 'Course deleted successfully.');
    }
}
