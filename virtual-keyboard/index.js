import { Key } from './classes.js'; // eslint-disable-line
import { capsCollection } from './capsCollection.js'; // eslint-disable-line
import { shiftCollection } from './shiftCollection.js'; // eslint-disable-line

const ArrkeyCode = [
  ['Backquote', '`'], ['Digit1', '1'], ['Digit2', '2'], ['Digit3', '3'], ['Digit4', '4'], ['Digit5', '5'], ['Digit6', '6'], ['Digit7', '7'], ['Digit8', '8'], ['Digit9', '9'], ['Digit0', '0'], ['Minus', '-'], ['Equal', '='], ['Backspace', 'Backspace'],
  ['Tab', 'Tab'], ['KeyQ', 'q'], ['KeyW', 'w'], ['KeyE', 'e'], ['KeyR', 'r'], ['KeyT', 't'], ['KeyY', 'y'], ['KeyU', 'u'], ['KeyI', 'i'], ['KeyO', 'o'], ['KeyP', 'p'], ['BracketLeft', '['], ['BracketRight', ']'], ['Backslash', '\\'], ['Delete', 'Del'],
  ['CapsLock', 'CapsLk'], ['KeyA', 'a'], ['KeyS', 's'], ['KeyD', 'd'], ['KeyF', 'f'], ['KeyG', 'g'], ['KeyH', 'h'], ['KeyJ', 'j'], ['KeyK', 'k'], ['KeyL', 'l'], ['Semicolon', ';'], ['Quote', '\''], ['Enter', 'Enter'],
  ['ShiftLeft', 'Shift'], ['KeyZ', 'z'], ['KeyX', 'x'], ['KeyC', 'c'], ['KeyV', 'v'], ['KeyB', 'b'], ['KeyN', 'n'], ['KeyM', 'm'], ['Comma', ','], ['Period', '.'], ['Slash', '/'], ['ArrowUp', '&#9650'], ['ShiftRight', 'Shift'],
  ['ControlLeft', 'Ctrl'], ['MetaLeft', 'Win'], ['AltLeft', 'Alt'], ['Space', 'Space'], ['AltRight', 'Alt'], ['ArrowLeft', '&#9668'], ['ArrowDown', '&#9660'], ['ArrowRight', '&#9658'], ['ControlRight', 'Ctrl'],
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
let isPres = false;

const text1 = document.createElement('p');
const text2 = document.createElement('p');
const link = document.createElement('a');
text1.innerHTML = 'Keyboard created for Windows';
text2.innerHTML = 'For change language press: (don\'t work yet)';
link.href = 'https://github.com/1iekim/keyboard/pull/4';
link.innerHTML = 'PR link';

conteiner.insertAdjacentElement('beforeend', text1);
conteiner.insertAdjacentElement('beforeend', text2);
conteiner.insertAdjacentElement('beforeend', link);

// functions
function keyAction(event) {
  if (event.target.tagName !== 'BUTTON') { return; }
  let text = event.target.innerHTML;
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

function changeText(collection, source) {
  collection.forEach((key) => {
    if (source[key.innerHTML]) key.innerHTML = source[key.innerHTML];
  });
}

function capsAction(item) {
  const keyCollection = document.querySelectorAll('.key');

  changeText(keyCollection, capsCollection);

  isCaps = !isCaps;
  if (isCaps) item.target.classList.add('pres');
  if (!isCaps) item.target.classList.remove('pres');
}

function shiftAction() {
  if (isPres) return;
  const keyCollection = document.querySelectorAll('.key');

  changeText(keyCollection, shiftCollection);
}

function objKey() {
  const keyCollection = document.querySelectorAll('.key');
  const obj = {};
  keyCollection.forEach((item) => {
    obj[item.dataset.keyCode] = item;
  });
  return obj;
}

function pressKey(elem) {
  const num = elem.code;
  const obj = objKey();
  if (elem.key === 'Shift') {
    shiftAction();
    isPres = true;
  }
  if (elem.key === 'Tab') {
    textArea.focus();
  }
  obj[num].click();
  if (num !== 'CapsLock') {
    obj[num].classList.add('pres');
  }
}

function upKey(elem) {
  if (elem.key === 'Shift') {
    isPres = false;
    shiftAction();
  }
  const obj = objKey();
  if (elem.code !== 'CapsLock') {
    setTimeout(() => obj[elem.code].classList.remove('pres'), 100);
  }
}

// actions
textArea.addEventListener('click', () => {
  position = textArea.selectionStart;
  setTimeout(() => {
    textArea.blur();
  }, 10);
});

keyboard.addEventListener('click', keyAction);

backspace.addEventListener('click', backspaceAction);
del.addEventListener('click', delAction);
caps.addEventListener('click', capsAction);
shift.forEach((elem) => elem.addEventListener('mousedown', shiftAction));
shift.forEach((elem) => elem.addEventListener('mouseup', shiftAction));

document.addEventListener('keydown', pressKey);

document.addEventListener('keyup', upKey);
