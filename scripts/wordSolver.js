function newWord(str){
  var strArray = str.split('');
  var newWord = '';

  while (strArray.length > 0) {
    newWord += strArray.splice(Math.round(strArray.length * Math.random()), 1);
  }
  return newWord;
}

function fact(val){
  if (val <  1) return 0;

  var result = val;
  for (i = val-1; i > 0; i-=1 ){
    val = val * i;
  }
  return val;
}

function totalDistinctPerms(str){
  if (!str || str.length === 0) return 0;

  var counts = {};
  var i;

  var strArray = str.split('');
  strArray.forEach(function(c){
    if (!counts[c]){
      counts[c] = 1;
    } else {
      var v = counts[c]; 
      counts[c] = v + 1;
    }
  });
  //return counts;
  var denom = 1;
  for (k in counts) {denom *= fact(counts[k]);}
  return fact(str.length)/denom;
}

function allPermutations(str){
  var newStrings = {};
  var keyCount = 0;
 
  if (!str || str.length === 0) return newStrings;
  
  var possibleStrings = totalDistinctPerms(str);

  while (keyCount < possibleStrings) {
    var s = newWord(str);
    if (!newStrings[s]){ newStrings[s] = s;
      keyCount += 1;
      if (keyCount % 1000 === 0) console.log('generated '+ keyCount + ' new strings. Still working....');
    }
  } 
  return newStrings;
}

function lookup(str){
  // var childProcess = require('child_process');
  try {
    if (!dictArr) console.log('no dictArr!');
  } catch (myErr) {
    dictArr = require('fs').readFileSync('/usr/share/dict/words').toString().split('\n');
    console.log('dictArr initialized. Size: ' + dictArr.length);
  }
  //var searchStr = 'grep ^' + str.toLowerCase() + '$ /usr/share/dict/words';
  //try {
  //  return childProcess.execSync(searchStr).toString().trim();
  //} catch(myErr) {
  if (dictArr.indexOf(str.toLowerCase()) > -1) return dictArr[dictArr.indexOf(str.toLowerCase())];
  return undefined;
  //  }
}

function solveWord(str){
  var tried = {};
  var numTried = 0;
  var totalPossible = totalDistinctPerms(str);
  var newString;
  var foundWord;
  
  foundWord = lookup(str);
  if (foundWord) {
    console.log(str + ' is ' + foundWord + '!');
    return;
  }

  while (numTried < totalPossible) {
    newString = newWord(str);
    foundWord = lookup(newString);
    if (foundWord) {
      console.log('after ' + numTried + ' tries, found that ' +  str + ' is ' + foundWord);
      return;
    } 
    if (!tried[newString]){ tried[newString] = newString;
      numTried += 1;
      if (numTried % 1000 === 0) console.log('tried '+ numTried + ' permutations. Still working....');
    }
  }
  console.log('guess ' + str + ' is not a word!');
}

exports.newWord = newWord;
exports.fact = fact;
exports.allPermutations = allPermutations;
exports.totalDistinctPerms = totalDistinctPerms;
exports.lookup = lookup;
exports.solveWord = solveWord;
