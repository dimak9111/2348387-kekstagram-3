const effectsItemList = document.querySelector('.effects__list');
const imgElement = document.querySelector('.img-upload__preview');
const sliderBarField = document.querySelector('.effect-level');
const effectLevelSlider = sliderBarField.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const pictureEffects = {
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1
  },
};

let currentEffect = 'none';
let previousEffect = undefined;

sliderBarField.hidden = true;

const setEffectIntensity = () => {
  if (currentEffect !== 'none') {
    const currentFilter = pictureEffects[currentEffect].filter;
    let currentIntesity = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = currentIntesity;
    if (currentEffect === 'marvin') {
      currentIntesity += '%';
    } else if (currentEffect === 'phobos') {
      currentIntesity += 'px';
    }
    imgElement.style.filter = `${currentFilter}(${currentIntesity})`;
  }
};

const resetEffectController = () => {
  effectLevelValue.value = '100%';
  document.querySelector('.img-upload__preview').style.scale = 1;
  if (previousEffect) {
    imgElement.classList.remove(`effects__preview--${previousEffect}`);
    imgElement.style.filter = '';
  }
  sliderBarField.hidden = true;
  previousEffect = undefined;
};

const initEffectController = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => value,
    },
  });

  effectsItemList.addEventListener('change', (evt) => {
    currentEffect = evt.target.value;
    if (currentEffect === previousEffect) {
      return;
    }
    if (previousEffect) {
      imgElement.classList.remove(`effects__preview--${previousEffect}`);
    }
    imgElement.classList.add(`effects__preview--${currentEffect}`);
    previousEffect = currentEffect;
    if (currentEffect === 'none') {
      sliderBarField.hidden = true;
      imgElement.style.filter = '';
      effectLevelValue.value = '';
      return;
    } else {
      sliderBarField.hidden = false;
    }
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: pictureEffects[currentEffect].min,
        max: pictureEffects[currentEffect].max
      },
      start: pictureEffects[currentEffect].max,
      step: pictureEffects[currentEffect].step
    });
    effectLevelValue.value = pictureEffects[currentEffect].max;
  });

  effectLevelSlider.noUiSlider.on('update', () => {
    setEffectIntensity(currentEffect);
  });
};

export {initEffectController, resetEffectController};
