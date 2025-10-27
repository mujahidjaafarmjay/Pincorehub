document.addEventListener('DOMContentLoaded', () => {
    // Hero text animation
    const heroTextElement = document.getElementById('hero-text-animation');
    if (heroTextElement) {
        const heroTexts = ["Tech Solutions", "Digital Innovation", "Smart Automation", "Future Technology"];
        let currentTextIndex = 0;
        setInterval(() => {
            currentTextIndex = (currentTextIndex + 1) % heroTexts.length;
            heroTextElement.style.opacity = 0;
            setTimeout(() => {
                heroTextElement.textContent = heroTexts[currentTextIndex];
                heroTextElement.style.opacity = 1;
            }, 500);
        }, 3000);
    }

    // FAQ Accordion
    const faqAccordion = document.getElementById('faq-accordion');
    if (faqAccordion) {
        const faqItems = faqAccordion.querySelectorAll('button');
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                const content = item.nextElementSibling;
                const icon = item.querySelector('svg');
                if (content.classList.contains('hidden')) {
                    content.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    content.classList.add('hidden');
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }
});
