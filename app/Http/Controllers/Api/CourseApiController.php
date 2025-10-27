<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CourseApiController extends Controller
{
    /**
     * Display a listing of the courses.
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $query = Course::where('status', 'PUBLISHED')->with('instructor');

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

        $courses = $query->paginate($request->input('per_page', 10));

        return response()->json($courses);
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
     * Search for courses.
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request): JsonResponse
    {
        $request->validate([
            'query' => 'required|string|min:1',
        ]);

        $searchQuery = $request->input('query');

        $courses = Course::where('status', 'PUBLISHED')
                         ->where(function($q) use ($searchQuery) {
                             $q->where('title', 'like', '%' . $searchQuery . '%')
                               ->orWhere('description', 'like', '%' . $searchQuery . '%')
                               ->orWhere('category', 'like', '%' . $searchQuery . '%');
                         })
                         ->limit(10) // Limit results for search suggestions
                         ->get();

        return response()->json($courses);
    }
}
