<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\BookingController; // Assuming you'll add this
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\CourseController as AdminCourseController;
use App\Http\Controllers\Admin\BlogPostController as AdminBlogPostController;
use App\Http\Controllers\Admin\UserController as AdminUserController; // Assuming you'll add this
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Public Routes
Route::get('/', function () {
    return view('welcome');
})->name('home');
Route::get('/about', function () { return view('about'); })->name('about');
Route::get('/contact', function () { return view('contact'); })->name('contact');
Route::get('/services', function () { return view('services'); })->name('services');
Route::get('/portfolio', function () { return view('portfolio'); })->name('portfolio');
Route::get('/book', function () { return view('book'); })->name('book');

// Blog Routes
Route::get('/blog', [BlogPostController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogPostController::class, 'show'])->name('blog.show');

// Course Routes
Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{course}', [CourseController::class, 'show'])->name('courses.show');
Route::get('/courses/{course}/lessons/{lesson}', [LessonController::class, 'show'])->name('courses.lessons.show');

// Authentication Routes
Route::get('/register', [RegisteredUserController::class, 'create'])->middleware('guest')->name('register');
Route::post('/register', [RegisteredUserController::class, 'store'])->middleware('guest');
Route::get('/login', [AuthenticatedSessionController::class, 'create'])->middleware('guest')->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('guest');
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth')->name('logout');

// Google OAuth
Route::get('/auth/google/redirect', function () {
    return Socialite::driver('google')->redirect();
})->name('auth.google.redirect');

Route::get('/auth/google/callback', function () {
    $googleUser = Socialite::driver('google')->user();

    $user = User::updateOrCreate([
        'google_id' => $googleUser->id,
    ], [
        'name' => $googleUser->name,
        'email' => $googleUser->email,
        'password' => \Hash::make(Str::random(24)), // Generate a random password
        'email_verified_at' => now(),
    ]);

    Auth::login($user);

    // Send welcome email if it's a new registration
    if ($user->wasRecentlyCreated) {
        Mail::to($user->email)->send(new WelcomeEmail($user));
    }

    return redirect('/dashboard');
});


// Payment Routes
Route::post('/payments/initialize', [PaymentController::class, 'initialize'])->middleware('auth')->name('payments.initialize');
Route::get('/payments/success', [PaymentController::class, 'success'])->name('payments.success');
Route::get('/payments/failure', [PaymentController::class, 'failure'])->name('payments.failure');
Route::post('/payments/webhook', [PaymentController::class, 'handleWebhook'])->name('payments.webhook');


// Authenticated User Routes
Route::middleware('auth')->group(function () {
    // User Dashboard
    Route::get('/dashboard', function () {
        return view('dashboard.index');
    })->name('dashboard');
    Route::get('/dashboard/enrollments', [UserProfileController::class, 'enrollments'])->name('dashboard.enrollments');
    Route::get('/dashboard/bookings', [UserProfileController::class, 'bookings'])->name('dashboard.bookings');
    Route::get('/dashboard/profile', [UserProfileController::class, 'editProfile'])->name('dashboard.profile.edit');
    Route::put('/dashboard/profile', [UserProfileController::class, 'updateProfile'])->name('dashboard.profile.update');

    // Booking Routes (assuming you'll add a BookingController)
    // Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
});

// Admin Routes (requires 'admin' role)
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Admin Course Management
    Route::resource('courses', AdminCourseController::class);

    // Admin Blog Management
    Route::resource('blog', AdminBlogPostController::class);

    // Admin User Management (if implemented)
    // Route::resource('users', AdminUserController::class);
});

// Instructor Routes (requires 'instructor' or 'admin' role)
Route::middleware(['auth', 'role:instructor,admin'])->prefix('instructor')->name('instructor.')->group(function () {
    // Instructor specific dashboard or features
    Route::get('/dashboard', function () {
        return view('instructor.dashboard'); // Create this view
    })->name('dashboard');

    // Instructors can manage their own courses/blog posts
    // Route::resource('courses', InstructorCourseController::class); // Create this controller
    // Route::resource('blog', InstructorBlogPostController::class); // Create this controller
});
