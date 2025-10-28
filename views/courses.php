<?php
require_once __DIR__ . '/../config/database.php';

// Fetch all courses
$stmt = $pdo->query("SELECT id, title, description FROM courses ORDER BY created_at DESC");
$courses = $stmt->fetchAll();

include __DIR__ . '/../includes/header.php';
?>

<h1 class="text-3xl font-bold mb-6">Our Courses</h1>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <?php foreach ($courses as $course): ?>
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-bold mb-2"><?php echo htmlspecialchars($course['title']); ?></h2>
            <p class="text-gray-700"><?php echo htmlspecialchars($course['description']); ?></p>
            <a href="/views/course.php?id=<?php echo $course['id']; ?>" class="text-blue-500 mt-4 inline-block">Learn More</a>
        </div>
    <?php endforeach; ?>

    <?php if (empty($courses)): ?>
        <p>No courses available at the moment. Please check back later.</p>
    <?php endif; ?>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
