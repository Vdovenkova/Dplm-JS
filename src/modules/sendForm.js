'use strict';
// Отправка данных из форм
const sendForm = () => {
  const forms = document.querySelectorAll('form'),
        inpQuestion = document.getElementById('question'),
        popupDiscnt = document.querySelector('.popup-discount');

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
      if (elem.closest('.calculator-data')) {
        // construct-все поля из калькулятора, item-каждое поле
        const construct = document.querySelectorAll('.calculator');
        construct.forEach((item) => {
          formData.append(item.getAttribute('name'), item.value);
        });
      }
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
        if (popupDiscnt.classList.contains('calculator-data')) {
          popupDiscnt.classList.remove('calculator-data');
        }
      }, 6000);
    });
  });
  
  const validElems = (idElems) => {
    let elems = document.getElementById(idElems);

    elems.addEventListener('input', (event) => {
      let target = event.target;
      if (target.classList.contains('phone-user') ||
              target.classList.contains('numders')) {
          target.value = target.value.replace(/[^+\d]/g, '');
          // это для телефонов и поля  с метрами
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

export default sendForm;