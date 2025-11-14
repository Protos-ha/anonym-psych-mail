// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Модальное окно ---
    const modalOverlay = document.getElementById('modalOverlay');
    const messageModal = document.getElementById('messageModal');
    const openFormBtn = document.getElementById('openFormBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function openModal() {
        if (messageModal && modalOverlay) {
            messageModal.style.display = 'block';
            modalOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Запретить прокрутку страницы
        }
    }

    function closeModal() {
        if (messageModal && modalOverlay) {
            messageModal.style.display = 'none';
            modalOverlay.style.display = 'none';
            document.body.style.overflow = ''; // Разрешить прокрутку
        }
    }

    if (openFormBtn) {
        openFormBtn.addEventListener('click', openModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && messageModal && messageModal.style.display === 'block') {
            closeModal();
        }
    });

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

    // --- Добавляем плавность появления блоков при скролле (опционально) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Можно добавить класс для скрытия при выходе из видимой области, если нужно
                // entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 }); // Начинаем анимацию, когда элемент виден на 10%

    // Применяем observer к секциям и блокам
    document.querySelectorAll('.about-section, .message-section, .contact-section, .info-block').forEach(section => {
        observer.observe(section);
    });

    // Добавляем класс для анимации в CSS, например:
    /*
    .about-section, .message-section, .contact-section, .info-block {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .about-section.visible, .message-section.visible, .contact-section.visible, .info-block.visible {
        opacity: 1;
        transform: translateY(0);
    }
    */
});
