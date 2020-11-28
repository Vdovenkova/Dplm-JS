'use strict';

// калькулятор
const calculator = () => {
  const calculatorBlock = document.querySelector('.calculator-block'),
      switchOne = document.getElementById('myonoffswitch'),
      switchTwo = document.getElementById('myonoffswitch-two'),
      secondWell = document.getElementById('second-well'),
      calcResult = document.getElementById('calc-result'),
      diameterOne = document.querySelector('.diameter-one'),
      ringsOne = document.querySelector('.rings-one'),
      diameterTwo = document.querySelector('.diameter-two'),
      ringsTwo = document.querySelector('.rings-two');

  if (switchOne.checked) {
    secondWell.style.display = 'none';
    calcResult.value = 10000;
    diameterTwo.classList.remove('calculator');
    ringsTwo.classList.remove('calculator');
  }
  switchTwo.checked = false;

  const countSumm = () => {
    let result = 0; // итоговая сумма

    let diameterOneInd = diameterOne.options.selectedIndex, //выбранный диаметр первой камеры
          ringsOneInd = ringsOne.options.selectedIndex, //кол-во колец первой камеры
          diameterTwoInd = diameterTwo.options.selectedIndex, //выбранный диаметр второй камеры
          ringsTwoInd = ringsTwo.options.selectedIndex; //кол-во колец первой камеры

    if (switchOne && !switchOne.checked) { // выбрано две камеры
      secondWell.style.display = 'block';
      diameterTwo.classList.add('calculator');
      ringsTwo.classList.add('calculator');
      result = 15000;
    } else if (switchOne && switchOne.checked) { // выбрана одна камера
      secondWell.style.display = 'none';
      diameterTwo.classList.remove('calculator');
      ringsTwo.classList.remove('calculator');
      result = 10000;
    }

    if (diameterOne && diameterOneInd === 0) {
      result = result * 1; // диаметр 1й камеры 1,4 метра - цена не меняется
    } else if (diameterOne && diameterOneInd === 1) {
      result = result + (result * 0.2); // диаметр 1й камеры 2 метра - к цене прибавляется 20%
    }

    if (diameterTwo && diameterTwoInd === 0) {
      result = result * 1; // диаметр 2й камеры 1,4 метра - цена не меняется
    } else if (diameterTwo && diameterTwoInd === 1) {
      result = result + (result * 0.2); // диаметр 2й камеры 2 метра - к цене прибавляется 20%
    }

    if (ringsOne && ringsOneInd === 0) {
      result = result * 1; // одно кольцо у первой камеры - цена не меняется
    } else if (ringsOne && ringsOneInd === 1) {
      result = result + (10000 * 0.3); // 2 кольца у первой камеры - добавляется 30% от 10000
    } else if (ringsOne && ringsOneInd === 2) {
      result = result + (10000 * 0.5); // 3 кольца у первой камеры - добавляется 50% от 10000
    }

    if (ringsTwo && ringsTwoInd === 0) {
      result = result * 1; // одно кольцо у 2й камеры - цена не меняется
    } else if (ringsTwo && ringsTwoInd === 1) {
      result = result + (5000 * 0.2); // 2 кольца у 2й камеры - добавляется 20% от 5000
    } else if (ringsTwo && ringsTwoInd === 2) {
      result = result + (5000 * 0.4); // 3 кольца у 2й камеры - добавляется 40% от 5000
    }

    if (switchTwo.checked && switchOne.checked) {
      result = result + (result * 0.1); // выбрано днище - одна камера
    } else if (switchTwo.checked && !switchOne.checked) {
      result = result + (result * 0.2); // выбрано днище - две камеры
    } else if (switchTwo && !switchTwo.checked) {
      result = result ; // днище не выбрано
    }

    calcResult.value = result;
  };
  
  calculatorBlock.addEventListener('change', (event) => {
    let target = event.target;

    if(target.matches('select') || target.matches('input')){
      countSumm();
    }
  });
};

export default calculator;