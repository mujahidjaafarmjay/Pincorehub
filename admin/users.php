<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../config/database.php';
require_admin();

// Fetch all users
$stmt = $pdo->query("SELECT id, username, email, is_verified, is_admin, created_at FROM users ORDER BY created_at DESC");
$users = $stmt->fetchAll();

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
        <h1 class="text-3xl font-bold mb-6">Manage Users</h1>

        <div class="bg-white shadow-md rounded my-6">
            <table class="min-w-full table-auto">
                <thead>
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 text-left">ID</th>
                        <th class="py-3 px-6 text-left">Username</th>
                        <th class="py-3 px-6 text-center">Email</th>
                        <th class="py-3 px-6 text-center">Verified</th>
                        <th class="py-3 px-6 text-center">Role</th>
                        <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    <?php foreach ($users as $user): ?>
                        <tr class="border-b border-gray-200 hover:bg-gray-100">
                            <td class="py-3 px-6 text-left whitespace-nowrap"><?php echo htmlspecialchars($user['id']); ?></td>
                            <td class="py-3 px-6 text-left"><?php echo htmlspecialchars($user['username']); ?></td>
                            <td class="py-3 px-6 text-center"><?php echo htmlspecialchars($user['email']); ?></td>
                            <td class="py-3 px-6 text-center">
                                <span class="bg-<?php echo $user['is_verified'] ? 'green' : 'red'; ?>-200 text-<?php echo $user['is_verified'] ? 'green' : 'red'; ?>-600 py-1 px-3 rounded-full text-xs">
                                    <?php echo $user['is_verified'] ? 'Yes' : 'No'; ?>
                                </span>
                            </td>
                            <td class="py-3 px-6 text-center"><?php echo $user['is_admin'] ? 'Admin' : 'User'; ?></td>
                            <td class="py-3 px-6 text-center">
                                <div class="flex item-center justify-center">
                                    <a href="/admin/edit-user.php?id=<?php echo $user['id']; ?>" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                        <!-- Edit Icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                    </a>
                                    <a href="/api/delete-user.php?id=<?php echo $user['id']; ?>" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" onclick="return confirm('Are you sure you want to delete this user?');">
                                        <!-- Delete Icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </main>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
