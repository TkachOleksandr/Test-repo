import axios from 'axios';

// Обрізання повідомлення...
const input = document.querySelector('.footer-form-input.comment');
if (input) {
  input.addEventListener('blur', event => {
    const maxLength = parseInt(event.target.getAttribute('data-maxlength'), 10);
    if (event.target.value.length > maxLength) {
      event.target.title = event.target.value;
      event.target.value = event.target.value.slice(0, maxLength - 3) + '...';
    } else {
      event.target.title = '';
    }
  });
}
// Запит при submit
const footerFormEl = document.querySelector('.footer-form');
const inputEmailEl = document.querySelector('.footer-form-input.email');
const inputCommentEl = document.querySelector('.footer-form-input.comment');
const backdropEl = document.querySelector('.backdrop');
const modalCloseBtnEl = document.querySelector('.footer-modal-close-btn');
const modalTitleEl = document.querySelector('.footer-modal-title');
const modalTextEl = document.querySelector('.footer-modal-text');

const handleSubmit = async event => {
  event.preventDefault();
  const userEmail = inputEmailEl.value.trim();
  const userComment = inputCommentEl.value.trim();

  try {
    await axios.post('https://portfolio-js.b.goit.study/api/requests', {
      email: `${userEmail}`,
      comment: `${userComment}`,
    });
    inputEmailEl.value = '';
    inputCommentEl.value = '';
    backdropEl.classList.add('is-open');
  } catch (err) {
    modalTitleEl.classList.add('footer-error-title');
    modalTitleEl.textContent = 'Error!';
    modalTextEl.classList.add('footer-error-text');
    modalTextEl.textContent =
      'There was an error submitting your form. Please check the entered data and try again.';

    backdropEl.classList.add('is-open');
  }
};

footerFormEl.addEventListener('submit', handleSubmit);
modalCloseBtnEl.addEventListener('click', () => {
  backdropEl.classList.remove('is-open');
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' || event.code === 'Escape') {
    backdropEl.classList.remove('is-open');
  }
});

backdropEl.addEventListener('click', event => {
  if (event.target === backdropEl) {
    backdropEl.classList.remove('is-open');
  }
});
