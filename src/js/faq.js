import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";

document.addEventListener('DOMContentLoaded', () => {
    const accordion = new Accordion('.ul-faq', {
        duration: 300, // Швидкість анімації
        showMultiple: false, // Відкривається лише один елемент одночасно
    });

    document.querySelectorAll('.btn-faq').forEach(button => {
        button.addEventListener('click', function () {
            const icon = this.querySelector('.faq-icon');
            if (this.classList.contains('active')) {
                icon.style.transform = 'rotate(0deg)';
            } else {
                icon.style.transform = 'rotate(180deg)';
            }
            this.classList.toggle('active');
        });
    });
});

document.querySelectorAll('.btn-faq').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('li.item-faq'); // Знаходимо li, який містить кнопку
        item.classList.toggle('active');
    });
});