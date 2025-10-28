<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../config/database.php';
require_admin();

if (!isset($_GET['id'])) {
    die('User ID not specified.');
}
$user_id = $_GET['id'];

// Prevent admin from deleting their own account
if ($user_id == $_SESSION['user_id']) {
    die("You cannot delete your own account.");
}

// Delete user
$stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
if ($stmt->execute([$user_id])) {
    header("Location: /admin/users.php");
    exit();
} else {
    die('Failed to delete user.');
}
