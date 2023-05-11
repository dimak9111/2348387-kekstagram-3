const uploadForm = document.querySelector('.img-upload__form');
const overlay = uploadForm.querySelector('.img-upload__overlay');

const buttonSmaller = uploadForm.querySelector('.scale__control--smaller');
const buttonBigger = uploadForm.querySelector('.scale__control--bigger');
const buttons = document.querySelectorAll('.effects__radio');

const scale = uploadForm.querySelector('.scale__control--value');
const previewPicture = uploadForm.querySelector('.img-upload__preview img');


const shrink = (evt) => {
  evt.preventDefault();

  let value = parseInt(scale.value, 10);
  value = (value >= 50) ? value - 25 : 25;
  scale.value = `${value}%`;
  previewPicture.style.transform = `scale(${value/100})`;
};

const enLarge = (evt) => {
  evt.preventDefault();

  let value = parseInt(scale.value, 10);
  value = (value <= 75) ? value + 25 : 100;
  scale.value = `${value}%`;
  previewPicture.style.transform = `scale(${value/100})`;
};


const removeFilters = (evt) => {
  evt.preventDefault();

  previewPicture.classList = [];
};

function changeFilterFactory(elem) {
  const currentElem = elem;
  const changeFilter = (evt) => {
    evt.preventDefault();

    previewPicture.classList = [];
    previewPicture.classList.add(`effects__preview--${currentElem.value}`);
  };
  return changeFilter;
}

const addListener = (elem) => {
  if (elem.value === 'none') {
    elem.addEventListener('click', removeFilters);
  } else {
    elem.addEventListener('click', changeFilterFactory(elem));
  }
};

const removeListener = () => {
  buttons.forEach((element) => {
    if (element.value === 'none') {
      element.removeEventListener('click', removeFilters);
    } else {
      element.removeEventListener('click', changeFilterFactory(element));
    }
  });
};

const makeListeners = () => {
  buttons.forEach((element) => addListener(element));
};


const closeOnButton = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeWindow();
  }
};

function openWindow() {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeOnButton);
  buttonSmaller.addEventListener('click', shrink);
  buttonBigger.addEventListener('click', enLarge);
  makeListeners();
}

function closeWindow() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeOnButton);
  cleanForm();
  removeListener();
}

uploadForm.addEventListener('change', (evt) => {
  evt.preventDefault();

  openWindow();
});

const closeButton = uploadForm.querySelector('#upload-cancel');

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  closeWindow();
});


function cleanForm() {
  document.querySelector('#upload-file').value = '';
  document.querySelector('.text__hashtags').value = '';
  document.querySelector('.text__description').value = '';
}

