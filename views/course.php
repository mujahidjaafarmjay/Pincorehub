<?php
require_once __DIR__ . '/../config/database.php';

if (!isset($_GET['id'])) {
    die('Course ID not specified.');
}
$course_id = $_GET['id'];

// Fetch course details
$stmt = $pdo->prepare("SELECT id, title, description FROM courses WHERE id = ?");
$stmt->execute([$course_id]);
$course = $stmt->fetch();

if (!$course) {
    die('Course not found.');
}

// Fetch lessons for the course
$stmt = $pdo->prepare("SELECT id, title FROM lessons WHERE course_id = ? ORDER BY lesson_order ASC");
$stmt->execute([$course_id]);
$lessons = $stmt->fetchAll();

include __DIR__ . '/../includes/header.php';
?>

<h1 class="text-3xl font-bold mb-2"><?php echo htmlspecialchars($course['title']); ?></h1>
<p class="text-gray-700 mb-6"><?php echo htmlspecialchars($course['description']); ?></p>

<h2 class="text-2xl font-bold mb-4">Lessons</h2>
<ul class="list-disc list-inside">
    <?php foreach ($lessons as $lesson): ?>
        <li><a href="/views/lesson.php?id=<?php echo $lesson['id']; ?>" class="text-blue-500"><?php echo htmlspecialchars($lesson['title']); ?></a></li>
    <?php endforeach; ?>

    <?php if (empty($lessons)): ?>
        <p>No lessons available for this course yet.</p>
    <?php endif; ?>
</ul>

<?php include __DIR__ . '/../includes/footer.php'; ?>
