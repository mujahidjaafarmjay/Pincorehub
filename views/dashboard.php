<?php
require_once __DIR__ . '/../includes/auth.php';
require_login();
include __DIR__ . '/../includes/header.php';
?>

<h2 class="text-2xl font-bold mb-4">Dashboard</h2>
<p>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>!</p>
<p>This is your dashboard.</p>
<a href="/api/logout.php" class="text-blue-500">Logout</a>

<?php
include __DIR__ . '/../includes/footer.php';
?>
