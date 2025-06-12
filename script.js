// Espera a que el contenido del HTML esté cargado para ejecutar los scripts
document.addEventListener("DOMContentLoaded", () => {
    
    // Función principal que inicializa todas las funcionalidades
    function init() {
        setupTextAnimation();
        setupSlideshow();
        setupParallax();
    }

    // --- MÓDULO DE ANIMACIÓN DE TEXTO ---
    function setupTextAnimation() {
        const titleSpans = document.querySelectorAll(".hero__title span:not(.gradient-text) span");
        titleSpans.forEach((span, index) => {
            span.style.animationDelay = `${0.1 * (index + 1)}s`;
        });

        const gradientSpans = document.querySelectorAll(".hero__title .gradient-text span");
        gradientSpans.forEach((span, index) => {
            span.style.animationDelay = `${1 + (0.1 * index)}s`;
        });
    }

    // --- MÓDULO DE SLIDESHOW ---
    function setupSlideshow() {
        const slideshow = document.querySelector(".slideshow");
        if (!slideshow) return; // Si no hay slideshow, no hace nada

        let slideIndex = 1;
        let slideInterval;
        const slides = slideshow.querySelectorAll(".slideshow__slide");
        const prevButton = slideshow.querySelector(".slideshow__nav--prev");
        const nextButton = slideshow.querySelector(".slideshow__nav--next");

        function showSlides(n) {
            if (n > slides.length) { slideIndex = 1; }
            if (n < 1) { slideIndex = slides.length; }
            
            slides.forEach(slide => slide.classList.remove('active'));
            slides[slideIndex - 1].classList.add('active');
        }

        function plusSlides(n) {
            clearInterval(slideInterval);
            showSlides(slideIndex += n);
            startAutoplay();
        }

        function startAutoplay() {
            slideInterval = setInterval(() => {
                plusSlides(1);
            }, 5000);
        }
        
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => plusSlides(-1));
            nextButton.addEventListener('click', () => plusSlides(1));
        }
        
        showSlides(slideIndex);
        startAutoplay();
    }

    // --- MÓDULO DE EFECTO PARALLAX ---
    function setupParallax() {
        const parallaxImages = document.querySelectorAll('.parallax__image');
        if (parallaxImages.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            parallaxImages.forEach(img => {
                const rect = img.parentElement.getBoundingClientRect();
                const speed = 0.2;
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
                    img.style.transform = `translateY(${offset}px)`;
                }
            });
        });
    }

    // Llama a la función principal para iniciar todo
    init();
});
