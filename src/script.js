'use strict';

// всплывающие окна
const modal = () => {
  const btnPopup = document.querySelectorAll('.btn-popup'), // это кнопки которые вызывают модалки
        popup = document.querySelectorAll('.popup'); //это мод.окна

  // открытие
  btnPopup.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      let target = event.target;
      if (target.matches('a.call-btn')) {
        event.preventDefault();
        document.querySelector('.popup-call').style.display = 'block';
      }
      if (target.classList.contains('discount-btn') || target.classList.contains('construct-btn')){
        document.querySelector('.popup-discount').style.display = 'block';
      }
      if (target.classList.contains('gauging-button')){
        document.querySelector('.popup-check').style.display = 'block';
      }
      if (target.classList.contains('consultation-btn')){
        event.preventDefault();
        document.querySelector('.popup-consultation').style.display = 'block';
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
modal();

// аккордеоны
const accordions = () => {
  const panelHeading = document.querySelectorAll('.panel-heading'), // заголовки аккордеона
        panelCollapse = document.querySelectorAll('.panel-collapse'); // контент в аккордеоне
  panelHeading.forEach((itemHeading) => {
    itemHeading.addEventListener('click', (event) => {
      event.preventDefault();
      let contentAcc = itemHeading.nextElementSibling;

      if (contentAcc.classList.contains('in')){
        contentAcc.classList.remove('in');
      } else {
        contentAcc.classList.add('in');
      }

      panelCollapse.forEach((itemContent) => {
        if (itemContent !== contentAcc) {
          itemContent.classList.remove('in');
        }
      });
    });
  });
};
accordions();

// кнопка Больше
const showHiddenBlocks = () => {
// visible-sm-block - этот класс виден на ширине экрана от 992 до 768, на остальных не виден
// hidden - этот класс скрыт всегда
// добавила трём скрытым элементам класс hidden-block
  const hiddenBlock = document.querySelectorAll('.hidden-block'),
    btnMore = document.querySelector('.add-sentence-btn');

  btnMore.addEventListener('click', () => {
    hiddenBlock.forEach((elem) => {
      if (elem.classList.contains('visible-sm-block') || elem.classList.contains('hidden')) {
        elem.classList.remove('visible-sm-block');
        elem.classList.remove('hidden');
      }
    });
    btnMore.style.display = 'none';
  });
};
showHiddenBlocks();

// калькулятор
const calculator = () => {
  const switchOne = document.getElementById('switch-one');
  
  switchOne.addEventListener('click', (event) => {
    let target = event.target;
    // let valueTarget = target.value;
    console.log('target: ', target);

  });
};
calculator();