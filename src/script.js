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
  const panelHeading = document.querySelectorAll('.panel-heading'), // заголовки аккордеонов
        panelCollapse = document.querySelectorAll('.panel-collapse'), // контент в аккордеонах
        nextStep = document.querySelectorAll('a[class*="button"]'); // кнопки След.шаг
  
  const accord = (contentAcc) => {
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
  };

  nextStep.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      target = target.closest('a[class*="button"]');
      let blockID = target.getAttribute('href').substr(1),
          contentAcc = document.getElementById(blockID);
      accord(contentAcc);
    });
  });

  panelHeading.forEach((itemHeading) => {
    itemHeading.addEventListener('click', (event) => {
      event.preventDefault();
      let contentAcc = itemHeading.nextElementSibling;
      accord(contentAcc);
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
  const calculatorBlock = document.querySelector('.calculator-block'),
      switchOne = document.getElementById('myonoffswitch'),
      switchTwo = document.getElementById('myonoffswitch-two'),
      secondWell = document.getElementById('second-well'),
      calcResult = document.getElementById('calc-result'),
      diameterOne = document.querySelector('.diameter-one'),
      ringsOne = document.querySelector('.rings-one'),
      diameterTwo = document.querySelector('.diameter-two'),
      ringsTwo = document.querySelector('.rings-two');

  if (switchOne.checked) {
    secondWell.style.display = 'none';
    calcResult.value = 10000;
  }
  switchTwo.checked = false;

  const countSumm = () => {
    let result = 0; // итоговая сумма

    let diameterOneInd = diameterOne.options.selectedIndex, //выбранный диаметр первой камеры
          ringsOneInd = ringsOne.options.selectedIndex, //кол-во колец первой камеры
          diameterTwoInd = diameterTwo.options.selectedIndex, //выбранный диаметр второй камеры
          ringsTwoInd = ringsTwo.options.selectedIndex; //кол-во колец первой камеры
          //  console.log('diameterTwoInd: ', diameterTwoInd);

    if (switchOne && !switchOne.checked) {
      secondWell.style.display = 'block';
      result = 15000; // выбрано две камеры
    } else if (switchOne && switchOne.checked) {
      secondWell.style.display = 'none';
      // diameterTwoInd = 0;
      // ringsTwoInd = 0;
      result = 10000; // выбрана одна камера
    }

    if (diameterOne && diameterOneInd === 0) {
      result = result * 1; // диаметр 1й камеры 1,4 метра - цена не меняется
    } else if (diameterOne && diameterOneInd === 1) {
      result = result + (result * 0.2); // диаметр 1й камеры 2 метра - к цене прибавляется 20%
    }

    if (diameterTwo && diameterTwoInd === 0) {
      result = result * 1; // диаметр 2й камеры 1,4 метра - цена не меняется
    } else if (diameterTwo && diameterTwoInd === 1) {
      result = result + (result * 0.2); // диаметр 2й камеры 2 метра - к цене прибавляется 20%
    }

    if (ringsOne && ringsOneInd === 0) {
      result = result * 1; // одно кольцо у первой камеры - цена не меняется
    } else if (ringsOne && ringsOneInd === 1) {
      result = result + (10000 * 0.3); // 2 кольца у первой камеры - добавляется 30% от 10000
    } else if (ringsOne && ringsOneInd === 2) {
      result = result + (10000 * 0.5); // 3 кольца у первой камеры - добавляется 50% от 10000
    }

    if (ringsTwo && ringsTwoInd === 0) {
      result = result * 1; // одно кольцо у 2й камеры - цена не меняется
    } else if (ringsTwo && ringsTwoInd === 1) {
      result = result + (5000 * 0.2); // 2 кольца у 2й камеры - добавляется 20% от 5000
    } else if (ringsTwo && ringsTwoInd === 2) {
      result = result + (5000 * 0.4); // 3 кольца у 2й камеры - добавляется 40% от 5000
    }

    if (switchTwo.checked && switchOne.checked) {
      result = result + (result * 0.1); // выбрано днище - одна камера
    } else if (switchTwo.checked && !switchOne.checked) {
      result = result + (result * 0.2); // выбрано днище - две камеры
    } else if (switchTwo && !switchTwo.checked) {
      result = result ; // днище не выбрано
    }

    calcResult.value = result;
    // console.log('calcResult.value ', calcResult.value);
  };
  
  calculatorBlock.addEventListener('change', (event) => {
    let target = event.target;

    if(target.matches('select') || target.matches('input')){
      countSumm();
    }
    // console.dir(switchTwo);
  });
};
calculator();