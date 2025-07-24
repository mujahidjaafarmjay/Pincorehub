<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\BlogPost;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Queue;
use App\Jobs\ProcessImageUpload;

class AdminBlogPostTest extends TestCase
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
    public function admin_can_view_blog_post_index()
    {
        $this->actingAs($this->admin)
             ->get(route('admin.blog.index'))
             ->assertOk()
             ->assertViewIs('admin.blog.index');
    }

    /** @test */
    public function instructor_can_view_blog_post_index()
    {
        $this->actingAs($this->instructor)
             ->get(route('admin.blog.index'))
             ->assertOk()
             ->assertViewIs('admin.blog.index');
    }

    /** @test */
    public function regular_user_cannot_view_blog_post_index()
    {
        $this->actingAs($this->user)
             ->get(route('admin.blog.index'))
             ->assertForbidden();
    }

    /** @test */
    public function guest_cannot_view_blog_post_index()
    {
        $this->get(route('admin.blog.index'))
             ->assertRedirect(route('login'));
    }

    /** @test */
    public function admin_can_create_a_blog_post()
    {
        $postData = [
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraphs(3, true),
            'category' => $this->faker->word,
            'tags' => 'tag1,tag2,tag3',
            'status' => 'PUBLISHED',
            'featured_image' => UploadedFile::fake()->image('blog_image.jpg', 800, 600)->size(1000),
        ];

        $response = $this->actingAs($this->admin)
                         ->post(route('admin.blog.store'), $postData);

        $response->assertRedirect(route('admin.blog.index'))
                 ->assertSessionHas('success', 'Blog post created successfully.');

        $this->assertDatabaseHas('blog_posts', [
            'title' => $postData['title'],
            'content' => $postData['content'],
            'category' => $postData['category'],
            'status' => $postData['status'],
            'author_id' => $this->admin->id,
        ]);

        // Assert that the image upload job was dispatched
        Queue::assertPushed(ProcessImageUpload::class, function ($job) use ($postData) {
            return $job->attribute === 'featured_image' && str_contains($job->filePath, $postData['featured_image']->hashName());
        });
    }

    /** @test */
    public function instructor_can_create_a_blog_post()
    {
        $postData = [
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraphs(3, true),
            'category' => $this->faker->word,
            'tags' => 'tagA,tagB',
            'status' => 'DRAFT',
            'featured_image' => UploadedFile::fake()->image('blog_image.png', 800, 600)->size(1000),
        ];

        $response = $this->actingAs($this->instructor)
                         ->post(route('admin.blog.store'), $postData);

        $response->assertRedirect(route('admin.blog.index'))
                 ->assertSessionHas('success', 'Blog post created successfully.');

        $this->assertDatabaseHas('blog_posts', [
            'title' => $postData['title'],
            'author_id' => $this->instructor->id,
            'status' => $postData['status'],
        ]);
        Queue::assertPushed(ProcessImageUpload::class);
    }

    /** @test */
    public function admin_can_update_a_blog_post()
    {
        $blogPost = BlogPost::factory()->create(['author_id' => $this->instructor->id]);
        $updatedTitle = 'Updated Blog Post Title';
        $updatedContent = 'Updated blog post content.';

        $response = $this->actingAs($this->admin)
                         ->put(route('admin.blog.update', $blogPost), [
                             'title' => $updatedTitle,
                             'content' => $updatedContent,
                             'category' => $blogPost->category,
                             'tags' => implode(',', $blogPost->tags),
                             'status' => $blogPost->status,
                         ]);

        $response->assertRedirect(route('admin.blog.index'))
                 ->assertSessionHas('success', 'Blog post updated successfully.');

        $this->assertDatabaseHas('blog_posts', [
            'id' => $blogPost->id,
            'title' => $updatedTitle,
            'content' => $updatedContent,
        ]);
    }

    /** @test */
    public function instructor_can_update_their_own_blog_post()
    {
        $blogPost = BlogPost::factory()->create(['author_id' => $this->instructor->id]);
        $updatedTitle = 'Instructor Updated Blog Post Title';

        $response = $this->actingAs($this->instructor)
                         ->put(route('admin.blog.update', $blogPost), [
                             'title' => $updatedTitle,
                             'content' => $blogPost->content,
                             'category' => $blogPost->category,
                             'tags' => implode(',', $blogPost->tags),
                             'status' => $blogPost->status,
                         ]);

        $response->assertRedirect(route('admin.blog.index'))
                 ->assertSessionHas('success', 'Blog post updated successfully.');

        $this->assertDatabaseHas('blog_posts', [
            'id' => $blogPost->id,
            'title' => $updatedTitle,
        ]);
    }

    /** @test */
    public function instructor_cannot_update_another_instructors_blog_post()
    {
        $anotherInstructor = User::factory()->create(['role' => User::ROLE_INSTRUCTOR]);
        $blogPost = BlogPost::factory()->create(['author_id' => $anotherInstructor->id]);
        $updatedTitle = 'Attempted Update';

        $response = $this->actingAs($this->instructor)
                         ->put(route('admin.blog.update', $blogPost), [
                             'title' => $updatedTitle,
                             'content' => $blogPost->content,
                             'category' => $blogPost->category,
                             'tags' => implode(',', $blogPost->tags),
                             'status' => $blogPost->status,
                         ]);

        $response->assertForbidden();
        $this->assertDatabaseMissing('blog_posts', [
            'id' => $blogPost->id,
            'title' => $updatedTitle,
        ]);
    }

    /** @test */
    public function admin_can_delete_a_blog_post()
    {
        $blogPost = BlogPost::factory()->create();

        $response = $this->actingAs($this->admin)
                         ->delete(route('admin.blog.destroy', $blogPost));

        $response->assertRedirect(route('admin.blog.index'))
                 ->assertSessionHas('success', 'Blog post deleted successfully.');

        $this->assertDatabaseMissing('blog_posts', ['id' => $blogPost->id]);
    }

    /** @test */
    public function instructor_can_delete_their_own_blog_post()
    {
        $blogPost = BlogPost::factory()->create(['author_id' => $this->instructor->id]);

        $response = $this->actingAs($this->instructor)
                         ->delete(route('admin.blog.destroy', $blogPost));

        $response->assertRedirect(route('admin.blog.index'))
                 ->assertSessionHas('success', 'Blog post deleted successfully.');

        $this->assertDatabaseMissing('blog_posts', ['id' => $blogPost->id]);
    }

    /** @test */
    public function instructor_cannot_delete_another_instructors_blog_post()
    {
        $anotherInstructor = User::factory()->create(['role' => User::ROLE_INSTRUCTOR]);
        $blogPost = BlogPost::factory()->create(['author_id' => $anotherInstructor->id]);

        $response = $this->actingAs($this->instructor)
                         ->delete(route('admin.blog.destroy', $blogPost));

        $response->assertForbidden();
        $this->assertDatabaseHas('blog_posts', ['id' => $blogPost->id]);
    }
}
