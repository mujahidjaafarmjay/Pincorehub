<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
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
            'blog_post_id' => \App\Models\BlogPost::factory(),
            'user_id' => \App\Models\User::factory(),
            'content' => fake()->paragraph(),
            'approved' => fake()->boolean(),
        ];
    }
}
