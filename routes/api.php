<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CourseApiController;
use App\Http\Controllers\Api\PaymentApiController;
use App\Http\Controllers\Api\UserApiController;
use App\Http\Controllers\Api\UploadApiController;
use App\Http\Controllers\Api\Admin\AdminCourseApiController;
use App\Http\Controllers\Api\Admin\AdminBlogApiController;
use App\Http\Controllers\Api\Admin\AdminUserApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API Routes (e.g., for search, public course listings)
Route::get('/courses', [CourseApiController::class, 'index']);
Route::get('/courses/{course}', [CourseApiController::class, 'show']);
Route::get('/blog', [BlogPostApiController::class, 'index']); // Assuming BlogPostApiController
Route::get('/blog/{slug}', [BlogPostApiController::class, 'show']); // Assuming BlogPostApiController
Route::get('/search', [CourseApiController::class, 'search']); // Example search endpoint

// Authenticated User API Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/enrollments', [UserApiController::class, 'enrollments']);
    Route::get('/user/bookings', [UserApiController::class, 'bookings']);
    Route::put('/user/profile', [UserApiController::class, 'updateProfile']);
    Route::post('/payments/initialize', [PaymentApiController::class, 'initialize']);
    Route::post('/upload/signature', [UploadApiController::class, 'getSignature']); // For client-side direct uploads
});

// Admin API Routes (requires 'admin' role)
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::apiResource('courses', AdminCourseApiController::class);
    Route::apiResource('blog', AdminBlogApiController::class);
    Route::apiResource('users', AdminUserApiController::class);
});

// Instructor API Routes (requires 'instructor' or 'admin' role)
Route::middleware(['auth:sanctum', 'role:instructor,admin'])->prefix('instructor')->group(function () {
    // API routes for instructors to manage their content
    // Route::apiResource('courses', InstructorCourseApiController::class);
    // Route::apiResource('blog', InstructorBlogApiController::class);
});

// Webhook for Paystack (no authentication needed, handled by signature verification)
Route::post('/paystack/webhook', [PaymentApiController::class, 'handleWebhook']);
