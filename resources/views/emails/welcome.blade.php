<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to PINCOREHUB!</title>
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
            <h1>Welcome to PINCOREHUB!</h1>
        </div>
        <div class="content">
            <p>Hello {{ $userName }},</p>
            <p>
                Welcome to PINCOREHUB! We're thrilled to have you join our community.
                You now have access to a world of cutting-edge tech solutions, insightful online courses,
                and expert consultations designed to empower your digital journey.
            </p>
            <p>
                Explore our courses, read our latest blog posts, or book a consultation to discuss your next big project.
            </p>
            <p style="text-align: center;">
                <a href="{{ url('/') }}" class="button">Visit PINCOREHUB</a>
            </p>
            <p>
                If you have any questions or need assistance, feel free to reach out to our support team.
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
