<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Log;

class ProcessImageUpload implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $filePath;
    protected $model;
    protected $attribute;

    /**
     * Create a new job instance.
     */
    public function __construct(string $filePath, $model, string $attribute)
    {
        $this->filePath = $filePath;
        $this->model = $model;
        $this->attribute = $attribute;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $uploadedFileUrl = Cloudinary::upload($this->filePath)->getSecurePath();

            // Update the model with the Cloudinary URL
            $this->model->{$this->attribute} = $uploadedFileUrl;
            $this->model->save();

            // Clean up the temporary file
            if (file_exists($this->filePath)) {
                unlink($this->filePath);
            }

            Log::info("Image uploaded to Cloudinary and model updated: " . $uploadedFileUrl);

        } catch (\Exception $e) {
            Log::error("Failed to upload image to Cloudinary for model " . get_class($this->model) . " (ID: " . $this->model->id . "): " . $e->getMessage());
            // You might want to handle this error, e.g., notify admin, set a default image, etc.
        }
    }
}
