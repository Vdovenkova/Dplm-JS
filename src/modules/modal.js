'use strict';

// всплывающие окна
const modal = () => {
  const btnPopup = document.querySelectorAll('.btn-popup'), // это кнопки которые вызывают модалки
        popup = document.querySelectorAll('.popup'), //это мод.окна
        popupDiscount = document.querySelector('.popup-discount');

  // открытие
  btnPopup.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      let target = event.target;
      if (target.matches('a.call-btn')) {
        event.preventDefault();
        document.querySelector('.popup-call').style.display = 'block';
      }
      if (target.classList.contains('discount-btn')){
        popupDiscount.style.display = 'block';
      }
      if (target.classList.contains('gauging-button')){
        document.querySelector('.popup-check').style.display = 'block';
      }
      if (target.classList.contains('consultation-btn') &&
            document.getElementById('question').value !== ''){ 
        event.preventDefault();
        document.querySelector('.popup-consultation').style.display = 'block';
      }
      if (target.matches('button.construct-btn') &&
            document.getElementById('distance').value !== '') {
        // доб.модалке класс, чтобы калькулятор отправлялся только если есть этот класс
        popupDiscount.classList.add('calculator-data');
        popupDiscount.style.display = 'block';
      } else if (document.getElementById('distance').value === '') {
        let mess = document.createElement('div');
        document.querySelector('button.construct-btn').before(mess);
        mess.textContent = 'Заполните это поле!';
        setTimeout(() => mess.remove(), 2000);
        return;
      }
    });
  });

  // очистка инпутов
  const clearInp = (elem) => {
    elem.querySelectorAll('input').forEach((item) => {
      item.value = '';
    });
  };

  // закрытие модалок
  popup.forEach((elem) => {
    elem.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('popup-close')) {
      elem.style.display = 'none';
      clearInp(elem);
    } else {
        target = target.closest('.popup-content');
        if(!target) {
          elem.style.display = 'none';
          clearInp(elem);
        }
      }
    });
  });
};

export default modal;