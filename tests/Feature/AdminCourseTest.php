<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Course;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Queue;
use App\Jobs\ProcessImageUpload;

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
        Queue::fake(); // Fake the queue for job dispatching
    }

    /** @test */
    public function admin_can_view_course_index()
    {
        $this->actingAs($this->admin)
             ->get(route('admin.courses.index'))
             ->assertOk()
             ->assertViewIs('admin.courses.index');
    }

    /** @test */
    public function instructor_can_view_course_index()
    {
        $this->actingAs($this->instructor)
             ->get(route('admin.courses.index'))
             ->assertOk()
             ->assertViewIs('admin.courses.index');
    }

    /** @test */
    public function regular_user_cannot_view_course_index()
    {
        $this->actingAs($this->user)
             ->get(route('admin.courses.index'))
             ->assertForbidden();
    }

    /** @test */
    public function guest_cannot_view_course_index()
    {
        $this->get(route('admin.courses.index'))
             ->assertRedirect(route('login'));
    }

    /** @test */
    public function admin_can_create_a_course()
    {
        $courseData = [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 10, 500),
            'category' => $this->faker->word,
            'duration_hours' => $this->faker->numberBetween(1, 100),
            'instructor_id' => $this->instructor->id,
            'status' => 'PUBLISHED',
            'image' => UploadedFile::fake()->image('course.jpg', 600, 400)->size(500),
        ];

        $response = $this->actingAs($this->admin)
                         ->post(route('admin.courses.store'), $courseData);

        $response->assertRedirect(route('admin.courses.index'))
                 ->assertSessionHas('success', 'Course created successfully.');

        $this->assertDatabaseHas('courses', [
            'title' => $courseData['title'],
            'description' => $courseData['description'],
            'price' => $courseData['price'],
            'category' => $courseData['category'],
            'duration_hours' => $courseData['duration_hours'],
            'instructor_id' => $courseData['instructor_id'],
            'status' => $courseData['status'],
        ]);

        // Assert that the image upload job was dispatched
        Queue::assertPushed(ProcessImageUpload::class, function ($job) use ($courseData) {
            return $job->attribute === 'image' && str_contains($job->filePath, $courseData['image']->hashName());
        });
    }

    /** @test */
    public function instructor_can_create_a_course()
    {
        $courseData = [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 10, 500),
            'category' => $this->faker->word,
            'duration_hours' => $this->faker->numberBetween(1, 100),
            'instructor_id' => $this->instructor->id,
            'status' => 'DRAFT',
            'image' => UploadedFile::fake()->image('course.png', 600, 400)->size(500),
        ];

        $response = $this->actingAs($this->instructor)
                         ->post(route('admin.courses.store'), $courseData);

        $response->assertRedirect(route('admin.courses.index'))
                 ->assertSessionHas('success', 'Course created successfully.');

        $this->assertDatabaseHas('courses', [
            'title' => $courseData['title'],
            'instructor_id' => $courseData['instructor_id'],
            'status' => $courseData['status'],
        ]);
        Queue::assertPushed(ProcessImageUpload::class);
    }

    /** @test */
    public function admin_can_update_a_course()
    {
        $course = Course::factory()->create(['instructor_id' => $this->instructor->id]);
        $updatedTitle = 'Updated Course Title';
        $updatedDescription = 'Updated course description.';

        $response = $this->actingAs($this->admin)
                         ->put(route('admin.courses.update', $course), [
                             'title' => $updatedTitle,
                             'description' => $updatedDescription,
                             'price' => $course->price,
                             'category' => $course->category,
                             'duration_hours' => $course->duration_hours,
                             'instructor_id' => $course->instructor_id,
                             'status' => $course->status,
                         ]);

        $response->assertRedirect(route('admin.courses.index'))
                 ->assertSessionHas('success', 'Course updated successfully.');

        $this->assertDatabaseHas('courses', [
            'id' => $course->id,
            'title' => $updatedTitle,
            'description' => $updatedDescription,
        ]);
    }

    /** @test */
    public function instructor_can_update_their_own_course()
    {
        $course = Course::factory()->create(['instructor_id' => $this->instructor->id]);
        $updatedTitle = 'Instructor Updated Course Title';

        $response = $this->actingAs($this->instructor)
                         ->put(route('admin.courses.update', $course), [
                             'title' => $updatedTitle,
                             'description' => $course->description,
                             'price' => $course->price,
                             'category' => $course->category,
                             'duration_hours' => $course->duration_hours,
                             'instructor_id' => $course->instructor_id,
                             'status' => $course->status,
                         ]);

        $response->assertRedirect(route('admin.courses.index'))
                 ->assertSessionHas('success', 'Course updated successfully.');

        $this->assertDatabaseHas('courses', [
            'id' => $course->id,
            'title' => $updatedTitle,
        ]);
    }

    /** @test */
    public function instructor_cannot_update_another_instructors_course()
    {
        $anotherInstructor = User::factory()->create(['role' => User::ROLE_INSTRUCTOR]);
        $course = Course::factory()->create(['instructor_id' => $anotherInstructor->id]);
        $updatedTitle = 'Attempted Update';

        $response = $this->actingAs($this->instructor)
                         ->put(route('admin.courses.update', $course), [
                             'title' => $updatedTitle,
                             'description' => $course->description,
                             'price' => $course->price,
                             'category' => $course->category,
                             'duration_hours' => $course->duration_hours,
                             'instructor_id' => $course->instructor_id,
                             'status' => $course->status,
                         ]);

        $response->assertForbidden();
        $this->assertDatabaseMissing('courses', [
            'id' => $course->id,
            'title' => $updatedTitle,
        ]);
    }

    /** @test */
    public function admin_can_delete_a_course()
    {
        $course = Course::factory()->create();

        $response = $this->actingAs($this->admin)
                         ->delete(route('admin.courses.destroy', $course));

        $response->assertRedirect(route('admin.courses.index'))
                 ->assertSessionHas('success', 'Course deleted successfully.');

        $this->assertDatabaseMissing('courses', ['id' => $course->id]);
    }

    /** @test */
    public function instructor_can_delete_their_own_course()
    {
        $course = Course::factory()->create(['instructor_id' => $this->instructor->id]);

        $response = $this->actingAs($this->instructor)
                         ->delete(route('admin.courses.destroy', $course));

        $response->assertRedirect(route('admin.courses.index'))
                 ->assertSessionHas('success', 'Course deleted successfully.');

        $this->assertDatabaseMissing('courses', ['id' => $course->id]);
    }

    /** @test */
    public function instructor_cannot_delete_another_instructors_course()
    {
        $anotherInstructor = User::factory()->create(['role' => User::ROLE_INSTRUCTOR]);
        $course = Course::factory()->create(['instructor_id' => $anotherInstructor->id]);

        $response = $this->actingAs($this->instructor)
                         ->delete(route('admin.courses.destroy', $course));

        $response->assertForbidden();
        $this->assertDatabaseHas('courses', ['id' => $course->id]);
    }
}
