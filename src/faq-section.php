<?php
include 'database.php';

$faq_result = $conn->query("SELECT * FROM faq");
?>
<section class="py-20 bg-gray-900/50">
    <div class="max-w-4xl mx-auto px-4">
        <div class="text-center mb-16">
            <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p class="text-xl text-gray-600">Find answers to common questions about our services</p>
        </div>

        <div class="space-y-4" id="faq-accordion">
            <?php while($row = $faq_result->fetch_assoc()): ?>
                <div class="bg-gray-800/50 border-gray-700 rounded-lg">
                    <button class="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/70 transition-colors">
                        <div class="flex-1">
                            <div class="flex items-center gap-3 mb-1">
                                <span class="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                                    <?php echo htmlspecialchars($row['category']); ?>
                                </span>
                            </div>
                            <h3 class="text-lg font-semibold text-white"><?php echo htmlspecialchars($row['question']); ?></h3>
                        </div>
                        <svg class="h-5 w-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="px-6 pb-6 hidden">
                        <p class="text-gray-600 leading-relaxed"><?php echo htmlspecialchars($row['answer']); ?></p>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>

        <div class="text-center mt-12">
            <p class="text-gray-600 mb-4">Still have questions?</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+2349034376039" class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md hover:shadow-lg transition-colors">
                    Call Us: +234 903 437 6039
                </a>
                <a href="mailto:info@pincorehub.com.ng" class="inline-flex items-center justify-center px-6 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500/10 transition-colors">
                    Email: info@pincorehub.com.ng
                </a>
            </div>
        </div>
    </div>
</section>
