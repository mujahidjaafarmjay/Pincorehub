<?php
require_once __DIR__ . '/../includes/auth.php';
require_admin(); // Protect the page, only admins can access

include __DIR__ . '/../includes/header.php';
?>

<div class="flex">
    <!-- Admin Sidebar -->
    <aside class="w-64 bg-gray-800 text-white min-h-screen p-4">
        <nav>
            <h3 class="font-bold text-lg mb-4">Admin Menu</h3>
            <ul>
                <li><a href="/admin/" class="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</a></li>
                <li><a href="/admin/users.php" class="block py-2 px-4 rounded hover:bg-gray-700">Manage Users</a></li>
                <li><a href="/admin/courses.php" class="block py-2 px-4 rounded hover:bg-gray-700">Manage Courses</a></li>
                <li><a href="/admin/blog.php" class="block py-2 px-4 rounded hover:bg-gray-700">Manage Blog</a></li>
            </ul>
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8">
        <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p class="text-gray-700">Welcome to the admin panel. From here you can manage users, courses, and more.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-xl font-bold mb-2">Total Users</h2>
                <p class="text-3xl font-bold text-gray-800">0</p> <!-- Placeholder -->
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-xl font-bold mb-2">Total Courses</h2>
                <p class="text-3xl font-bold text-gray-800">0</p> <!-- Placeholder -->
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-xl font-bold mb-2">Total Revenue</h2>
                <p class="text-3xl font-bold text-gray-800">$0.00</p> <!-- Placeholder -->
            </div>
        </div>
    </main>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
