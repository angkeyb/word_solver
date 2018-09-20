function newWord (str) {
  const strArray = str.split('');
  var newWord = [];

  while (strArray.length > 0) {
    newWord = [...newWord, strArray.splice(Math.round(strArray.length * Math.random()), 1)];
  }
  return newWord.join('');
}

function fact (n) {
  function fact (n, acc) {
    if (n < 2) {
      return acc;
    } else {
      return fact(n - 1, n * acc);
    }
  }

  return fact(n, 1);
}

function totalDistinctPerms (str) {
  if (!str || str.length === 0) return 0;

  var counts = {};
  var i;

  var strArray = str.split('');
  strArray.forEach(function (c) {
    if (!counts[c]) {
      counts[c] = 1;
    } else {
      var v = counts[c];
      counts[c] = v + 1;
    }
  });
  //return counts;
  var denom = 1;
  for (k in counts) {denom *= fact(counts[k]);}
  return fact(str.length) / denom;
}

function allPermutations (str) {
  var newStrings = {};
  var keyCount = 0;

  if (!str || str.length === 0) return newStrings;

  const possibleStrings = totalDistinctPerms(str);

  while (keyCount < possibleStrings) {
    var s = newWord(str);
    if (!newStrings[s]) {
      newStrings[s] = s;
      keyCount += 1;
      if (keyCount % 1000 === 0) console.log('generated ' + keyCount + ' new strings. Still working....');
    }
  }
  return newStrings;
}

function lookup (str) {
  try {
    if (!dictArr) console.log('no dictArr!');
  } catch (myErr) {
    dictArr = new Set(require('fs').readFileSync('/usr/share/dict/words').toString().split('\n'));
    console.log('dictArr initialized. Size: ' + dictArr.size);
  }

  if (dictArr.has(str.toLowerCase())) return str.toLowerCase();
  return undefined;
  //  }
}

function solveWord (str) {
  console.log(`string to be solved is '${str}'`);
  var tried = new Set();
  var numTried = 0;
  var newString;
  var foundWord;

  foundWord = lookup(str);
  if (foundWord) {
    console.log(`'${str}' is '${foundWord}'!`);
    return;
  }

  while (numTried < totalDistinctPerms(str)) {
    newString = newWord(str);
    if (!tried.has(newString)) {
      foundWord = lookup(newString);
      if (foundWord) {
        console.log(`after ${numTried} tries, found that '${str}' is '${foundWord}'`);
        return;
      }
      tried.add(newString);
      numTried += 1;
      if (numTried % 1000 === 0) console.log(`tried ${numTried} permutations. Still working....`);
    }
  }
  console.log('guess ' + str + ' is not a word!');
}

exports.newWord = newWord;
exports.scrambleWord = newWord;
exports.fact = fact;
exports.allPermutations = allPermutations;
exports.totalDistinctPerms = totalDistinctPerms;
exports.lookup = lookup;
exports.solveWord = solveWord;
