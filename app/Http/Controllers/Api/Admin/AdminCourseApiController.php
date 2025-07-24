<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class AdminCourseApiController extends Controller
{
    /**
     * Display a listing of the courses for admin.
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $courses = Course::with('instructor')->paginate($request->input('per_page', 10));
        return response()->json($courses);
    }

    /**
     * Store a newly created course in storage.
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
            'duration_hours' => 'nullable|integer|min:1',
            'image' => 'nullable|image|max:2048', // Max 2MB
            'instructor_id' => ['nullable', 'exists:users,id', Rule::in(User::where('role', User::ROLE_INSTRUCTOR)->pluck('id'))],
            'status' => 'required|in:DRAFT,PUBLISHED,ARCHIVED',
        ]);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            try {
                $uploadedFileUrl = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();
                $imageUrl = $uploadedFileUrl;
            } catch (\Exception $e) {
                return response()->json(['message' => 'Failed to upload image.', 'error' => $e->getMessage()], 500);
            }
        }

        $course = Course::create(array_merge($request->except('image'), ['image' => $imageUrl]));

        return response()->json(['message' => 'Course created successfully.', 'course' => $course], 201);
    }

    /**
     * Display the specified course.
     * @param Course $course
     * @return JsonResponse
     */
    public function show(Course $course): JsonResponse
    {
        $course->load('lessons', 'instructor');
        return response()->json($course);
    }

    /**
     * Update the specified course in storage.
     * @param Request $request
     * @param Course $course
     * @return JsonResponse
     */
    public function update(Request $request, Course $course): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
            'duration_hours' => 'nullable|integer|min:1',
            'image' => 'nullable|image|max:2048', // Max 2MB
            'instructor_id' => ['nullable', 'exists:users,id', Rule::in(User::where('role', User::ROLE_INSTRUCTOR)->pluck('id'))],
            'status' => 'required|in:DRAFT,PUBLISHED,ARCHIVED',
        ]);

        $imageUrl = $course->image;
        if ($request->hasFile('image')) {
            try {
                // Optionally delete old image from Cloudinary
                // if ($course->image) {
                //     Cloudinary::destroy(pathinfo($course->image)['filename']);
                // }
                $uploadedFileUrl = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();
                $imageUrl = $uploadedFileUrl;
            } catch (\Exception $e) {
                return response()->json(['message' => 'Failed to upload image.', 'error' => $e->getMessage()], 500);
            }
        }

        $course->update(array_merge($request->except('image'), ['image' => $imageUrl]));

        return response()->json(['message' => 'Course updated successfully.', 'course' => $course]);
    }

    /**
     * Remove the specified course from storage.
     * @param Course $course
     * @return JsonResponse
     */
    public function destroy(Course $course): JsonResponse
    {
        // Optionally delete image from Cloudinary
        // if ($course->image) {
        //     Cloudinary::destroy(pathinfo($course->image)['filename']);
        // }
        $course->delete();
        return response()->json(['message' => 'Course deleted successfully.']);
    }
}
