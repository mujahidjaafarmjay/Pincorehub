<?php
$heroTexts = ["Tech Solutions", "Digital Innovation", "Smart Automation", "Future Technology"];
$heroItems = [
    ["icon" => "💻", "label" => "Device Repairs", "color" => "orange"],
    ["icon" => "🌐", "label" => "Web Development", "color" => "gray"],
    ["icon" => "🎓", "label" => "Training", "color" => "orange"],
    ["icon" => "₿", "label" => "Crypto Education", "color" => "gray"],
];
?>
<section class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4 overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-purple-500/10 animate-pulse"></div>
        <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-bounce"></div>
        <div class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30 animate-pulse">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    Your Complete Tech Partner
                </span>

                <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6">
                    Online & Offline
                    <span id="hero-text-animation" class="text-orange-500 block gradient-text transition-all duration-500">
                        <?php echo $heroTexts[0]; ?>
                    </span>
                </h1>

                <p class="text-xl text-gray-300 mb-8 leading-relaxed">
                    From device repairs to AI automation, we help individuals and businesses thrive in the digital age. Visit our shop or get online support - we've got you covered.
                </p>

                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="#" class="inline-flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md hover:shadow-lg transition-colors group">
                        Book a Service
                        <svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                    <a href="#" class="inline-flex items-center justify-center px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black bg-transparent transition-colors group">
                        <svg class="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Watch Demo
                    </a>
                </div>
            </div>

            <div class="relative">
                <div class="glass rounded-2xl shadow-2xl p-8 glow-orange hover:scale-105 transition-transform duration-300">
                    <div class="grid grid-cols-2 gap-4">
                        <?php foreach ($heroItems as $item): ?>
                            <div class="<?php echo $item['color'] === 'orange' ? 'bg-orange-500/10 border-orange-500/20' : 'bg-gray-800/50 border-gray-700'; ?> rounded-lg p-4 text-center border hover:scale-105 transition-all duration-300 cursor-pointer">
                                <div class="text-2xl mb-2"><?php echo $item['icon']; ?></div>
                                <p class="text-sm font-medium text-gray-300"><?php echo $item['label']; ?></p>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
