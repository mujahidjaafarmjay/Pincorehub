<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Enrollment>
 */
class EnrollmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'user_id' => \App\Models\User::factory(),
            'course_id' => \App\Models\Course::factory(),
            'enrolled_at' => fake()->dateTime(),
            'progress' => fake()->randomFloat(2, 0, 100),
            'completed' => fake()->boolean(),
        ];
    }
}
