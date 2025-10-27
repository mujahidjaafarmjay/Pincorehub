<?php

use App\Http\Controllers\Api\Admin\BlogController;
use App\Http\Controllers\Api\Admin\CourseController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\User\BookingController;
use App\Http\Controllers\Api\User\CourseController as UserCourseController;
use App\Http\Controllers\Api\User\PaymentController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'show']);
    Route::put('/user/{user}', [UserController::class, 'update']);
    Route::get('/users/{user}', [UserController::class, 'find']);

    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::delete('/bookings/{booking}', [BookingController::class, 'destroy']);

    Route::post('/courses/{course}/enroll', [UserCourseController::class, 'enroll']);

    Route::get('/payments', [PaymentController::class, 'index']);
    Route::post('/payments', [PaymentController::class, 'store']);

    Route::post('/upload', [UploadController::class, 'store']);
});

Route::get('/courses', [UserCourseController::class, 'index']);
Route::get('/courses/{course}', [UserCourseController::class, 'show']);

Route::get('/search', [SearchController::class, 'index']);

Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::apiResource('blog', BlogController::class);
    Route::apiResource('courses', CourseController::class);
});
