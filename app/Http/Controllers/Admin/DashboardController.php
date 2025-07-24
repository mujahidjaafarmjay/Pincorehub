<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use App\Models\BlogPost;
use App\Models\Payment;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $totalUsers = User::count();
        $totalCourses = Course::count();
        $totalBlogPosts = BlogPost::count();
        $totalRevenue = Payment::where('status', 'SUCCESS')->sum('amount');

        // You can add more complex data fetching here, e.g., recent payments, popular courses
        $recentPayments = Payment::with('user')->orderBy('created_at', 'desc')->take(5)->get();
        $recentRegistrations = User::orderBy('created_at', 'desc')->take(5)->get();

        return view('admin.dashboard', compact(
            'totalUsers',
            'totalCourses',
            'totalBlogPosts',
            'totalRevenue',
            'recentPayments',
            'recentRegistrations'
        ));
    }
}
