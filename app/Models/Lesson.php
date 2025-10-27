<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'course_id',
        'title',
        'description',
        'video_url',
        'duration',
        'order',
        'is_published',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
