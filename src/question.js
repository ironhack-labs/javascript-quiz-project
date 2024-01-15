class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text; // should be a string
    this.choices = choices; // newArray of strings [1,2,3,4]
    this.answer = answer; // string
    this.difficulty = difficulty; // number between 1 and 3 (1 being the easiest)
  }

  shuffleChoices() {
//     let currentArray = this.choices; //spread operator would be better!
//     let shuffledArray = [currentArray[0]];

//     for (let i = 0; i < currentArray.length; i++) {
//         let randomIndex = Math.floor(Math.random() * currentArray.length);

//       if (!shuffledArray.includes(currentArray[randomIndex])) {
//         shuffledArray.push(
//           currentArray[randomIndex]
//         );
//       }
//     }
    
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
