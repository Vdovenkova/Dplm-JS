'use strict';

// открываем закрываем мобильное меню 
const toggleMenu = () => {
  const popupMenu = document.querySelector('.popup-menu');
  document.querySelector('header').addEventListener('click', (event) => {
    let target = event.target;
    // console.log(target);
    if (target.matches('.menu-button>img')) {
      popupMenu.style.display = 'flex';
    }
    if (target.matches('.close-menu-btn>img') || target.closest('.scroll') && target.closest('.popup-menu')) {
      popupMenu.style.display = 'none';
    }
  });
};

export default toggleMenu;