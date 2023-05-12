import {checkLen} from './utils.js';
import { successSending, errorSending } from './sending.js';


const uploadImageForm = document.querySelector('.img-upload__form');
const hashTagReg = new RegExp('^#[а-яa-zA-ZА-ЯёЁ0-9]{1,19}$');
const MIN_COMMENT_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;


const pristine  = new Pristine(uploadImageForm, {
  classTo: 'img-upload__text',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const validateCommentSection  = (value) => !checkLen(value, 19) && checkLen(value, 140);
const validateHashTag = (value) => checkLen(value, 0) || hashTagReg.test(value);

pristine.addValidator(uploadImageForm.querySelector('.text__description'), validateCommentSection, `Комментарий должен быть размером от ${MIN_COMMENT_LENGTH} до ${MAX_COMMENT_LENGTH} символов`);
pristine.addValidator(uploadImageForm.querySelector('.text__hashtags'), validateHashTag, 'Хештег должен начинаться с #, включать в себя только русские и латинские символы и не превышать длины 20 символов');

function setUserFormSubmit(onSuccess){
  uploadImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      const formData = new FormData(evt.target);

      fetch(
        'https://27.javascript.pages.academy/kekstagram-simple',
        {
          method: 'POST',
          body: formData,
        },
      )
        .then((response) => {
          if (response.ok) {
            onSuccess();
          } else {
            errorSending();
          }
        })
        .then(() => successSending());
    }
  });
}

export {setUserFormSubmit};
