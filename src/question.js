class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text; // should be a string
    this.choices = choices; // newArray of strings [1,2,3,4]
    this.answer = answer; // string
    this.difficulty = difficulty; // number between 1 and 3 (1 being the easiest)
  }

  shuffleChoices() {
let newArray = [...this.choices];
let currentIndex = newArray.length, temporaryValue, randomIndex;

while ( 0!== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex]
    newArray[randomIndex] = temporaryValue;
}
this.choices = newArray;
return this.choices;
    
//     return shuffledArray;
// //   }
// let currentArray = this.choices.slice(); // create a copy of the array

//     for (let i = currentArray.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [currentArray[i], currentArray[j]] = [currentArray[j], currentArray[i]];
//     }

//     return currentArray;
// }
// }
  }
}
