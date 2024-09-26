class Question {
  // YOUR CODE HERE:
  // 1. constructor (text, choices, answer, difficulty)
  //
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  shuffleChoices() {
    // shuffle choices
    let randomIndex = Math.floor(Math.random() * this.choices.length) + 1;

    for (let i = 0; i < this.choices.length; i++) {
      this.choices[i] = this.choices[randomIndex];
    }
  }

  // averageDifficulty() {}
}
