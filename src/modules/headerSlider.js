'use strict';

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

export default headerSlider;