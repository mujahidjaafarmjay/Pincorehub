<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Course;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class AdminCourseTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $admin;
    protected $instructor;
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        // Create users with different roles
        $this->admin = User::factory()->create(['role' => User::ROLE_ADMIN]);
        $this->instructor = User::factory()->create(['role' => User::ROLE_INSTRUCTOR]);
        $this->user = User::factory()->create(['role' => User::ROLE_USER]);

        // Fake storage for image uploads
        Storage::fake('public');
    }

    /** @test */
    public function admin_can_view_course_index()
    {
        $this->actingAs($this->admin)
             ->getJson('/api/admin/courses')
             ->assertOk();
    }
}
