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
    for (let i = this.choices.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      this.choices.push(this.choices[randomIndex]);
      this.choices.splice(randomIndex, 1);
    }
    return this.choices;
  }
}
