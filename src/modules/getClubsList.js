'use strict';

// выпадающий список клубов
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

export default getClubsList;