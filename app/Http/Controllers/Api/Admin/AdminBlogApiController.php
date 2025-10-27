<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class AdminBlogApiController extends Controller
{
    /**
     * Display a listing of the blog posts for admin/instructor.
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $blogPosts = BlogPost::with('author')->paginate($request->input('per_page', 10));
        return response()->json($blogPosts);
    }

    /**
     * Store a newly created blog post in storage.
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'category' => 'nullable|string|max:255',
            'tags' => 'nullable|string', // Comma-separated string
            'status' => 'required|in:DRAFT,PUBLISHED',
        ]);

        $imageUrl = null;
        if ($request->hasFile('featured_image')) {
            try {
                $uploadedFileUrl = Cloudinary::upload($request->file('featured_image')->getRealPath())->getSecurePath();
                $imageUrl = $uploadedFileUrl;
            } catch (\Exception $e) {
                return response()->json(['message' => 'Failed to upload image.', 'error' => $e->getMessage()], 500);
            }
        }

        $blogPost = BlogPost::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->content,
            'author_id' => Auth::id(),
            'featured_image' => $imageUrl,
            'category' => $request->category,
            'tags' => $request->tags ? explode(',', $request->tags) : null,
            'status' => $request->status,
            'published_at' => $request->status === 'PUBLISHED' ? now() : null,
        ]);

        return response()->json(['message' => 'Blog post created successfully.', 'blog_post' => $blogPost], 201);
    }

    /**
     * Display the specified blog post.
     * @param BlogPost $blogPost
     * @return JsonResponse
     */
    public function show(BlogPost $blogPost): JsonResponse
    {
        $blogPost->load('author', 'comments.user');
        return response()->json($blogPost);
    }

    /**
     * Update the specified blog post in storage.
     * @param Request $request
     * @param BlogPost $blogPost
     * @return JsonResponse
     */
    public function update(Request $request, BlogPost $blogPost): JsonResponse
    {
        // Ensure only author or admin can update
        if (!Auth::user()->hasRole('admin') && $blogPost->author_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized action.'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'category' => 'nullable|string|max:255',
            'tags' => 'nullable|string',
            'status' => 'required|in:DRAFT,PUBLISHED',
        ]);

        $imageUrl = $blogPost->featured_image;
        if ($request->hasFile('featured_image')) {
            try {
                // Optionally delete old image from Cloudinary
                // if ($blogPost->featured_image) {
                //     Cloudinary::destroy(pathinfo($blogPost->featured_image)['filename']);
                // }
                $uploadedFileUrl = Cloudinary::upload($request->file('featured_image')->getRealPath())->getSecurePath();
                $imageUrl = $uploadedFileUrl;
            } catch (\Exception $e) {
                return response()->json(['message' => 'Failed to upload image.', 'error' => $e->getMessage()], 500);
            }
        }

        $blogPost->update([
            'title' => $request->title,
            'content' => $request->content,
            'featured_image' => $imageUrl,
            'category' => $request->category,
            'tags' => $request->tags ? explode(',', $request->tags) : null,
            'status' => $request->status,
            'published_at' => $request->status === 'PUBLISHED' && !$blogPost->published_at ? now() : $blogPost->published_at,
        ]);

        return response()->json(['message' => 'Blog post updated successfully.', 'blog_post' => $blogPost]);
    }

    /**
     * Remove the specified blog post from storage.
     * @param BlogPost $blogPost
     * @return JsonResponse
     */
    public function destroy(BlogPost $blogPost): JsonResponse
    {
        // Ensure only author or admin can delete
        if (!Auth::user()->hasRole('admin') && $blogPost->author_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized action.'], 403);
        }
        // Optionally delete image from Cloudinary
        // if ($blogPost->featured_image) {
        //     Cloudinary::destroy(pathinfo($blogPost->featured_image)['filename']);
        // }
        $blogPost->delete();
        return response()->json(['message' => 'Blog post deleted successfully.']);
    }
}
