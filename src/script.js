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
      if (target.classList.contains('discount-btn')){
        document.querySelector('.popup-discount').style.display = 'block';
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
        document.querySelector('.popup-discount').style.display = 'block';
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

// Отправка данных из форм
const sendForm = () => {
  const forms = document.querySelectorAll('form');
  const inpQuestion = document.getElementById('question');
  // let nameInpQuest = inpQuestion.getAttribute('name');
    // valInpQuest = inpQuestion.value;
    // console.log(nameInpQuest);

  // console.log('forms: ', forms);
  const errorMessage = 'Ошибка! Что-то пошло не так..',
    successMessage = 'Спасибо, мы скоро с Вами свяжемся!';
  
  const loadMessage = document.createElement('div');
    let styleLoadMsg;

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `
    font-size: 18px;
    color: #f28c07`;

  const spinner = (elem) => {
    loadMessage.classList.add('sk-flow');
    elem.appendChild(loadMessage);
    loadMessage.innerHTML = `
      <div class="sk-flow-dot"></div>
      <div class="sk-flow-dot"></div>
      <div class="sk-flow-dot"></div>`;

    styleLoadMsg = document.createElement('style');
    styleLoadMsg.textContent = `
        :root {
          --sk-color: #f28c07;
        }

        .sk-flow {
          margin: auto;
          width: 60px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sk-flow-dot {
          width: 13px;
          height: 13px;
          background-color: var(--sk-color);
          border-radius: 50%;
          animation: sk-flow 1.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s infinite
            both;
        }

        .sk-flow-dot:nth-child(1) {
          animation-delay: -0.3s;
        }
        .sk-flow-dot:nth-child(2) {
          animation-delay: -0.15s;
        }

        @keyframes sk-flow {
          0%,
          80%,
          100% {
            transform: scale(0.3);
          }
          40% {
            transform: scale(1);
          }
        }`;
    document.head.appendChild(styleLoadMsg);
  };

  const delSpinner = () => {
    loadMessage.remove();
    styleLoadMsg.remove();
  };

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  };

  forms.forEach((elem) => {
    elem.addEventListener('submit', (event) => {
      event.preventDefault();
      spinner(elem);
      const formData = new FormData(elem);
      // сюда проверку элема, чтобы добавить интупы в формДата
      if (elem.closest('.popup-consultation')) {
        formData.append(inpQuestion.getAttribute('name'), inpQuestion.value);
      }  
      // сюда ещё из калькулятора
      let body = {};
      formData.forEach((value, key) => {
        body[key] = value;
      });

      postData(body)
        .then((respons) => {
          if (respons.status !== 200) {
            throw new Error('Status network not 200');
          }
          delSpinner();
          elem.appendChild(statusMessage);
          statusMessage.textContent = successMessage;
        })
        .catch((error) => {
          delSpinner();
          elem.appendChild(statusMessage);
          statusMessage.textContent = errorMessage;
          // console.log(error);
        });
        
      setTimeout(() => {
        elem.querySelectorAll('input').forEach((item) => {
          item.value = '';
        });
        document.getElementById('question').value= '';
        statusMessage.remove();
      }, 6000);
    });
  });
  
  const validElems = (idElems) => {
    let elems = document.getElementById(idElems);
  //   // console.log(form);
    elems.addEventListener('input', (event) => {
      let target = event.target;
      if (target.classList.contains('phone-user') ||
              target.classList.contains('numders')) {
          target.value = target.value.replace(/[^+\d]/, '');
          // это для телефонов и для поля с метрами
      }
      if (target.classList.contains('name')) {
          target.value = target.value.replace(/[^А-Яа-яЁё\s]/ig, '');
      }
      if (target.classList.contains('text')) {
          target.value = target.value.replace(/[^А-Яа-яЁё\s\.,:;!?+-]/ig, '');
          // это для вопроса из консультаций
      }
    });
  };
  
  validElems('form1');
  validElems('form2');
  validElems('form3');
  validElems('form4');
  validElems('form5');
  validElems('form6');
  validElems('form7');
  validElems('distance');
  
};
sendForm();