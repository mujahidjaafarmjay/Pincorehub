<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'title',
        'slug',
        'excerpt',
        'content',
        'image',
        'category',
        'tags',
        'published',
        'author_id',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
        ];
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($blogPost) {
            if (empty($blogPost->slug)) {
                $blogPost->slug = Str::slug($blogPost->title);
            }
        });

        static::updating(function ($blogPost) {
            if ($blogPost->isDirty('title') && empty($blogPost->slug)) {
                $blogPost->slug = Str::slug($blogPost->title);
            }
        });
    }
}
