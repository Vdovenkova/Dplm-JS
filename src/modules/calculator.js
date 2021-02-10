'use strict';

import animate from './animate';

// Калькулятор - расчет стоимости клубных карт
const calculator = () => {
  const priceTotal = document.getElementById('price-total'); // окончательная цена
  const cardSelection = document.getElementById('card_order'); // вся форма калькулятора
  const promo = document.getElementById('promo'); // промокод
  const cards = document.querySelectorAll('input[name="card-type"]'); // это все карты
  const clubs = document.querySelectorAll('input[name="club-name"]'); // это клубы

  // расчёты
  const countSumm = () => {
    let total;
    let cardValue;
    let clubValue;

    cards.forEach((elem) => {
      if (elem.checked) {
        cardValue = elem.value;}
    });

    clubs.forEach((elem) => {
      if (elem.checked) {
        clubValue = elem.value;}
    });

    if (clubValue === 'mozaika' && cardValue === '1') {total = 1999;}
    if (clubValue === 'mozaika' && cardValue === '6') {total = 9900;}
    if (clubValue === 'mozaika' && cardValue === '9') {total = 13900;}
    if (clubValue === 'mozaika' && cardValue === '12') {total = 19900;}
    if (clubValue === 'schelkovo' && cardValue === '1') {total = 2999;}
    if (clubValue === 'schelkovo' && cardValue === '6') {total = 14990;}
    if (clubValue === 'schelkovo' && cardValue === '9') {total = 21990;}
    if (clubValue === 'schelkovo' && cardValue === '12') {total = 24990;}
    
    if (promo.value === 'ТЕЛО2020') {total = total * 0.7;}

    animate({
      duration: 500,
      timing: function(timeFraction) { return timeFraction; },
      draw: function(progress) {
        priceTotal.textContent = Math.floor(progress * total); }
    });
  };

  cardSelection.addEventListener('input', (event) => {
    let target = event.target;
    if(target.matches('input#promo, input[type="radio"]') &&  target.closest('.main-page')) {
      countSumm();}
  });
};
export default calculator;