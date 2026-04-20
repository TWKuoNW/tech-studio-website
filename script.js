document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Toggle for Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }));
    }

    // 2. Scroll Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 3. Form Handling Preview (Since no backend is attached immediately)
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if(form) {
        form.addEventListener('submit', function(e) {
            // Prevent actual submission for demo/防呆 if required.
            // If using Formspree, you might want to let it submit, 
            // but we use AJAX here for a better UX.
            e.preventDefault();
            
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '傳送中...';
            btn.disabled = true;

            // Simulate AJAX request
            setTimeout(() => {
                // Here is where you'd normally fetch(form.action, {...})
                formStatus.className = 'form-status success';
                formStatus.innerHTML = `✅ 已成功送出！您的需求已記錄，我們預計在 1-2 個工作天內由專案負責人與您聯繫。`;
                form.reset();
                
                btn.textContent = originalText;
                btn.disabled = false;
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
});
