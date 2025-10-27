<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    /**
     * Display a listing of the courses.
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $query = Course::where('status', 'PUBLISHED');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                  ->orWhere('description', 'like', '%' . $search . '%')
                  ->orWhere('category', 'like', '%' . $search . '%');
            });
        }

        if ($request->has('category') && $request->input('category') !== 'all') {
            $query->where('category', $request->input('category'));
        }

        $courses = $query->paginate(9); // Paginate for better performance

        // Get unique categories for filtering
        $categories = Course::select('category')->distinct()->pluck('category');

        return view('courses.index', compact('courses', 'categories'));
    }

    /**
     * Display the specified course.
     * @param Course $course
     * @return \Illuminate\View\View
     */
    public function show(Course $course)
    {
        $course->load('lessons', 'instructor'); // Eager load lessons and instructor
        $isEnrolled = false;
        if (Auth::check()) {
            $isEnrolled = Enrollment::where('user_id', Auth::id())
                                    ->where('course_id', $course->id)
                                    ->exists();
        }
        return view('courses.show', compact('course', 'isEnrolled'));
    }
}
