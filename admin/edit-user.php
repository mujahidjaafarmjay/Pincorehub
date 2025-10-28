<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../config/database.php';
require_admin();

if (!isset($_GET['id'])) {
    die('User ID not specified.');
}
$user_id = $_GET['id'];

// Fetch user data
$stmt = $pdo->prepare("SELECT id, username, email, is_verified, is_admin FROM users WHERE id = ?");
$stmt->execute([$user_id]);
$user = $stmt->fetch();

if (!$user) {
    die('User not found.');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $is_verified = isset($_POST['is_verified']) ? 1 : 0;
    $is_admin = isset($_POST['is_admin']) ? 1 : 0;

    // Update user data
    $stmt = $pdo->prepare("UPDATE users SET username = ?, email = ?, is_verified = ?, is_admin = ? WHERE id = ?");
    if ($stmt->execute([$username, $email, $is_verified, $is_admin, $user_id])) {
        header("Location: /admin/users.php");
        exit();
    } else {
        die('Failed to update user.');
    }
}

include __DIR__ . '/../includes/header.php';
?>

<div class="flex">
    <!-- Admin Sidebar -->
    <aside class="w-64 bg-gray-800 text-white min-h-screen p-4">
        <nav>
            <h3 class="font-bold text-lg mb-4">Admin Menu</h3>
            <ul>
                <li><a href="/admin/" class="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</a></li>
                <li><a href="/admin/users.php" class="block py-2 px-4 rounded hover:bg-gray-700 bg-gray-700">Manage Users</a></li>
                <li><a href="/admin/courses.php" class="block py-2 px-4 rounded hover:bg-gray-700">Manage Courses</a></li>
                <li><a href="/admin/blog.php" class="block py-2 px-4 rounded hover:bg-gray-700">Manage Blog</a></li>
            </ul>
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8">
        <h1 class="text-3xl font-bold mb-6">Edit User</h1>

        <div class="bg-white p-6 rounded-lg shadow-md">
            <form method="POST">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
                    <input type="text" id="username" name="username" value="<?php echo htmlspecialchars($user['username']); ?>" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                    <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($user['email']); ?>" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        <input type="checkbox" name="is_verified" <?php echo $user['is_verified'] ? 'checked' : ''; ?>>
                        Verified
                    </label>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        <input type="checkbox" name="is_admin" <?php echo $user['is_admin'] ? 'checked' : ''; ?>>
                        Admin
                    </label>
                </div>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update User</button>
            </form>
        </div>
    </main>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
