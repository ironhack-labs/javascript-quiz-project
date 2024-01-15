class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text; // should be a string
    this.choices = choices; // array of strings [1,2,3,4]
    this.answer = answer; // string
    this.difficulty = difficulty; // number between 1 and 3 (1 being the easiest)
  }

  shuffleChoices() {
    let currentArray = this.choices; //spread operator would be better!
    let shuffledArray = [currentArray[0]];

    for (let i = 0; i < currentArray.length; i++) {
      if (!shuffledArray.includes(currentArray[i])) {
        shuffledArray.push(
          currentArray[Math.floor(Math.random() * currentArray.length)]
        );
      }
    }
    shuffledArray = this.choices;
    return this.choices;
  }
}
