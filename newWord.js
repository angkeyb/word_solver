function newWord(str){
  var strArray = str.split('');
  var newWord = '';

  while (strArray.length > 0) {
    newWord += strArray.splice(Math.round(strArray.length * Math.random()), 1);
  }
  return newWord;
}
