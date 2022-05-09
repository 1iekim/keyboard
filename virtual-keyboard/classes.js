class Key{
  constructor(keyCode, keyContent) {
    this.key = document.createElement('button');
    this.key.dataset.keyCode = keyCode;
    this.key.innerHTML = keyContent;
    this.key.classList.add('key');
    this.key.classList.add(`key-${keyContent}`);
  }

  appendTo(conteiner) {
    conteiner.insertAdjacentElement('beforeend', this.key);
  }
}

export { Key }