class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty; //Note: The difficulty will be a number between 1 and 3, with 1 being the easiest and 3 being the hardest.
  }

  shuffleChoices() {
    //Fisher-Yates Shuffle Algorithm
    for (let i = this.choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.choices[i];
      this.choices[i] = this.choices[j];
      this.choices[j] = temp;
    }

    // console.log(this.choices);
  }
}

// const question1 = new Question(
//   "some text",
//   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   "more text"
// );
// question1.shuffleChoices();
