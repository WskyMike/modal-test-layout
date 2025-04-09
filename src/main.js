const modal = document.getElementById('modal');
const openBtn = document.querySelector('.button--primary');
const closeBtn = document.querySelector('.modal__close');
const overlay = document.querySelector('.modal__overlay');
const form = document.getElementById('feedbackForm');
const resultDiv = document.getElementById('result');
const submitBtn = form.querySelector('.modal__submit');

function openModal() {
  modal.classList.add('modal--active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('modal--active');
  document.body.style.overflow = '';
  form.reset();
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
    closeModal();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fileInput = form.querySelector('#file');
  const file = fileInput.files[0];

  if (file && file.size > 2 * 1024 * 1024) {
    alert('Файл должен быть меньше 2 МБ');
    return;
  }

  // Очищаем телефон от всех символов, кроме цифр и плюса
  const rawPhone = form.phone.value;
  const cleanPhone = rawPhone.replace(/[^\d+]/g, '');

  const formData = {
    name: form.name.value,
    phone: cleanPhone,
    email: form.email.value,
    file: file ? {
      name: file.name,
      size: file.size,
      type: file.type
    } : null,
    agreement: form.agreement.checked
  };

  console.log('Form Data:', formData);

  resultDiv.innerHTML = `
  <h3>Отправленные данные:</h3>
  <p><strong>Имя:</strong> ${formData.name}</p>
  <p><strong>Телефон:</strong> ${formData.phone}</p>
  <p><strong>Email:</strong> ${formData.email}</p>
  ${formData.file ? `<p><strong>Файл:</strong> ${formData.file.name} (${formData.file.size} байт)</p>` : ''}
  <p><strong>Согласие:</strong> ${formData.agreement ? 'Да' : 'Нет'}</p>
  `;

  resultDiv.style.display = 'block';

  // Эффект отправки
  submitBtn.textContent = 'Форма отправлена';
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.textContent = 'Отправить';
    submitBtn.disabled = false;
    closeModal();
  }, 2000);
});