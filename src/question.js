class Question {
  // YOUR CODE HERE:

  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  shuffleChoices() {
    for (let i = 0; i < this.choices.length; i++) {
      const curentChoice = this.choices[i];
      const randomIndex = Math.floor(Math.random() * this.choices.length);
      this.choices.splice(i, 1);
      this.choices.splice(randomIndex, 0, curentChoice);
    }
  }
}
