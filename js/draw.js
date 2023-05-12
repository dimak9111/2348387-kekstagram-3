const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

function drawPictures(data){
  data.forEach(({url, likes, comments}) => {
    const newInstance = pictureTemplate.cloneNode(true);
    newInstance.querySelector('.picture__comments').textContent = comments;
    newInstance.querySelector('.picture__likes').textContent = likes;
    newInstance.querySelector('.picture__img').src = url;
    pictureListFragment.appendChild(newInstance);
  });

  picturesBlock.appendChild(pictureListFragment);
}

export {drawPictures};
