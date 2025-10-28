<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../config/database.php';
require_login();

if (!isset($_GET['id'])) {
    die('Lesson ID not specified.');
}
$lesson_id = $_GET['id'];

// Fetch lesson details
$stmt = $pdo->prepare("SELECT id, title, content, video_url, course_id FROM lessons WHERE id = ?");
$stmt->execute([$lesson_id]);
$lesson = $stmt->fetch();

if (!$lesson) {
    die('Lesson not found.');
}

// Check if user is enrolled in the course
$stmt = $pdo->prepare("SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?");
$stmt->execute([$_SESSION['user_id'], $lesson['course_id']]);
$enrollment = $stmt->fetch();

if (!$enrollment && !is_admin()) {
    die('You are not enrolled in this course.');
}


include __DIR__ . '/../includes/header.php';
?>

<h1 class="text-3xl font-bold mb-2"><?php echo htmlspecialchars($lesson['title']); ?></h1>

<div class="mt-4">
    <?php if ($lesson['video_url']): ?>
        <div class="aspect-w-16 aspect-h-9">
            <iframe src="<?php echo htmlspecialchars($lesson['video_url']); ?>" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    <?php endif; ?>

    <div class="prose mt-4">
        <?php echo $lesson['content']; // Assuming content is safe HTML ?>
    </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
