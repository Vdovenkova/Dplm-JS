'use strict';

import animPopup from './animPopup';

// Отправка данных из форм
const sendForm = () => {
  const forms = document.querySelectorAll('form'),
        successMessage = document.getElementById('thanks'),
        errorMessage = document.getElementById('error-send');
  const loadMessage = document.createElement('div');
  let styleLoadMsg, textMess, alertMess;

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
        --sk-size: 40px;
        --sk-color: #ffd11a;
      }

      .sk-flow {
        margin: auto;
        width: calc(var(--sk-size) * 1.3);
        height: calc(var(--sk-size) * 1.3);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .sk-flow-dot {
        width: 25%;
        height: 25%;
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

  const changeForm = (elem) => {
    if (elem.closest('.popup')) {
      let idForm = elem.getAttribute('name'),
      formWrap = document.getElementById(idForm);
      formWrap.style.display = 'none';
    }
  };

  const showAlertMess = (textMess, elem) => {
    alertMess = document.createElement('div');
    alertMess.textContent = textMess;
    alertMess.style.cssText = `
      padding-top: 15px;
      color: #ffd11a;
      text-align: center;`;
    elem.append(alertMess);
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
      let checkInp = elem.querySelector('input[type="checkbox"]');
      let radioInp = elem.querySelectorAll('input[type="radio"]');
      // проверка выбора клуба в футере
      if(elem.id === 'footer_form') {
        if (!radioInp[0].checked && !radioInp[1].checked) {
          textMess = `Пожалуйста, выберите клуб!`;
          showAlertMess(textMess, elem);
          setTimeout(() => alertMess.remove(), 2000);
          return;
        }
      }
      // проверка флага согласия обработки данных
      if(elem.id !== 'footer_form' && !checkInp.checked) {
        textMess = `Пожалуйста, согласитесь с обработкой данных!`;
        showAlertMess(textMess, elem);
        setTimeout(() => alertMess.remove(), 2000);
        return;
      }
      spinner(elem); // добавляем спиннер пока отправляются данные
      const formData = new FormData(elem);
      // если калькулятор, то ещё отправляем промокод и сумму карты
      if (elem.closest('.main-page')) {
        const promoCode = document.getElementById('promo'),
              priceTotal = document.getElementById('price-total');
        formData.append(promoCode.id, promoCode.value);
        formData.append(priceTotal.id, priceTotal.textContent);
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
          elem.reset();
          changeForm(elem);
          // successMessage.style.display = 'block';
          animPopup(successMessage);
        })
        .catch((error) => {
          delSpinner();
          elem.reset();
          changeForm(elem);
          // errorMessage.style.display = 'block';
          animPopup(errorMessage);
          console.error(error);
        });
    });
  });
};

export default sendForm;