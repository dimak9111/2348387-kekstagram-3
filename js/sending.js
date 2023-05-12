const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');

function onFormEscapeKeyDownSuccess(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeSuccessElement();
  }
}

function onFormEscapeKeyDownError(evt){
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeErrorElement();
  }
}

function closeSuccessElement() {
  successMessageElement.classList.add('hidden');
  document.removeEventListener('keydown', onFormEscapeKeyDownSuccess);
  document.removeEventListener('click', closeSuccessElement);
}

function closeErrorElement() {
  errorMessageElement.classList.add('hidden');
  document.removeEventListener('keydown', onFormEscapeKeyDownError);
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function successSending(){
  const successButton = successMessageElement.querySelector('.success__button');
  document.addEventListener('keydown', onFormEscapeKeyDownSuccess);
  document.addEventListener('click', closeSuccessElement);
  successButton.addEventListener('click', () => {
    closeSuccessElement();
  });
  document.body.append(successMessageElement);
}

function errorSending(){
  const errorButton = errorMessageElement.querySelector('.error__button');
  document.addEventListener('keydown', onFormEscapeKeyDownError);
  errorButton.addEventListener('click', () => {
    closeErrorElement();
  });
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.body.append(errorMessageElement);
}

export {successSending, errorSending};
