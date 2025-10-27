<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class UploadApiController extends Controller
{
    /**
     * Generate Cloudinary upload signature.
     * This is useful if you want to upload directly from the client-side
     * but still want to secure the upload process.
     * @param Request $request
     * @return JsonResponse
     */
    public function getSignature(Request $request): JsonResponse
    {
        $timestamp = time();
        $params = [
            'timestamp' => $timestamp,
            // Add other parameters as needed, e.g., 'folder'
        ];

        $signature = Cloudinary::api()->signParameters($params);

        return response()->json([
            'signature' => $signature,
            'timestamp' => $timestamp,
            'cloud_name' => config('cloudinary.cloud_name'),
            'api_key' => config('cloudinary.api_key'),
        ]);
    }
}
