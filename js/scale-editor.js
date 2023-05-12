const zoomIn = document.querySelector('.scale__control--bigger');
const zoomOut = document.querySelector('.scale__control--smaller');
const scale = document.querySelector('.scale__control--value');
const previewPicture = document.querySelector('.img-upload__preview');

const STEP = 25;

function shrink (evt) {
  evt.preventDefault();

  let value = parseInt(scale.value, 10);
  value = (value >= 50) ? value - STEP : 25;
  scale.value = `${value}%`;
  previewPicture.style.transform = `scale(${value/100})`;
}

function enlarge (evt) {
  evt.preventDefault();

  let value = parseInt(scale.value, 10);
  value = (value <= 75) ? value + STEP : 100;
  scale.value = `${value}%`;
  previewPicture.style.transform = `scale(${value/100})`;
}

function initScaleEditor() {
  zoomIn.addEventListener('click', (evt) => {
    enlarge(evt);
  });

  zoomOut.addEventListener('click', (evt) => {
    shrink(evt);
  });
}

export {initScaleEditor};

