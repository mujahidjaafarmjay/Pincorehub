<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service_type',
        'scheduled_at',
        'status',
        'notes',
        'payment_id',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
    ];

    /**
     * Get the user that made the booking.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the payment associated with this booking.
     */
    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }

    /**
     * Get the payments associated with this booking (morphMany for consistency if needed).
     */
    public function payments()
    {
        return $this->morphMany(Payment::class, 'payable');
    }
}
