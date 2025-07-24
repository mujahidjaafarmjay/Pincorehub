<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->string('category');
            $table->string('image')->nullable(); // Cloudinary URL
            $table->integer('duration_hours')->nullable();
            $table->foreignId('instructor_id')->nullable()->constrained('users')->onDelete('set null'); // Instructor can be a user
            $table->string('status')->default('DRAFT'); // DRAFT, PUBLISHED, ARCHIVED
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
