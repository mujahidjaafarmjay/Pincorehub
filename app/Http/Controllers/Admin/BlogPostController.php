<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use App\Http\Requests\StoreBlogPostRequest;
use App\Http\Requests\UpdateBlogPostRequest;
use App\Jobs\ProcessImageUpload;
use Illuminate\Support\Facades\Storage;

class BlogPostController extends Controller
{
    /**
     * Display a listing of the blog posts for admin/instructor.
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $blogPosts = BlogPost::with('author')->paginate(10);
        return view('admin.blog.index', compact('blogPosts'));
    }

    /**
     * Show the form for creating a new blog post.
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('admin.blog.create');
    }

    /**
     * Store a newly created blog post in storage.
     * @param StoreBlogPostRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreBlogPostRequest $request)
    {
        $postData = $request->validated();

        // Handle tags conversion
        if (isset($postData['tags'])) {
            $postData['tags'] = explode(',', $postData['tags']);
        }

        $postData['author_id'] = Auth::id();
        $postData['slug'] = Str::slug($postData['title']);
        $postData['published_at'] = $postData['status'] === 'PUBLISHED' ? now() : null;
        $postData['featured_image'] = null; // Set to null initially

        // Create the blog post first to get an ID
        $blogPost = BlogPost::create($postData);

        if ($request->hasFile('featured_image')) {
            $imageFile = $request->file('featured_image');
            $path = $imageFile->store('temp', 'public'); // Store temporarily
            $fullPath = Storage::disk('public')->path($path);

            // Dispatch job to upload image to Cloudinary and update blog post
            ProcessImageUpload::dispatch($fullPath, $blogPost, 'featured_image');
        }

        return redirect()->route('admin.blog.index')->with('success', 'Blog post created successfully.');
    }

    /**
     * Show the form for editing the specified blog post.
     * @param BlogPost $blogPost
     * @return \Illuminate\View\View
     */
    public function edit(BlogPost $blogPost)
    {
        // Authorization handled by UpdateBlogPostRequest policy/middleware if applied globally
        return view('admin.blog.edit', compact('blogPost'));
    }

    /**
     * Update the specified blog post in storage.
     * @param UpdateBlogPostRequest $request
     * @param BlogPost $blogPost
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateBlogPostRequest $request, BlogPost $blogPost)
    {
        $postData = $request->validated();

        // Handle tags conversion
        if (isset($postData['tags'])) {
            $postData['tags'] = explode(',', $postData['tags']);
        }

        // Update published_at only if status changes to PUBLISHED and it wasn't published before
        if ($postData['status'] === 'PUBLISHED' && !$blogPost->published_at) {
            $postData['published_at'] = now();
        } elseif ($postData['status'] === 'DRAFT') {
            $postData['published_at'] = null; // Clear published_at if status is draft
        }

        if ($request->hasFile('featured_image')) {
            $imageFile = $request->file('featured_image');
            $path = $imageFile->store('temp', 'public'); // Store temporarily
            $fullPath = Storage::disk('public')->path($path);

            // Dispatch job to upload image to Cloudinary and update blog post
            ProcessImageUpload::dispatch($fullPath, $blogPost, 'featured_image');
            unset($postData['featured_image']); // Prevent immediate update, job will handle it
        }

        $blogPost->update($postData);

        return redirect()->route('admin.blog.index')->with('success', 'Blog post updated successfully.');
    }

    /**
     * Remove the specified blog post from storage.
     * @param BlogPost $blogPost
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(BlogPost $blogPost)
    {
        // Authorization handled by policy/middleware if applied globally
        // Optionally delete image from Cloudinary if needed (can be a separate job)
        // if ($blogPost->featured_image) {
        //     Cloudinary::destroy(pathinfo($blogPost->featured_image)['filename']);
        // }
        $blogPost->delete();
        return redirect()->route('admin.blog.index')->with('success', 'Blog post deleted successfully.');
    }
}
