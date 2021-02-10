'use strict';

import animate from './modules/animate';
import animPopup from './modules/animPopup';
import getClubsList from './modules/getClubsList';
import getArrowUp from './modules/getArrowUp';
import modal from './modules/modal';
import sendForm from './modules/sendForm';
import validElems from './modules/validElems';
import calculator from './modules/calculator';
import headerSlider from './modules/headerSlider';
import gallerySlider from './modules/gallerySlider';
import toggleMenu from './modules/toggleMenu';
import fixMenu from './modules/fixMenu';
import smoothScroll from './modules/smoothScroll';
import SliderCarousel from './modules/SliderCarousel';
// import maskPhone from './plugins/maskPhone';

// выпадающий список клубов
getClubsList();
// стрелка вверх
getArrowUp();
// всплывающие окна
modal();
// Отправка данных из форм
sendForm();
// валидация полей ввода имен и промокода
validElems('banner-form');
validElems('card_order');
validElems('footer_form');
validElems('form1');
validElems('form2');
// Калькулятор - расчет стоимости клубных карт
calculator();
// Слайдер в хидере
headerSlider();
// Слайдер в фотогалерее
gallerySlider();
// открываем закрываем мобильное меню
toggleMenu();
// фиксируем полоску меню вверху экрана при скролле. на ширине меньше 768.
fixMenu();
// плавный переход к блокам сайта из меню и футера
smoothScroll();
// Слайдер-карусель в блоке section id="services"
const carousel = new SliderCarousel({
  main: '.services-slider',
  wrap: '.services-slider__wrap',
  next: '#carousel-next',
  prev: '#carousel-prev',
  slidesToShow: 5,
  infinity: true,
  responsive: [{
      breakpoint: 1024,
      slidesToShow: 3
    },
    {
      breakpoint: 768,
      slidesToShow: 2
    },
    {
      breakpoint: 576,
      slidesToShow: 1
    }
  ]
});
carousel.init();
// маска и валидация для полей ввода тел.номера
maskPhone('input[type="tel"]');