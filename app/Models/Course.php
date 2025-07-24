<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'category',
        'image',
        'duration_hours',
        'instructor_id',
        'status',
    ];

    /**
     * Get the instructor that teaches the course.
     */
    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    /**
     * Get the lessons for the course.
     */
    public function lessons()
    {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }

    /**
     * Get the enrollments for the course.
     */
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    /**
     * Get the payments associated with this course.
     */
    public function payments()
    {
        return $this->morphMany(Payment::class, 'payable');
    }

    /**
     * Get the certificates issued for this course.
     */
    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }
}
