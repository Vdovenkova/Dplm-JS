'use strict';

import animPopup from './animPopup';

// всплывающие окна
const modal = () => {
  // открываем окна с анимацией
  document.querySelectorAll('.btn-popup').forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      let idPopup = target.dataset.popup.substr(1);
      let popUp = document.getElementById(idPopup);
      animPopup(popUp);
      if (target.closest('.fixed-gift')) {
        target.style.display = 'none';
      }
    });
  });

  // очистка инпутов
  const clearInp = (elem) => {
    elem.querySelectorAll('input').forEach((item) => {
      item.value = '';
    });
  };

  // закрываем окна
  document.querySelectorAll('.popup').forEach((elem) => {
    elem.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('close_icon') ||
      target.classList.contains('close-btn')) {
      elem.style.display = 'none';
      clearInp(elem);
    } else {
        target = target.closest('.form-content');
        if(!target) {
          elem.style.display = 'none';
          clearInp(elem);
        }
      }
    });
  });
};

export default modal;