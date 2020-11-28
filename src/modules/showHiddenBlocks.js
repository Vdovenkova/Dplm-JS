'use strict';

// кнопка Больше
const showHiddenBlocks = () => {
// добавила трём скрытым элементам класс hidden-block
  const hiddenBlock = document.querySelectorAll('.hidden-block'),
    btnMore = document.querySelector('.add-sentence-btn');

  btnMore.addEventListener('click', () => {
    hiddenBlock.forEach((elem) => {
      if (elem.classList.contains('visible-sm-block') || elem.classList.contains('hidden')) {
        elem.classList.remove('visible-sm-block');
        elem.classList.remove('hidden');
      }
    });
    btnMore.style.display = 'none';
  });
};
export default showHiddenBlocks;