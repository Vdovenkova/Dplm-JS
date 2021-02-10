'use strict';

// фиксируем полоску меню вверху экрана при скролле. на ширине меньше 768.
const fixMenu = () => {
  const headBlock = document.querySelector('.head');
  const topMenu = document.querySelector('.top-menu');
  let styleTopMenu, headHeight;

  // стиль для фиксации полоски меню
  styleTopMenu = document.createElement('style');
  styleTopMenu.textContent = `
    .pos-fix {
      position: fixed;
      top: 0;
    }
    .mg-bttm {
      margin-bottom: 58px;
    }`;
  document.head.append(styleTopMenu);

  const addClasses = () => {
    topMenu.classList.add('pos-fix');
    headBlock.classList.add('mg-bttm');
  };
  const delClasses = () => {
    topMenu.classList.remove('pos-fix');
    headBlock.classList.remove('mg-bttm');
  };

  // при скролле полоска убирается или появляется путём
  // добавляения либо удаления класса из стиля
  document.addEventListener('scroll', () => {
    headHeight = headBlock.offsetHeight;
    if (window.innerWidth < 768 && window.pageYOffset >= headHeight) {
      addClasses();
    } else if (window.pageYOffset < headHeight) {
      delClasses();
    }
  });
  // при изменении ширины экрана полоска меню убирается или появляется
  window.addEventListener('resize', () => {
    headHeight = headBlock.offsetHeight;
    if (window.innerWidth >= 768 && topMenu.classList.contains('pos-fix')) {
      delClasses();
    } else if (window.innerWidth < 768 && window.pageYOffset >= headHeight) {
      addClasses();
    }
  });
};

export default fixMenu;