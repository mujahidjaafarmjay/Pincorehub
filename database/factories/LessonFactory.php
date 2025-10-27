<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lesson>
 */
class LessonFactory extends Factory
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
            'course_id' => \App\Models\Course::factory(),
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'video_url' => fake()->url(),
            'duration' => fake()->numberBetween(60, 3600),
            'order' => fake()->numberBetween(1, 100),
            'is_published' => fake()->boolean(),
        ];
    }
}
