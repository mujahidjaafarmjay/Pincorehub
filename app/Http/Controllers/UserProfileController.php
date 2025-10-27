<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class UserProfileController extends Controller
{
    /**
     * Show the user's dashboard.
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $user = Auth::user();
        return view('dashboard.index', compact('user'));
    }

    /**
     * Show the user's enrollments.
     * @return \Illuminate\View\View
     */
    public function enrollments()
    {
        $user = Auth::user();
        $enrollments = $user->enrollments()->with('course')->paginate(10);
        return view('dashboard.enrollments', compact('enrollments'));
    }

    /**
     * Show the user's bookings.
     * @return \Illuminate\View\View
     */
    public function bookings()
    {
        $user = Auth::user();
        $bookings = $user->bookings()->paginate(10);
        return view('dashboard.bookings', compact('bookings'));
    }

    /**
     * Show the form for editing the user's profile.
     * @return \Illuminate\View\View
     */
    public function editProfile()
    {
        $user = Auth::user();
        return view('dashboard.profile', compact('user'));
    }

    /**
     * Update the user's profile.
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateProfile(Request $request)
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
                return back()->withInput()->with('error', 'Failed to upload avatar: ' . $e->getMessage());
            }
        }

        $user->save();

        return redirect()->route('dashboard.profile.edit')->with('success', 'Profile updated successfully.');
    }
}
