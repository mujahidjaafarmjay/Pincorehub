<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\User;

class UpdateCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Only allow admins or the course instructor to update courses
        $course = $this->route('course'); // Assuming route model binding
        return $this->user()->hasRole('admin') || ($course && $course->instructor_id === $this->user()->id);
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
