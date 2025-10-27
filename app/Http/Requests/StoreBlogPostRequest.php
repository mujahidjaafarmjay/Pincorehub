<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreBlogPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Only allow admins or instructors to create blog posts
        return Auth::user()->hasRole('admin') || Auth::user()->hasRole('instructor');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:2048', // Max 2MB
            'category' => 'nullable|string|max:255',
            'tags' => 'nullable|string', // Comma-separated string
            'status' => 'required|in:DRAFT,PUBLISHED',
        ];
    }
}
