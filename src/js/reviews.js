// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';
// import styles bundle
import 'swiper/css/bundle';

// чекаємо завантаження сторінки, щоб уникнути помилок
document.addEventListener('DOMContentLoaded', function () {
    const reviewsList = document.getElementById('reviews-list');
    
    // Функція для додавання відгуків як HTML елементів - приймає масив
    function renderReviews(reviews) {
        // чистимо відгуки
        reviewsList.innerHTML = '';

        // тут погнала ітерація по відгукам
        reviews.forEach(review => {
            // створюємо новий елемент списку
            const reviewItem = document.createElement('li');
            reviewItem.classList.add('swiper-slide', 'reviews-list-item');
            // заповнення ревью - фотка, ім'я, текст ревью
            reviewItem.innerHTML = `
                <img class="review-image" src="${review.avatar_url}" alt="${review.author}" width="48" height="48">
                <h3 class="reviews-names">${review.author}</h3>
                <p class="reviews-text">${review.review}</p>
            `;
            // створений об'єкт з ревью додаємо у ДОМ
            reviewsList.appendChild(reviewItem);
        });

        // вирівнюємо висоту доданих елементів
        requestAnimationFrame(equalizeReviewHeights); // Викликаємо на наступному кадрі для коректного вимірювання
    }

    // щоб всі відгуки були однакової висоти 
    // знаходиться максимальна висота відгука і всі інші будуть такої ж висоти
    function equalizeReviewHeights() {
        const reviewItems = document.querySelectorAll('.reviews-list-item');
        let maxHeight = 0;

        // визначаємо максимальну висоту серед усіх елементів
        reviewItems.forEach(item => {
            item.style.height = 'auto'; // скидаємо висоту, щоб правильно виміряти
            maxHeight = Math.max(maxHeight, item.offsetHeight); // тут знаходимо максимальну висоту
        });

        // тут робимо максимальну висоту до всіх елементів, ту що виміряли
        reviewItems.forEach(item => {
            item.style.height = `${maxHeight}px`;
        });
    }

    // функція для отримання відгуків з серверу
    async function fetchReviews() {
        try {
            // Запит для отримання даних
            const response = await fetch('https://portfolio-js.b.goit.study/api/reviews');
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            if (data && Array.isArray(data) && data.length > 0) {
                renderReviews(data); // Рендеримо відгуки
            } else {
                reviewsList.innerHTML = '<li style="color: red;">Not found</li>';
            }
        } catch (error) {
            reviewsList.innerHTML = '<li style="color: red;">Not found</li>';
            // це вспливаючий алерт
            alert('reviews not found');
            console.error('Reviews error:', error);
        }
    }

    // Ініціалізація Swiper після рендерингу відгуків + брейкпоінти
    function initSwiperReviews() {
        const swiperReviews = new Swiper('.swiper-reviews', {
            speed: 400,
            spaceBetween: 16,
            slidesPerView: 1,
            navigation: {
                nextEl: '.swiper-button-next-reviews',
                prevEl: '.swiper-button-prev-reviews',
                disabledClass: 'swiper-button-disabled-reviews'
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    speed: 400,
                    spaceBetween: 16,
                },
                1440: {
                    slidesPerView: 4,
                    speed: 400,
                    spaceBetween: 16,
                },
            },
        });

        // обробка дизейблингу кнопок
        swiperReviews.on('slideChange', function () {
            const prevButtonReviews = swiperReviews.navigation.prevEl;
            const nextButtonReviews = swiperReviews.navigation.nextEl;

            // саме тут дізейблимо кнопки
            prevButtonReviews.disabled = swiperReviews.isBeginning;
            nextButtonReviews.disabled = swiperReviews.isEnd;
        });
    }

    // ну і завантажуємо отримані відгуки
    fetchReviews().then(() => {
        initSwiperReviews();
    });
});
