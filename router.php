<?php
// router.php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Serve static files from public directory
if (preg_match('/\.(?:png|jpg|jpeg|gif|css|js)$/', $path)) {
    $public_path = __DIR__ . '/public' . $path;
    if (file_exists($public_path)) {
        return false; // Serve the requested resource as-is.
    }
}

// Route to PHP files
$file_path = __DIR__ . $path;
if (is_file($file_path)) {
    require $file_path;
    exit;
}

// Specific routes
switch ($path) {
    case '/':
        require __DIR__ . '/index.php';
        break;
    case '/login':
        require __DIR__ . '/views/login.php';
        break;
    case '/register':
        require __DIR__ . '/views/register.php';
        break;
    case '/forgot-password':
        require __DIR__ . '/views/forgot-password.php';
        break;
    case '/dashboard':
        require __DIR__ . '/views/dashboard.php';
        break;
    case '/admin':
        require __DIR__ . '/admin/index.php';
        break;
    default:
        // Handle API routes
        if (strpos($path, '/api/') === 0) {
            $api_script = __DIR__ . $path;
            if (file_exists($api_script)) {
                require $api_script;
                exit;
            }
        }
        // Handle view routes
        if (strpos($path, '/views/') === 0) {
            $view_script = __DIR__ . $path;
            if (file_exists($view_script)) {
                require $view_script;
                exit;
            }
        }
        // Handle admin routes
        if (strpos($path, '/admin/') === 0) {
            $admin_script = __DIR__ . $path;
            if (file_exists($admin_script)) {
                require $admin_script;
                exit;
            }
        }
        http_response_code(404);
        echo "404 Not Found";
        break;
}
