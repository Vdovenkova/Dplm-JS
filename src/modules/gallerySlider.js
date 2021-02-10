'use strict';

// Слайдер в фотогалерее
const gallerySlider = () => {
  const photoSlider = document.querySelector('.gallery-slider'),
        photoSlide = photoSlider.querySelectorAll('.slide'),
        photoSliderDots = photoSlider.querySelector('.slider-dots');
  let currentSlide = 0,
      interval;
  // убраем все слайды, кроме первого
  photoSlide.forEach((item, i) => {
    if (i !== 0) { item.style.display = 'none'; }
  });
  // добавляем точки пагинация для слайдера
  for (let i = 0; i < photoSlide.length; i++) {
    let photoLiDot = document.createElement('li');
    let photoButtonDot = document.createElement('button');
    photoSliderDots.append(photoLiDot);
    photoLiDot.append(photoButtonDot);
    photoButtonDot.classList.add('photo-dot');
  }
  const photoDot = photoSlider.querySelectorAll('ul.slider-dots>li');
  photoDot[0].classList.add('slick-active');
  // переход по слайдам
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
  // автопрокрутка слайдера
  const autoPlaySlide = () => {
    prevSlide(photoSlide, currentSlide);
    dotNotActive(photoDot, currentSlide, 'slick-active');
    currentSlide++;
    if (currentSlide >= photoSlide.length){
      currentSlide = 0; }
    nextSlide(photoSlide, currentSlide);
    dotActive(photoDot, currentSlide, 'slick-active');
  };
  // старт прокрутки слайдера
  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };
  // остановка прокрутки слайдера
  const stopSlide = () => {
    clearInterval(interval);
  };
  // переход по слайдам при клике по кнопкам пагинации и стрелкам
  photoSlider.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;

    if (!target.closest('.photo-dot, .slider-arrow')) { return; }
    prevSlide(photoSlide, currentSlide);
    dotNotActive(photoDot, currentSlide, 'slick-active');
    if (target.closest('.next')){
      currentSlide++;
    } else if (target.closest('.prev')){
      currentSlide--;
    } else if (target.matches('.photo-dot')) {
      let photoBtn = document.querySelectorAll('.photo-dot');
      photoBtn.forEach((elem, index) => {
        if (elem === target) { currentSlide = index; }
      });
    }
    if(currentSlide >= photoSlide.length) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = photoSlide.length - 1;
    }
    nextSlide(photoSlide, currentSlide);
    dotActive(photoDot, currentSlide, 'slick-active');
  });
  // остановка и запуск переключения слайдов при наведении мыши на стрелки и пагинации
  photoSlider.addEventListener('mouseover', (event) => {
    if (event.target.closest('.slider-arrow') ||
    event.target.closest('.photo-dot')){
      stopSlide();
    }
  });
  photoSlider.addEventListener('mouseout', (event) => {
    if (event.target.closest('.slider-arrow') ||
    event.target.closest('.photo-dot')){
      startSlide();
    }
  });

  startSlide(3000);
};

export default gallerySlider;