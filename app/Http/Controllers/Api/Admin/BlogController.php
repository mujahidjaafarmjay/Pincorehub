<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class BlogController extends Controller
{
    public function index()
    {
        Gate::authorize('admin-or-instructor');
        $blogPosts = BlogPost::with('author:id,name')->latest()->get();
        return response()->json($blogPosts);
    }

    public function store(Request $request)
    {
        Gate::authorize('admin-or-instructor');

        $validated = $request->validate([
            'title' => 'required|string|min:1',
            'content' => 'required|string|min:1',
            'author_id' => 'required|string|exists:users,id',
            'image' => 'nullable|string|url',
            'category' => 'required|string|min:1',
            'tags' => 'nullable|array',
            'published' => 'nullable|boolean',
        ]);

        $blogPost = BlogPost::create($validated);

        return response()->json($blogPost, 201);
    }

    public function show(BlogPost $blogPost)
    {
        Gate::authorize('admin-or-instructor');
        return response()->json($blogPost->load('author:id,name'));
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        Gate::authorize('admin-or-instructor');

        $validated = $request->validate([
            'title' => 'string|min:1',
            'content' => 'string|min:1',
            'author_id' => 'string|exists:users,id',
            'image' => 'nullable|string|url',
            'category' => 'string|min:1',
            'tags' => 'nullable|array',
            'published' => 'nullable|boolean',
        ]);

        $blogPost->update($validated);

        return response()->json($blogPost);
    }

    public function destroy(BlogPost $blogPost)
    {
        Gate::authorize('admin-or-instructor');
        $blogPost->delete();
        return response()->json(['message' => 'Blog post deleted successfully']);
    }
}
