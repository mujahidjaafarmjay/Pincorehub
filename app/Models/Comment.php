<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'blog_post_id',
        'content',
    ];

    /**
     * Get the user that owns the comment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the blog post that the comment belongs to.
     */
    public function blogPost()
    {
        return $this->belongsTo(BlogPost::class);
    }
}
