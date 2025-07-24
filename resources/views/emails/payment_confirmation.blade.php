<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PINCOREHUB Payment Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .header h1 {
            color: #333;
            margin: 0;
        }
        .content {
            padding: 20px 0;
        }
        .content p {
            margin-bottom: 10px;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .details-table th, .details-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        .details-table th {
            background-color: #f2f2f2;
        }
        .button {
            display: inline-block;
            background-color: #20c997; /* Teal color */
            color: #ffffff !important;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Payment Confirmation</h1>
        </div>
        <div class="content">
            <p>Hello {{ $payment->user->name }},</p>
            <p>
                Your payment for <strong>₦{{ number_format($payment->amount, 2) }}</strong> has been successfully processed!
                Thank you for your purchase with PINCOREHUB.
            </p>

            <p><strong>Payment Details:</strong></p>
            <table class="details-table">
                <tr>
                    <th>Reference:</th>
                    <td>{{ $payment->reference }}</td>
                </tr>
                <tr>
                    <th>Amount:</th>
                    <td>₦{{ number_format($payment->amount, 2) }}</td>
                </tr>
                <tr>
                    <th>Status:</th>
                    <td>{{ $payment->status }}</td>
                </tr>
                <tr>
                    <th>Date:</th>
                    <td>{{ $payment->created_at->format('M d, Y H:i A') }}</td>
                </tr>
                @if($item)
                    <tr>
                        <th>{{ $itemType }}:</th>
                        <td>{{ $item->title ?? $item->service_type }}</td>
                    </tr>
                @endif
            </table>

            @if($itemType === 'Course')
                <p>You now have full access to the course: <strong>{{ $item->title }}</strong>.</p>
                <p style="text-align: center;">
                    <a href="{{ url('/courses/' . $item->id) }}" class="button">Go to Course</a>
                </p>
            @elseif($itemType === 'Booking')
                <p>Your booking for <strong>{{ $item->service_type }}</strong> on <strong>{{ $item->scheduled_at->format('M d, Y H:i A') }}</strong> is now confirmed.</p>
                <p style="text-align: center;">
                    <a href="{{ url('/dashboard/bookings') }}" class="button">View Your Bookings</a>
                </p>
            @endif

            <p>
                If you have any questions or need further assistance, please do not hesitate to contact our support team.
            </p>
            <p>Best regards,</p>
            <p>The PINCOREHUB Team</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} PINCOREHUB. All rights reserved.</p>
            <p>123 Tech Hub, Lagos, Nigeria</p>
        </div>
    </div>
</body>
</html>
