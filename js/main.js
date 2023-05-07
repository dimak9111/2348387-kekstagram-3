const LAST_ID = 25;
const MIN_LIKES = 15, MAX_LIKES = 200;
const MIN_COMMENTS = 0, MAX_COMMENTS = 200;
const STD_DESCRIPTION = 'My favourite photo :)';

function getRand(min, max) {
  if(max <= min || min < 0) {
    return NaN;
  }
  return Math.round(min + Math.random() * (max - min));
}

function checkLen(string, possibleLen){
  return possibleLen >= string.length;
}

const genPhoto = (id, description = STD_DESCRIPTION) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: description,
  likes: getRand(MIN_LIKES, MAX_LIKES),
  comments: getRand(MIN_COMMENTS, MAX_COMMENTS)
});

const genPhotoArray = () => Array.from({length: LAST_ID}, (_, index) => genPhoto(index + 1));
