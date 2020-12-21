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

  arrowUp.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
};
getArrowUp();

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
  const forms = document.querySelectorAll('form'),
        successMessage = document.getElementById('thanks'),
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

  const changeForm = (elem) => {
    if (elem.closest('.popup')) {
      let idForm = elem.getAttribute('name'),
      formWrap = document.getElementById(idForm);
      formWrap.style.display = 'none';
    }
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

      if(elem.id === 'footer_form') {
        if (!radioInp[0].checked && !radioInp[1].checked) {
          let alertMess = document.createElement('div');
          alertMess.textContent = 'Пожалуйста, выберите клуб!';
          alertMess.style.cssText = `
            padding-top: 15px;
            color: #ffd11a;
            text-align: center;`;
          elem.append(alertMess);
          setTimeout(() => alertMess.remove(), 2000);
          // alert('Выберите клуб');
          return;
        }
      }

      if(elem.id !== 'footer_form' && !checkInp.checked) {
        let alertMess = document.createElement('div');
          alertMess.textContent = 'Пожалуйста, согласитесь с обработкой данных!';
          alertMess.style.cssText = `
            padding-top: 15px;
            color: #ffd11a;
            text-align: center;`;
          elem.append(alertMess);
          setTimeout(() => alertMess.remove(), 2000);
        return;
      }

      spinner(elem);
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
          successMessage.style.display = 'block';
        })
        .catch((error) => {
          delSpinner();
          elem.reset();
          changeForm(elem);
          errorMessage.style.display = 'block';
          console.error(error);
        });
    });
  });
};
sendForm();

// валидация и маска для телефона
maskPhone('input[type="tel"]');

const validElems = (idElems) => {
  let elems = document.getElementById(idElems);

  elems.addEventListener('input', (event) => {
    let target = event.target;
    if (target.matches('input[type="text"]') && !target.closest('.price-message')) {
        target.value = target.value.replace(/[^А-Яа-яЁё\s]/ig, '');
    }
    if (target.matches('input[type="text"]') && target.closest('.price-message')) {
        target.value = target.value.replace(/[^А-Яа-яЁё\d]/ig, '');
    }
  });
};
validElems('banner-form');
validElems('card_order');
validElems('footer_form');
validElems('form1');
validElems('form2');

// Калькулятор
const calculator = () => {
  const priceTotal = document.getElementById('price-total'); // окончательная цена
  const cardSelection = document.getElementById('card_order'); // вся форма калькулятора
  const promo = document.getElementById('promo'); // промокод
  const cards = document.querySelectorAll('input[name="card-type"]'); // это все карты
  const clubs = document.querySelectorAll('input[name="club-name"]'); // это клубы

  // расчёты
  const countSumm = () => {
    let total;
    let cardValue;
    let clubValue;

    cards.forEach((elem) => {
      if (elem.checked) {
        cardValue = elem.value;}
    });

    clubs.forEach((elem) => {
      if (elem.checked) {
        clubValue = elem.value;}
    });

    if (clubValue === 'mozaika' && cardValue === '1') {total = 1999;}
    if (clubValue === 'mozaika' && cardValue === '6') {total = 9900;}
    if (clubValue === 'mozaika' && cardValue === '9') {total = 13900;}
    if (clubValue === 'mozaika' && cardValue === '12') {total = 19900;}
    if (clubValue === 'schelkovo' && cardValue === '1') {total = 2999;}
    if (clubValue === 'schelkovo' && cardValue === '6') {total = 14990;}
    if (clubValue === 'schelkovo' && cardValue === '9') {total = 21990;}
    if (clubValue === 'schelkovo' && cardValue === '12') {total = 24990;}
    
    if (promo.value === 'ТЕЛО2020') {total = total * 0.7;}

    total = Math.floor(total);
    priceTotal.textContent = total;
  };

  cardSelection.addEventListener('input', (event) => {
    let target = event.target;
    if(target.matches('input') &&  target.closest('.main-page')) {
      countSumm();}
  });
};
calculator();

// Слайдер в хидере
const headerSlider = () => {
  const slider = document.querySelector('.main-slider'),
        slide = slider.querySelectorAll('.slide'),
        sliderDots = document.querySelector('.slider-dots');
  let currentSlide = 0,
      interval;
  // пагинация для слайдера
  for (let i = 0; i < slide.length; i++) {
    let liDot = document.createElement('li');
    let buttonDot = document.createElement('button');
    sliderDots.append(liDot);
    liDot.append(buttonDot);
    buttonDot.classList.add('dot');
  }
  const dot = document.querySelectorAll('ul.slider-dots>li');
  dot[0].classList.add('slick-active');

  const prevSlide = (elem, index) => {
    elem[index].style.display = 'none';
  };
  const nextSlide = (elem, index) => {
    elem[index].style.display = 'block';
  };
  const dotNotActive = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };
  const dotActive = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide);
    dotNotActive(dot, currentSlide, 'slick-active');
    currentSlide++;
    if (currentSlide >= slide.length){
      currentSlide = 0; }
    nextSlide(slide, currentSlide);
    dotActive(dot, currentSlide, 'slick-active');
  };

  const startSlide = (time = 6000) => {
    interval = setInterval(autoPlaySlide, time);
  };
  const stopSlide = () => {
    clearInterval(interval);
  };
  // клик по кнопкам пагинации
  slider.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;
    // console.log('target: ', target);
    if (!target.matches('.dot')){
      return; }
    prevSlide(slide, currentSlide);
    dotNotActive(dot, currentSlide, 'slick-active');
    if (target.matches('.dot')){
      let btn = document.querySelectorAll('.dot');
      btn.forEach((elem, index) => {
        if (elem === target){
          currentSlide = index; }
      });
    }
    nextSlide(slide, currentSlide);
    dotActive(dot, currentSlide, 'slick-active');
  });
  // остановка и запуск слайдера при наведении мыши
  slider.addEventListener('mouseover', (event) => {
    if (event.target.matches('.dot')){
      stopSlide(); }
  });
  slider.addEventListener('mouseout', (event) => {
    if (event.target.matches('.dot')){
      startSlide(); }
  });

  startSlide(6000);
};
headerSlider();