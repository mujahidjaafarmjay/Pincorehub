<?php
require_once __DIR__ . '/../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['token'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if (empty($token) || empty($password) || empty($confirm_password)) {
        die('Please fill all required fields!');
    }

    if ($password !== $confirm_password) {
        die('Passwords do not match!');
    }

    // Find user with the given token
    $stmt = $pdo->prepare("SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()");
    $stmt->execute([$token]);
    $user = $stmt->fetch();

    if ($user) {
        // Hash the new password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Update password and clear reset token
        $stmt = $pdo->prepare("UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?");
        if ($stmt->execute([$hashed_password, $user['id']])) {
            echo 'Password reset successfully! You can now login with your new password.';
            // Redirect to login page after a few seconds
            header("refresh:3;url=/views/login.php");
        } else {
            die('Something went wrong!');
        }
    } else {
        die('Invalid or expired token!');
    }
}
