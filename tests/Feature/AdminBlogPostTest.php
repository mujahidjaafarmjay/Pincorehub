<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\BlogPost;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

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
    }

    /** @test */
    public function admin_can_view_blog_post_index()
    {
        $this->actingAs($this->admin)
             ->getJson('/api/admin/blog')
             ->assertOk();
    }

    /** @test */
    public function instructor_can_view_blog_post_index()
    {
        $this->actingAs($this->instructor)
             ->getJson('/api/admin/blog')
             ->assertOk();
    }

    /** @test */
    public function regular_user_cannot_view_blog_post_index()
    {
        $this->actingAs($this->user)
             ->getJson('/api/admin/blog')
             ->assertForbidden();
    }

    /** @test */
    public function guest_cannot_view_blog_post_index()
    {
        $this->getJson('/api/admin/blog')
             ->assertUnauthorized();
    }

    /** @test */
    public function admin_can_create_a_blog_post()
    {
        $postData = [
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraphs(3, true),
            'category' => $this->faker->word,
            'tags' => ['tag1', 'tag2'],
            'published' => true,
            'author_id' => $this->admin->id,
        ];

        $this->actingAs($this->admin)
            ->postJson('/api/admin/blog', $postData)
            ->assertCreated();

        $this->assertDatabaseHas('blog_posts', [
            'title' => $postData['title'],
        ]);
    }

    /** @test */
    public function instructor_can_create_a_blog_post()
    {
        $postData = [
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraphs(3, true),
            'category' => $this->faker->word,
            'tags' => ['tagA', 'tagB'],
            'published' => false,
            'author_id' => $this->instructor->id,
        ];

        $this->actingAs($this->instructor)
            ->postJson('/api/admin/blog', $postData)
            ->assertCreated();

        $this->assertDatabaseHas('blog_posts', [
            'title' => $postData['title'],
        ]);
    }

    /** @test */
    public function admin_can_update_a_blog_post()
    {
        $blogPost = BlogPost::factory()->create(['author_id' => $this->instructor->id]);
        $updatedTitle = 'Updated Blog Post Title';

        $this->actingAs($this->admin)
            ->putJson('/api/admin/blog/' . $blogPost->id, [
                'title' => $updatedTitle,
            ])
            ->assertOk();

        $this->assertDatabaseHas('blog_posts', [
            'id' => $blogPost->id,
            'title' => $updatedTitle,
        ]);
    }

    /** @test */
    public function instructor_can_update_their_own_blog_post()
    {
        $blogPost = BlogPost::factory()->create(['author_id' => $this->instructor->id]);
        $updatedTitle = 'Instructor Updated Blog Post Title';

        $this->actingAs($this->instructor)
            ->putJson('/api/admin/blog/' . $blogPost->id, [
                'title' => $updatedTitle,
            ])
            ->assertOk();

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

        $this->actingAs($this->instructor)
            ->putJson('/api/admin/blog/' . $blogPost->id, [
                'title' => $updatedTitle,
            ])
            ->assertForbidden();
    }

    /** @test */
    public function admin_can_delete_a_blog_post()
    {
        $blogPost = BlogPost::factory()->create();

        $this->actingAs($this->admin)
            ->deleteJson('/api/admin/blog/' . $blogPost->id)
            ->assertOk();

        $this->assertDatabaseMissing('blog_posts', ['id' => $blogPost->id]);
    }

    /** @test */
    public function instructor_can_delete_their_own_blog_post()
    {
        $blogPost = BlogPost::factory()->create(['author_id' => $this->instructor->id]);

        $this->actingAs($this->instructor)
            ->deleteJson('/api/admin/blog/' . $blogPost->id)
            ->assertOk();

        $this->assertDatabaseMissing('blog_posts', ['id' => $blogPost->id]);
    }

    /** @test */
    public function instructor_cannot_delete_another_instructors_blog_post()
    {
        $anotherInstructor = User::factory()->create(['role' => User::ROLE_INSTRUCTOR]);
        $blogPost = BlogPost::factory()->create(['author_id' => $anotherInstructor->id]);

        $this->actingAs($this->instructor)
            ->deleteJson('/api/admin/blog/' . $blogPost->id)
            ->assertForbidden();
    }
}
