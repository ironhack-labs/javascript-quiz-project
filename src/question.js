class Question {
  // YOUR CODE HERE:
  //
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  shuffleChoices() {
    const shuffle = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };
    this.choices = shuffle(this.choices);
  }
}
