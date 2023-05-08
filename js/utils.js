function getRand(min, max) {
  if(max <= min || min < 0) {
    return NaN;
  }
  return Math.round(min + Math.random() * (max - min));
}

function checkLen(string, possibleLen){
  return possibleLen >= string.length;
}

export {getRand, checkLen};
