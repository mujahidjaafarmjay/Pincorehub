<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
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
            'service' => fake()->word(),
            'date' => fake()->dateTime(),
            'time' => fake()->time(),
            'location' => fake()->address(),
            'message' => fake()->paragraph(),
            'phone' => fake()->phoneNumber(),
            'status' => fake()->randomElement(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']),
        ];
    }
}
