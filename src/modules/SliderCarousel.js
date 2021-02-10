'use strict';

// Слайдер-карусель в блоке section id="services"
class SliderCarousel {
  constructor ({
    main,
    wrap,
    next,
    prev,
    infinity = false,
    slidesToShow = 5,
    position = 0,
    responsive = []
  }){
    if (!main || !wrap) {
      console.warn('Slader-carousel: Неодходимо добавить свойства "main" и "wrap"');
    }
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = document.querySelector(wrap).children;
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    this.options = {
      infinity,
      position,
      widthSlide: Math.floor(100 / slidesToShow),
      // widthSlide: Math.floor(100 / this.slidesToShow),
      // maxPosition: this.slides.length - this.slidesToShow
    };
    this.responsive = responsive;
  }

  init(){
    this.addCarouselClass();
    this.addCarouselStyle();
    this.controlSlider();
    // console.log(this.options.widthSlide);
    if (this.responsive){
      this.responseInit();
    }
  }

  addCarouselClass(){
    this.main.classList.add('сarousel-slider');
    this.wrap.classList.add('carousel-slider__wrap');
    for (let item of this.slides) {
      item.classList.add('carousel-slider__item');
    }
  }

  addCarouselStyle(){
    let style = document.getElementById('sliderCarousel-style');
    if (!style){
      style = document.createElement('style');
      style.id = 'sliderCarousel-style';
    }
    style.textContent = `
      .сarousel-slider {
        overflow: hidden !important
      }
      .carousel-slider__wrap {
        transition: transform 0.5s !important;
        will-change: transform !important;
      }
      .carousel-slider__item {
        flex: 0 0 ${this.options.widthSlide}% !important;
        margin: 0 auto !important;
      }`;
    document.head.appendChild(style);
  }

  controlSlider(){
    this.prev.addEventListener('click', this.prevSlider.bind(this));
    this.next.addEventListener('click', this.nextSlider.bind(this));
  }

  prevSlider(){
    if (this.options.infinity || this.options.position > 0) {
      --this.options.position;
      if (this.options.position < 0){
        // this.options.position = this.options.maxPosition;
        this.options.position = this.slides.length - this.slidesToShow;
      }
      this.wrap.style.transform = `
          translateX(${-this.options.position * this.options.widthSlide}%)`;
    }
  }

  nextSlider(){
    // if (this.options.infinity || this.options.position < this.options.maxPosition){
    if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow){
      ++this.options.position;
      // if (this.options.position > this.options.maxPosition) {
      if (this.options.position > this.slides.length - this.slidesToShow) {
        this.options.position = 0;
      }
      this.wrap.style.transform = `
          translateX(${-this.options.position * this.options.widthSlide}%)`;
    }
  }
  responseInit(){
    const slidesToShowDefault = this.slidesToShow;
    const allResponse = this.responsive.map(item => item.breakpoint);
    const maxResponse = Math.max(...allResponse);

    const chekResponse = () => {
      const widthWindow = document.documentElement.clientWidth;
      if (widthWindow < maxResponse) {
        for (let i = 0; i < allResponse.length; i++){
          if (widthWindow < allResponse[i]) {
            this.slidesToShow = this.responsive[i].slidesToShow;
            this.options.widthSlide = Math.floor(100 / this.slidesToShow);
            this.addCarouselStyle();
          }
        }
      } else {
        this.slidesToShow = slidesToShowDefault;
        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
        this.addCarouselStyle();
      }
    };
    chekResponse();
    window.addEventListener('resize', chekResponse);
  }
}

export default SliderCarousel;