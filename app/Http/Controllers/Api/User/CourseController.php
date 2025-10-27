<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::where('is_published', true)->latest()->get();
        return response()->json($courses);
    }

    public function show(Course $course)
    {
        if (!$course->is_published) {
            abort(404);
        }
        return response()->json($course->load('lessons'));
    }

    public function enroll(Request $request, Course $course)
    {
        $request->user()->enrollments()->create(['course_id' => $course->id]);
        return response()->json(['message' => 'Successfully enrolled in course']);
    }
}
