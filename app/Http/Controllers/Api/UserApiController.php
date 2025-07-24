<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class UserApiController extends Controller
{
    /**
     * Get authenticated user's enrollments.
     * @param Request $request
     * @return JsonResponse
     */
    public function enrollments(Request $request): JsonResponse
    {
        $user = Auth::user();
        $enrollments = $user->enrollments()->with('course')->paginate($request->input('per_page', 10));
        return response()->json($enrollments);
    }

    /**
     * Get authenticated user's bookings.
     * @param Request $request
     * @return JsonResponse
     */
    public function bookings(Request $request): JsonResponse
    {
        $user = Auth::user();
        $bookings = $user->bookings()->paginate($request->input('per_page', 10));
        return response()->json($bookings);
    }

    /**
     * Update the authenticated user's profile.
     * @param Request $request
     * @return JsonResponse
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'current_password' => 'nullable|required_with:password|current_password',
            'password' => 'nullable|min:8|confirmed',
            'avatar' => 'nullable|image|max:2048', // Max 2MB
        ]);

        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        if ($request->hasFile('avatar')) {
            try {
                // Optionally delete old avatar from Cloudinary
                // if ($user->avatar_url) {
                //     Cloudinary::destroy(pathinfo($user->avatar_url)['filename']);
                // }
                $uploadedFileUrl = Cloudinary::upload($request->file('avatar')->getRealPath())->getSecurePath();
                $user->avatar_url = $uploadedFileUrl;
            } catch (\Exception $e) {
                return response()->json(['message' => 'Failed to upload avatar.', 'error' => $e->getMessage()], 500);
            }
        }

        $user->save();

        return response()->json(['message' => 'Profile updated successfully.', 'user' => $user]);
    }
}
