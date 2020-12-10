'use strict';

// выпадающий список клубов
const getClubsList = () => {
  const clubsList = document.querySelector('.clubs-list>ul');
  clubsList.style.display = 'none';

  const toggleClubsList = () => {
    if (clubsList.style.display === 'none') {
      clubsList.style.display = 'block';
    } else if (clubsList.style.display === 'block') {
      clubsList.style.display = 'none';
    }
  };

  document.addEventListener('click', (event) => {
    let target = event.target;
    if (target.matches('.clubs-list>p') || target.matches('.clubs-list')) {
      toggleClubsList();
    } else if (!target.matches('.clubs-list>p') || !target.matches('.clubs-list')) {
      clubsList.style.display = 'none';
    }
  });
};
getClubsList();

// всплывающие окна
const modal = () => {
  // открываем окна
  document.querySelectorAll('.btn-popup').forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      let idPopup = target.dataset.popup.substr(1);
      document.getElementById(idPopup).style.display = 'block';
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
modal();

// Отправка данных из форм
const sendForm = () => {
  const forms = document.querySelectorAll('form');
  const successMessage = document.getElementById('thanks'),
        errorMessage = document.getElementById('error-send');
    
  const loadMessage = document.createElement('div');
    let styleLoadMsg;

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
      // ещё нужно проверять флаг согласия на обработку данных
      // если не стоит выдавать сообщение, что нужно поставить флаг
      // и потом сбрасывать через пару секунд
      spinner(elem);
      const formData = new FormData(elem);
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
          if (elem.closest('.popup')) {
            let idForm = elem.getAttribute('name'),
            formWrap = document.getElementById(idForm);
            formWrap.style.display = 'none';
          }
          successMessage.style.display = 'block';
        })
        .catch((error) => {
          delSpinner();
          elem.reset();
          if (elem.closest('.popup')) {
            let idForm = elem.getAttribute('name'),
            formWrap = document.getElementById(idForm);
            formWrap.style.display = 'none';
          }
          errorMessage.style.display = 'block';
          console.error(error);
        });
    });
  });
};
sendForm();

// стрелка вверх
const getArrowUp = () => {
  const arrowUp = document.getElementById('arrow-up');
  arrowUp.style.display = 'none';

  let headerHeight = document.querySelector('header').offsetHeight / 1.5;

  document.addEventListener('scroll', () =>{
    if (window.pageYOffset >= headerHeight) {
      arrowUp.style.display = 'block';
    } else {
      arrowUp.style.display = 'none';
    }
  });
  
};
getArrowUp();