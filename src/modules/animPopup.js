'use strict';

import animate from './animate';

// анимация всех модальных окон
const animPopup = (popupBlock) => {
  let wrapPopup = popupBlock.querySelector('.form-wrapper');
  popupBlock.style.display = 'block';
  animate({
    duration: 300,
    timing: function(timeFraction) { return timeFraction; },
    draw: function(progress) { wrapPopup.style.top = `${progress * 20}vh`; }
  });
};

export default animPopup;