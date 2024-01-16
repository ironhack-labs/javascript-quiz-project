class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text; // should be a string
    this.choices = choices; // newArray of strings [1,2,3,4]
    this.answer = answer; // string
    this.difficulty = difficulty; // number between 1 and 3 (1 being the easiest)
  }

  shuffleChoices() {
    let shuffledChoices = [];
    while (this.choices.length) {
      const random = Math.floor(Math.random()*this.choices.length);
      shuffledChoices.push(this.choices.splice(random, 1)[0]);
    } 
    this.choices = shuffledChoices 
    return shuffledChoices;
  }
}
    
    
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

/*
const originalArr = [1,2,3,4];
const shuffled = []


OPTION 1

for (let i_=0; i < orginalArr.length; i++){
  const random = Math.floor(Math.random)*originalArr.length);
  shuffled.push(originalArr.splice(random, 1)[0]);
  i--;
}


OPTION 2

for (let i_= originalArr.lenght -1; i >=0; i--){
  const random = Math.floor(Math.random)*originalArr.length);
  shuffled.push(originalArr.splice(random, 1)[0]);
}

OPTION 3


while (originalArr.lenght) {
  const random = Math.floor(Math.random)*originalArr.length);
  shuffled.push(originalArr.splice(random, 1)[0]);
}




for (let i_= originalArr.lenght -1; i >=0; i--){
  const random = Math.floor(Math.random)*originalArr.length);
  shuffled.push(originalArr.splice(random, 1)[0]);
console.log(originalArr);
console.log(shuffled;)

OPTION 4

const newShuffled = originalArr
.map((e)) =>({e, random: Math.randdom()})
.sort ((a,b) => a.random -b.random)
.map (({e}) => e)*/