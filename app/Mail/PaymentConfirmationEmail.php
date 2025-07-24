<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Payment;
use App\Models\Course;
use App\Models\Booking;

class PaymentConfirmationEmail extends Mailable implements ShouldQueue // Implemented ShouldQueue
{
    use Queueable, SerializesModels;

    public $payment;
    public $item; // Course or Booking

    /**
     * Create a new message instance.
     */
    public function __construct(Payment $payment, $item = null)
    {
        $this->payment = $payment;
        $this->item = $item;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your PINCOREHUB Payment Confirmation',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.payment_confirmation',
            with: [
                'payment' => $this->payment,
                'item' => $this->item,
                'itemType' => $this->payment->payable_type === Course::class ? 'Course' : ($this->payment->payable_type === Booking::class ? 'Booking' : 'Item'),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
