<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\User;

class StoreCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Only allow admins or instructors to create courses
        return $this->user()->hasRole('admin') || $this->user()->hasRole('instructor');
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
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
            'duration_hours' => 'nullable|integer|min:1',
            'image' => 'nullable|image|max:2048', // Max 2MB
            'instructor_id' => [
                'nullable',
                'exists:users,id',
                Rule::in(User::where('role', User::ROLE_INSTRUCTOR)->pluck('id'))
            ],
            'status' => 'required|in:DRAFT,PUBLISHED',
        ];
    }
}
