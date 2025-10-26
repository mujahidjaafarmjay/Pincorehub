<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
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
            'amount' => fake()->randomFloat(2, 10, 1000),
            'currency' => 'NGN',
            'reference' => fake()->unique()->asciify('********************'),
            'status' => fake()->randomElement(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']),
            'payment_method' => fake()->randomElement(['card', 'bank_transfer']),
            'description' => fake()->sentence(),
            'metadata' => ['foo' => 'bar'],
        ];
    }
}
