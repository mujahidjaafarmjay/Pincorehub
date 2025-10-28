<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];

    if (empty($email)) {
        die('Please enter your email address.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('Invalid email format.');
    }

    // Check if user exists
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        // Generate reset token
        $reset_token = bin2hex(random_bytes(32));
        $reset_token_expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

        // Store token in database
        $stmt = $pdo->prepare("UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?");
        if ($stmt->execute([$reset_token, $reset_token_expires, $user['id']])) {
            // Send reset email
            $mail = new PHPMailer(true);
            try {
                //Server settings
                $mail->isSMTP();
                $mail->Host = 'smtp.example.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'user@example.com';
                $mail->Password = 'secret';
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                //Recipients
                $mail->setFrom('from@example.com', 'pincohub');
                $mail->addAddress($email, $user['username']);

                // Content
                $mail->isHTML(true);
                $mail->Subject = 'Password Reset Request';
                $reset_link = "http://{$_SERVER['HTTP_HOST']}/views/reset-password.php?token={$reset_token}";
                $mail->Body = "Please click the following link to reset your password: <a href='{$reset_link}'>{$reset_link}</a>";

                $mail->send();
                echo 'Password reset link has been sent to your email.';
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
        } else {
            die('Something went wrong!');
        }
    } else {
        // To prevent user enumeration, we don't reveal if the user was found or not.
        echo 'If an account with that email exists, a password reset link has been sent.';
    }
}
