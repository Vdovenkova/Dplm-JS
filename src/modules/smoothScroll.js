'use strict';

// плавный переход к блокам сайта из меню и футера
const smoothScroll = () => {
  const slowScrollBlocks = (elem) => {
    // event.preventDefault();
    const blockID = elem.getAttribute('href').substr(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  document.addEventListener('click', (event) => {
    let target = event.target;
    if (!target.closest('.clubs') && target.matches('li a') &&
     target.closest('.top-menu, .popup-menu, #footer')) {
      event.preventDefault();
      slowScrollBlocks (target);
    }
  });
};

export default smoothScroll;