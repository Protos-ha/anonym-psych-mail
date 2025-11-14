// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Кнопка, открывающая Яндекс Форму в новой вкладке ---
    const openYandexFormBtn = document.getElementById('openYandexFormBtn');
    if (openYandexFormBtn) {
        openYandexFormBtn.addEventListener('click', function() {
            // !!! ВАЖНО: Замените 'URL_ЯНДЕКС_ФОРМЫ_ДЛЯ_ССЫЛКИ' на вашу реальную ссылку на Яндекс Форму !!!
            const YANDEX_FORM_URL = 'URL_ЯНДЕКС_ФОРМЫ_ДЛЯ_ССЫЛКИ'; // <<<--- ЗАМЕНИТЕ ЭТО!
            window.open(YANDEX_FORM_URL, '_blank');
        });
    }

    // --- Плавная прокрутка для навигации ---
    const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Закрываем мобильное меню после клика
                const mobileNav = document.querySelector('.site-nav');
                const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
                if (mobileNav && mobileNavToggle) {
                    mobileNav.classList.remove('active');
                    mobileNavToggle.querySelector('i').classList.remove('fa-times');
                    mobileNavToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });

    // --- Мобильное меню ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.site-nav');

    if (mobileNavToggle && mobileNav) {
        mobileNavToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- Анимация появления блоков при скролле ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 }); // Анимация начинается, когда элемент виден на 10%

    // Находим все секции и блоки, к которым хотим применить анимацию
    document.querySelectorAll('.about-section, .message-section, .contact-section, .info-block').forEach(section => {
        observer.observe(section);
    });
});
