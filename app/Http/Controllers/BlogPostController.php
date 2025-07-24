<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    /**
     * Display a listing of the blog posts.
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $query = BlogPost::where('status', 'PUBLISHED')->with('author');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                  ->orWhere('content', 'like', '%' . $search . '%')
                  ->orWhereJsonContains('tags', $search);
            });
        }

        $blogPosts = $query->orderBy('published_at', 'desc')->paginate(10);
        return view('blog.index', compact('blogPosts'));
    }

    /**
     * Display the specified blog post.
     * @param string $slug
     * @return \Illuminate\View\View
     */
    public function show(string $slug)
    {
        $blogPost = BlogPost::where('slug', $slug)
                            ->where('status', 'PUBLISHED')
                            ->with('author', 'comments.user')
                            ->firstOrFail();
        return view('blog.show', compact('blogPost'));
    }
}
