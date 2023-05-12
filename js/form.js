import { initScaleEditor } from './scale-editor.js';
import { initEffectController, resetEffectController } from './slider.js';


const uploadFileElement = document.querySelector('#upload-file');
const closeFormElement = document.querySelector('#upload-cancel');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');


const cleaningForm = () => {
  uploadFileElement.value = '';
  hashtagInputElement.value = '';
  commentInputElement.value = '';
  resetEffectController();
};

const openDownloadPicWindow = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscapeKeyDown);
};

function closeDownloadPicWindow() {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscapeKeyDown);
  cleaningForm();
}

function onFormEscapeKeyDown(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeDownloadPicWindow();
  }
}

initScaleEditor();
initEffectController();

//init form
uploadFileElement.addEventListener('change', () => {
  openDownloadPicWindow();
});

closeFormElement.addEventListener('click', () => {
  closeDownloadPicWindow();
});

export {openDownloadPicWindow, closeDownloadPicWindow };
