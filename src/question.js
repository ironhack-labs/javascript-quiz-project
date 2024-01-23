// We created a helper function to pick a random item from an array because we'll use it again later
// The below calculation should give us a randomized number between 0 and originalArray.length
function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
// Another helper function that shuffles an array:
function shuffleArray(array) {
  let shuffledArray = [];

  //Loop through the array.
  for (let i = 0; i < array.length; i++) {
    // Create a variable to store a randomly picked item from the originalArray.
    let randomItem = pickRandom(array);
    // This while loop means "as long as" the randomItem we just picked is already in the shuffledArray, we need to shuffle again.
    while (shuffledArray.includes(randomItem)) {
      randomItem = pickRandom(array);
    }
    //// Until it finds a new item, then we exit the while loop and push the non-repeat item to the shuffledArray
    shuffledArray.push(randomItem);
  }
  //Finally we return the newly shuffledArray into the original back into the original property --> this.choices
  return shuffledArray;
}

class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text; // should be a string
    this.choices = choices; // array of strings [1,2,3,4]
    this.answer = answer; // string
    this.difficulty = difficulty; // number between 1 and 3 (1 being the easiest)
  }

  shuffleChoices() {
    this.choices = shuffleArray(this.choices);
  }
}

// A single condition with if (!shuffledArray.includes(randomItem)) condition wouldn't work here because the newly shuffledArray might have less items
//because some items could be skipped according to our logic: the for loop ONLY loops through the originalArray limited times.
//const abcArr = ["a", "b", "c", "d", "e", "f"];
// const shuffledArray = ['c', 'b', 'a', 'e', , ];

//Another way to write the nexted while loop:
// let randomItem;
// do what's inside the loop while the condition is true --> pick a random item from originalArray while the randomItem is ALREADY in the originalArray
// do {
//   randomItem = pickRandom(originalArray);
// } while (shuffledArray.includes(randomItem));
