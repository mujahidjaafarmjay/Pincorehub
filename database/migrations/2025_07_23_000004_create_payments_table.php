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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('reference')->unique(); // Paystack reference
            $table->decimal('amount', 10, 2); // Amount in Naira
            $table->string('currency')->default('NGN');
            $table->string('status')->default('PENDING'); // PENDING, SUCCESS, FAILED, CANCELLED
            $table->string('payment_gateway')->default('PAYSTACK');
            $table->nullableMorphs('payable'); // Polymorphic relation to Course, Booking, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
