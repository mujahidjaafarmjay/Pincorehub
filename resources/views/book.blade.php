@extends('layouts.app')

@section('title', 'Book a Consultation - PINCOREHUB')
@section('description', 'Schedule a consultation with PINCOREHUB experts for personalized tech solutions, IT consulting, or project discussions.')

@section('content')
    <section class="py-16 bg-white dark:bg-gray-800">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Book a Consultation</h1>

            <p class="text-center text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                Ready to take your project to the next level? Schedule a personalized consultation with our experts.
                Whether you need strategic advice, project planning, or a deep dive into specific tech challenges,
                we're here to help.
            </p>

            <div class="max-w-2xl mx-auto card p-8">
                <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Schedule Your Session</h2>

                <form action="{{ route('payments.initialize') }}" method="POST" class="space-y-6">
                    @csrf
                    <input type="hidden" name="item_type" value="booking">
                    <input type="hidden" name="item_id" value="1"> {{-- Placeholder: Replace with actual booking ID --}}

                    <div>
                        <label for="service_type" class="form-label">Service Type</label>
                        <select id="service_type" name="service_type" class="form-input" required>
                            <option value="">Select a service</option>
                            <option value="IT Consulting">IT Consulting (₦5,000)</option>
                            <option value="Web Development Consultation">Web Development Consultation (₦7,500)</option>
                            <option value="Digital Marketing Strategy">Digital Marketing Strategy (₦6,000)</option>
                            <option value="UI/UX Design Review">UI/UX Design Review (₦4,500)</option>
                        </select>
                    </div>

                    <div>
                        <label for="scheduled_date" class="form-label">Preferred Date</label>
                        <input type="date" id="scheduled_date" name="scheduled_date" class="form-input" required>
                    </div>

                    <div>
                        <label for="scheduled_time" class="form-label">Preferred Time</label>
                        <input type="time" id="scheduled_time" name="scheduled_time" class="form-input" required>
                    </div>

                    <div>
                        <label for="notes" class="form-label">Notes / Specific Questions</label>
                        <textarea id="notes" name="notes" rows="4" class="form-input" placeholder="Tell us more about your needs..."></textarea>
                    </div>

                    {{-- Amount will be dynamically set by JavaScript based on service_type selection --}}
                    <div>
                        <label for="amount_display" class="form-label">Consultation Fee</label>
                        <input type="text" id="amount_display" class="form-input bg-gray-100 dark:bg-gray-700 cursor-not-allowed" value="₦0.00" readonly>
                        <input type="hidden" id="amount_hidden" name="amount" value="0"> {{-- Amount in kobo for Paystack --}}
                    </div>

                    <button type="submit" class="btn-primary w-full">Proceed to Payment</button>
                </form>
            </div>
        </div>
    </section>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const serviceTypeSelect = document.getElementById('service_type');
            const amountDisplay = document.getElementById('amount_display');
            const amountHidden = document.getElementById('amount_hidden');

            const servicePrices = {
                'IT Consulting': 500000, // ₦5,000.00 in kobo
                'Web Development Consultation': 750000, // ₦7,500.00 in kobo
                'Digital Marketing Strategy': 600000, // ₦6,000.00 in kobo
                'UI/UX Design Review': 450000, // ₦4,500.00 in kobo
            };

            serviceTypeSelect.addEventListener('change', function() {
                const selectedService = serviceTypeSelect.value;
                const priceInKobo = servicePrices[selectedService] || 0;
                const priceInNaira = priceInKobo / 100;

                amountDisplay.value = `₦${priceInNaira.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                amountHidden.value = priceInKobo;
            });

            // Initialize on page load if a value is pre-selected (e.g., after validation error)
            serviceTypeSelect.dispatchEvent(new Event('change'));
        });
    </script>
@endsection
