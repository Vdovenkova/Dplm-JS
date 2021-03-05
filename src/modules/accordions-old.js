'use strict';

// аккордеоны
// в таком варианте при клике на заголовок раздела закрывается открытый контент
// сразу в двух аккордеонах

const accordions = () => {
  const panelHeading = document.querySelectorAll('.panel-heading'), // заголовки разделов аккордеонов
        panelCollapse = document.querySelectorAll('.panel-collapse'), // контент в аккордеонах
        nextStep = document.querySelectorAll('a[class*="button"]'); // кнопки След.шаг в калькуляторе
  
  const accord = (contentAcc) => {
    if (contentAcc.classList.contains('in')){
      contentAcc.classList.remove('in');
    } else {
      contentAcc.classList.add('in');
    }
    panelCollapse.forEach((itemContent) => {
      if (itemContent !== contentAcc) {
        itemContent.classList.remove('in');
      }
    });
  };

  nextStep.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      target = target.closest('a[class*="button"]');
      let blockID = target.getAttribute('href').substr(1),
          contentAcc = document.getElementById(blockID);
      accord(contentAcc);
    });
  });

  panelHeading.forEach((itemHeading) => {
    itemHeading.addEventListener('click', (event) => {
      event.preventDefault();
      let contentAcc = itemHeading.nextElementSibling;
      accord(contentAcc);
    });
  });
};

// export default accordions;