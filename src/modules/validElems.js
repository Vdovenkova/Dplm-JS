'use strict';

// валидация полей ввода.

const validElems = (idElems) => {
  let elems = document.getElementById(idElems);

  elems.addEventListener('input', (event) => {
    let target = event.target;
    if (target.matches('input[type="text"]') && !target.closest('.price-message')) {
        target.value = target.value.replace(/[^А-Яа-яЁё\s]/ig, '');
    }
    if (target.matches('input[type="text"]') && target.closest('.price-message')) {
        target.value = target.value.replace(/[^А-Яа-яЁё\d]/ig, '');
    }
  });
};
export default validElems;