// onze-main.js - VERSÃO FINAL

document.addEventListener('DOMContentLoaded', () => {
    // ---- SELETORES GLOBAIS ----
    const preloader = document.getElementById('preloader');
    const themeToggle = document.getElementById('theme-toggle');
    
    // ---- PRELOADER ----
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
        document.body.classList.add('loaded');
        initHeroAnimations(); // Inicia as animações do Hero após o load
    });

    // ---- DARK MODE ----
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>`;
    
    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
            if (themeToggle) themeToggle.innerHTML = moonIcon;
        } else {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            if (themeToggle) themeToggle.innerHTML = sunIcon;
        }
    };

    let currentTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // ---- SMOOTH SCROLL ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- ANIMATIONS ON SCROLL (FADE IN UP) ----
    const animatedElements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));

    // ---- HERO ANIMATIONS ----
    function initHeroAnimations() {
        const playerLeft = document.getElementById('hero-player-left');
        const playerRight = document.getElementById('hero-player-right');
        const heroLogo = document.getElementById('hero-logo');

        if(playerLeft) {
            playerLeft.style.transition = 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s';
            playerLeft.style.opacity = '1';
            playerLeft.style.transform = 'translateX(0)';
        }
        if(playerRight) {
            playerRight.style.transition = 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s';
            playerRight.style.opacity = '1';
            playerRight.style.transform = 'translateX(0) scaleX(-1)';
        }
        if(heroLogo){
            heroLogo.style.transition = 'opacity 0.8s ease-out 0.2s';
            heroLogo.style.opacity = '1';
        }
    }
    // Pre-set initial positions for animation
    const playerLeft = document.getElementById('hero-player-left');
    const playerRight = document.getElementById('hero-player-right');
    if(playerLeft) { playerLeft.style.transform = 'translateX(-100px)'; }
    if(playerRight) { playerRight.style.transform = 'translateX(100px) scaleX(-1)'; }

    // ---- COPY PIX ----
    const copyButton = document.getElementById('copy-pix-button');
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            const pixKey = document.getElementById('pix-key').textContent;
            const copyFeedback = document.getElementById('copy-feedback');
            navigator.clipboard.writeText(pixKey).then(() => {
                copyFeedback.textContent = 'Chave copiada com sucesso!';
                copyButton.textContent = 'Copiado!';
                copyButton.classList.add('bg-green-500');
                copyButton.classList.remove('bg-yellow-500');
                setTimeout(() => {
                    copyFeedback.textContent = '';
                    copyButton.textContent = 'Copiar';
                    copyButton.classList.remove('bg-green-500');
                    copyButton.classList.add('bg-yellow-500');
                }, 2500);
            }).catch(err => {
                copyFeedback.textContent = 'Erro ao copiar.';
            });
        });
    }
    
    // ---- FOOTER YEAR ----
    const currentYearEl = document.getElementById('current-year');
    if(currentYearEl) currentYearEl.textContent = new Date().getFullYear();
});