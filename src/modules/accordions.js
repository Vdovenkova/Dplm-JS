'use strict';

// аккордеоны
// получаем не полностью див заголовка раздела аккордеона, а только ссылку в нём
// panelHeading = document.querySelectorAll('a[role*="button"]'),
// завязываемся на атрибут aria-controls в заголовке раздела
// т.к. он равен id в контенте аккордеона
// а так же ссылка в заголовке равна тому же значению, но впереди решётка #

const accordions = () => {
  const panelHeading = document.querySelectorAll('a[role*="button"]'), // заголовки разделов аккордеонов
        panelCollapse = document.querySelectorAll('.panel-collapse'), // контент в аккордеонах
        nextStep = document.querySelectorAll('a[class*="button"]'); // кнопки След.шаг в калькуляторе

  const accord = (idAcc, idAccBlock) => {
    let contentAcc = document.getElementById(idAcc);
    if (contentAcc.classList.contains('in')){
      contentAcc.classList.remove('in');
    } else {
      contentAcc.classList.add('in');
    }
    panelCollapse.forEach((itemContent) => {
      // теперь открытый контент закрывается только в том аккордеоне, по которому кликают.
      if (itemContent !== contentAcc && itemContent.closest(`#${idAccBlock}`)) {
        itemContent.classList.remove('in');
      }
    });
  };

  nextStep.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      target = target.closest('a[class*="button"]');
      let idAcc = target.getAttribute('href').substr(1),
          idAccBlock = target.dataset.parent.substr(1);
      accord(idAcc, idAccBlock);
    });
  });

  panelHeading.forEach((itemHeading) => {
    itemHeading.addEventListener('click', (event) => {
      event.preventDefault();
      let idAcc = itemHeading.getAttribute('aria-controls');
      // далее получаем id всего блока, т.к. у нас 2 блока аккордеон на странице
      // id блока равен атрибуту data-parent заголовка раздела без #
      let idAccBlock = itemHeading.dataset.parent.substr(1);
      accord(idAcc, idAccBlock);
    });
  });
};

export default accordions;