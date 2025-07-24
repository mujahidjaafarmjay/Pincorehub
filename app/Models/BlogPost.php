<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'author_id',
        'featured_image',
        'category',
        'tags',
        'status',
        'published_at',
    ];

    protected $casts = [
        'tags' => 'array', // Cast tags to an array
        'published_at' => 'datetime',
    ];

    /**
     * Get the author of the blog post.
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Get the comments for the blog post.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Automatically generate slug when title is set.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($blogPost) {
            $blogPost->slug = Str::slug($blogPost->title);
        });

        static::updating(function ($blogPost) {
            if ($blogPost->isDirty('title')) {
                $blogPost->slug = Str::slug($blogPost->title);
            }
        });
    }
}
