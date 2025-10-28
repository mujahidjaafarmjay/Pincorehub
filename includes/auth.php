<?php
session_start();

function is_logged_in() {
    return isset($_SESSION['user_id']);
}

function require_login() {
    if (!is_logged_in()) {
        header('Location: /views/login.php');
        exit();
    }
}

function is_admin() {
    return is_logged_in() && $_SESSION['is_admin'];
}

function require_admin() {
    if (!is_admin()) {
        die('You are not authorized to access this page.');
    }
}
