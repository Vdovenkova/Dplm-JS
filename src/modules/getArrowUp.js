'use strict';

// стрелка вверх
const getArrowUp = () => {
  const arrowUp = document.getElementById('arrow-up');
  // нужно сразу проверять вот это window.pageYOffset >= headerHeight
  // если тру, стрелка есть, иначе - нет.
  arrowUp.style.display = 'none';

  let headerHeight = document.querySelector('header').offsetHeight / 1.5;

  document.addEventListener('scroll', () =>{
    if (window.pageYOffset >= headerHeight) {
      arrowUp.style.display = 'block';
    } else {
      arrowUp.style.display = 'none';
    }
  });

  arrowUp.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
};

export default getArrowUp;