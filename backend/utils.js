const morseMapping = require("./morseMapping.js")


function convertToMorse(inputText="This is a test"){

let strIterator = inputText[Symbol.iterator]();
let strChar = strIterator.next();
let morseConversion = '';
let blankCount = 0;

while(!strChar.done){
  blankCount = strChar.value === ' ' && blankCount <= 0 ? ++blankCount : 0;
  morseConversion += (morseMapping[strChar.value] || '/') + ' ';
  strChar = strIterator.next();
}

return [morseConversion];
};


module.exports = {convertToMorse};