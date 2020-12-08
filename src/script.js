'use strict';

const getClubsList = () => {
  const clubsList = document.querySelector('.clubs-list>ul');
  clubsList.style.display = 'none';

  const toggleClubsList = () => {
    if (clubsList.style.display === 'none') {
      clubsList.style.display = 'block';
    } else if (clubsList.style.display === 'block') {
      clubsList.style.display = 'none';
    }
  };

  document.addEventListener('click', (event) => {
    let target = event.target;
    if (target.matches('.clubs-list>p') || target.matches('.clubs-list')) {
      toggleClubsList();
    } else if (!target.matches('.clubs-list>p') || !target.matches('.clubs-list')) {
      clubsList.style.display = 'none';
    }
  });
};
getClubsList();

// всплывающие окна
const modal = () => {
  // открываем окна
  document.querySelectorAll('.btn-popup').forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      let idPopup = target.dataset.popup.substr(1);
      document.getElementById(idPopup).style.display = 'block';
      if (target.closest('.fixed-gift')) {
        target.style.display = 'none';
      }
    });
  });

  // очистка инпутов
  const clearInp = (elem) => {
    elem.querySelectorAll('input').forEach((item) => {
      item.value = '';
    });
  };

  // закрываем окна
  document.querySelectorAll('.popup').forEach((elem) => {
    elem.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('close_icon') ||
      target.classList.contains('close-btn')) {
      elem.style.display = 'none';
      clearInp(elem);
    } else {
        target = target.closest('.form-content');
        if(!target) {
          elem.style.display = 'none';
          clearInp(elem);
        }
      }
    });
  });

};
modal();