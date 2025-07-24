<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'reference',
        'amount',
        'currency',
        'status',
        'payment_gateway',
        'payable_type',
        'payable_id',
    ];

    /**
     * Get the user that made the payment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the parent payable model (e.g., Course, Booking).
     */
    public function payable()
    {
        return $this->morphTo();
    }
}
