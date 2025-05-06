// JavaScript код слайдера
document.addEventListener('DOMContentLoaded', () => {
    // Объявление основных элементов
    const slider = document.querySelector('.slider'); // Основной контейнер слайдера
    const slides = document.querySelector('.slides'); // Контейнер слайдов
    const slideElements = document.querySelectorAll('.slide'); // Все слайды
    const prevBtn = document.querySelector('.prev'); // Кнопка "назад"
    const nextBtn = document.querySelector('.next'); // Кнопка "вперед"
    const dotsContainer = document.querySelector('.dots'); // Контейнер точек
    let currentIndex = 0; // Текущий индекс слайда
    let autoSlide; // Переменная для автопрокрутки

    // Устанавливаем первый слайд активным при загрузке
    slideElements[currentIndex].classList.add('active');
    updateSliderHeight(); // Устанавливаем начальную высоту

    // Динамическое создание точек навигации
    slideElements.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Функция для обновления высоты слайдера
    function updateSliderHeight() {
        const activeSlide = slideElements[currentIndex];
        const img = activeSlide.querySelector('img');
        slider.style.height = `${img.offsetHeight}px`; // Устанавливаем высоту слайдера равной высоте активного изображения
    }

    // Функция обновления слайдера
    function updateSlider() {
        // Убираем класс active со всех слайдов
        slideElements.forEach(slide => slide.classList.remove('active'));
        // Добавляем класс active текущему слайду
        slideElements[currentIndex].classList.add('active');
        // Обновляем точки
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        updateSliderHeight(); // Обновляем высоту после смены слайда
    }

    // Переход к конкретному слайду
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    }

    // Переключение на следующий слайд
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideElements.length;
        updateSlider();
    }

    // Переключение на предыдущий слайд
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideElements.length) % slideElements.length;
        updateSlider();
    }

    // Запуск автоматической прокрутки
    function startAutoSlide() {
        autoSlide = setInterval(nextSlide, 5000);
    }

    // Перезапуск автопрокрутки
    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    // Обработчики событий для кнопок
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Обновление высоты при загрузке изображений
    slideElements.forEach(slide => {
        const img = slide.querySelector('img');
        img.addEventListener('load', updateSliderHeight);
    });

    // Запуск автопрокрутки при загрузке
    startAutoSlide();

    // Пауза при наведении мыши
    slides.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slides.addEventListener('mouseleave', startAutoSlide);

    // Обновление высоты при изменении размера окна
    window.addEventListener('resize', updateSliderHeight);
});