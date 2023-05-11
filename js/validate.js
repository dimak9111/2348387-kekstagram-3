import {checkLen} from './utils.js';

const form = document.querySelector('.img-upload__form');
const reg = new RegExp('^#[а-яА-ЯA-Za-zёЁ0-9]{1,17}$');
const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

pristine.addValidator(document.querySelector('.text__hashtags'), validateHashtag, 'Хэштег не должен привышать 17 символов и обязан начинаться с решётки!');
pristine.addValidator(document.querySelector('.text__description'), validateComment, 'Длина комментария от 20 до 140 символов!');

function validateHashtag(element) {
  return reg.test(element) || checkLen(element, 0);
}

function validateComment(element) {
  return !checkLen(element, 19) && checkLen(element, 140);
}

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
