<?php
require_once __DIR__ . '/../config/database.php';

if (isset($_GET['token'])) {
    $token = $_GET['token'];

    // Find user with the given token
    $stmt = $pdo->prepare("SELECT * FROM users WHERE verification_token = ?");
    $stmt->execute([$token]);
    $user = $stmt->fetch();

    if ($user) {
        // Mark user as verified
        $stmt = $pdo->prepare("UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?");
        if ($stmt->execute([$user['id']])) {
            echo 'Email verified successfully! You can now login.';
            // Redirect to login page after a few seconds
            header("refresh:3;url=/views/login.php");
        } else {
            die('Something went wrong!');
        }
    } else {
        die('Invalid verification token!');
    }
} else {
    die('No token provided!');
}
