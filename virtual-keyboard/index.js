import { Key } from './classes.js'; // eslint-disable-line
import { capsCollection } from './capsCollection.js'; // eslint-disable-line
import { shiftCollection } from './shiftCollection.js'; // eslint-disable-line

const ArrkeyCode = [
  [192, '`'], [49, '1'], [50, '2'], [51, '3'], [52, '4'], [53, '5'], [54, '6'], [55, '7'], [56, '8'], [57, '9'], [48, '0'], [189, '-'], [187, '='], [8, 'Backspace'],
  [9, 'Tab'], [81, 'q'], [87, 'w'], [69, 'e'], [82, 'r'], [84, 't'], [89, 'y'], [85, 'u'], [73, 'i'], [79, 'o'], [80, 'p'], [219, '['], [221, ']'], [220, '\\'], [46, 'Del'],
  [20, 'CapsLk'], [65, 'a'], [83, 's'], [68, 'd'], [70, 'f'], [71, 'g'], [72, 'h'], [74, 'j'], [75, 'k'], [76, 'l'], [186, ';'], [222, '\''], [13, 'Enter'],
  [16, 'Shift'], [90, 'z'], [88, 'x'], [67, 'c'], [86, 'v'], [66, 'b'], [78, 'n'], [77, 'm'], [188, ','], [190, '.'], [191, '/'], [38, '&#9650'], [16, 'Shift'],
  [17, 'Ctrl'], [91, 'Win'], [18, 'Alt'], [32, 'Space'], [18, 'Alt'], [37, '&#9668'], [40, '&#9660'], [39, '&#9658'], [17, 'Ctrl'],
];

const body = document.querySelector('body');

const conteiner = document.createElement('div');
conteiner.classList.add('container');

const title = document.createElement('h1');
title.classList.add('title');
title.innerHTML = 'Virtual keyboard!';

const textArea = document.createElement('textarea');
textArea.classList.add('textarea');

let position = textArea.selectionStart;

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');

body.insertAdjacentElement('afterbegin', conteiner);
conteiner.insertAdjacentElement('afterbegin', title);
conteiner.insertAdjacentElement('beforeend', textArea);
conteiner.insertAdjacentElement('beforeend', keyboard);

ArrkeyCode.forEach((elem) => new Key(elem[0], elem[1]).appendTo(keyboard));
let isCaps = false;

const backspace = document.querySelector('.key-Backspace');
const del = document.querySelector('.key-Del');
const caps = document.querySelector('.key-CapsLk');
const shift = document.querySelectorAll('.key-Shift');

// functions
function keyAction(event) {
  if (event.target.tagName !== 'BUTTON') { return; }
  // textArea.select();
  let text = event.target.innerHTML;
  // console.log(event.target.dataset.keyCode);
  if (text === 'Backspace' || text === 'Del' || text === 'CapsLk' || text === 'Shift' || text === 'Ctrl' || text === 'Alt' || text === 'Win') return;
  if (text === 'Enter') text = '\n';
  if (text === 'Space') text = ' ';
  if (text === 'Tab') text = '  ';
  if (text === '&amp;') text = '&';
  if (text === '&lt;') text = '<';
  if (text === '&gt;') text = '>';
  if (textArea.selectionStart === textArea.value.length) {
    textArea.value += text;
  } else {
    const first = textArea.value.slice(0, position);
    const last = textArea.value.slice(position);

    textArea.value = first + text + last;
  }
  position += 1;
}

function backspaceAction() {
  if (position === 0) return;
  if (position === textArea.value.length) {
    textArea.value = textArea.value.slice(0, -1);
  } else {
    const first = textArea.value.slice(0, position - 1);
    const last = textArea.value.slice(position);

    textArea.value = first + last;
  }
  position -= 1;
}

function delAction() {
  if (position === textArea.value.length) return;
  if (position === 0) {
    textArea.value = textArea.value.slice(1);
  } else {
    const first = textArea.value.slice(0, position);
    const last = textArea.value.slice(position + 1);

    textArea.value = first + last;
  }
}

function capsAction(caps) {
  const keyCollection = document.querySelectorAll('.key');

  keyCollection.forEach((elem) => {
    if (capsCollection[elem.innerHTML]) elem.innerHTML = capsCollection[elem.innerHTML];
  });
  isCaps = !isCaps;
  if (isCaps) caps.target.classList.add('pres');
  if (!isCaps)caps.target.classList.remove('pres');
}

function shiftAction(key) {
  const keyCollection = document.querySelectorAll('.key');

  keyCollection.forEach((elem) => {
    if (shiftCollection[elem.innerHTML]) elem.innerHTML = shiftCollection[elem.innerHTML];

  })
}

// actions
textArea.addEventListener('click', () => {
  position = textArea.selectionStart;
});

keyboard.addEventListener('click', keyAction);

backspace.addEventListener('click', backspaceAction);
del.addEventListener('click', delAction);
caps.addEventListener('click', capsAction);
shift.forEach(elem => elem.addEventListener('mousedown', shiftAction));
shift.forEach(elem => elem.addEventListener('mouseup', shiftAction));

// document.addEventListener('keypress', function(elem) {
//   const keyCollection = document.querySelectorAll('.key');
//   // let num = elem.keyCode;

//   keyCollection.forEach(item => {
//       if (+item.dataset.keyCode === +num) {
//         item.click();
//       }
//   })
// })