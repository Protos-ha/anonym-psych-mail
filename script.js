// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Модальное окно ---
    const modalOverlay = document.getElementById('modalOverlay');
    const messageModal = document.getElementById('messageModal');
    const openFormModalBtn = document.getElementById('openFormModalBtn'); // ID кнопки из index.html
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Функция открытия модального окна
    function openModal() {
        if (messageModal && modalOverlay) {
            messageModal.style.display = 'block';
            modalOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Запретить прокрутку страницы

            // Добавляем класс 'visible' для анимации появления
            requestAnimationFrame(() => {
                messageModal.classList.add('visible');
            });
        }
    }

    // Функция закрытия модального окна
    function closeModal() {
        if (messageModal && modalOverlay) {
            messageModal.classList.remove('visible'); // Убираем класс для анимации
            // Используем setTimeout, чтобы анимация успела отработать перед полным скрытием
            setTimeout(() => {
                messageModal.style.display = 'none';
                modalOverlay.style.display = 'none';
                document.body.style.overflow = ''; // Разрешить прокрутку
            }, 400); // Длительность анимации (совпадает с transition в CSS)
        }
    }

    // Обработчик для кнопки открытия модального окна
    if (openFormModalBtn) {
        openFormModalBtn.addEventListener('click', openModal);
    }

    // Обработчик для кнопки закрытия
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Закрытие по клику на подложку
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Закрытие по нажатию Escape
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
