<?php

namespace App\Providers;

use App\Models\User;
use App\Policies\UserPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
use App\Models\Booking;
use App\Policies\BookingPolicy;

    protected $policies = [
        User::class => UserPolicy::class,
        Booking::class => BookingPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('admin-or-instructor', function (User $user) {
            return $user->role === 'ADMIN' || $user->role === 'INSTRUCTOR';
        });

        Gate::define('admin', function (User $user) {
            return $user->role === 'ADMIN';
        });
    }
}
