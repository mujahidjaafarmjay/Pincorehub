<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LessonController extends Controller
{
    /**
     * Display the specified lesson.
     * @param Course $course
     * @param Lesson $lesson
     * @return \Illuminate\View\View|\Illuminate\Http\RedirectResponse
     */
    public function show(Course $course, Lesson $lesson)
    {
        // Ensure the lesson belongs to the course
        if ($lesson->course_id !== $course->id) {
            abort(404);
        }

        // Check if user is authenticated and enrolled in the course
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please log in to access course lessons.');
        }

        $isEnrolled = Enrollment::where('user_id', Auth::id())
                                ->where('course_id', $course->id)
                                ->exists();

        if (!$isEnrolled) {
            return redirect()->route('courses.show', $course->id)->with('error', 'You must be enrolled in this course to view lessons.');
        }

        // Load all lessons for navigation
        $lessons = $course->lessons()->orderBy('order')->get();

        return view('courses.lesson', compact('course', 'lesson', 'lessons'));
    }
}
