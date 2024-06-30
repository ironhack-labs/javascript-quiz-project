class Question {
  // YOUR CODE HERE:
  //
  // 1. constructor (text, choices, answer, difficulty)
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  // 2. shuffleChoices()
  shuffleChoices() {
    // this.randomQuestion = this.choices[Math.floor(Math.random * this.choices.length)];
    for (let i = this.choices.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
    }
  }
}

// shorter solution for smaller range for shuffleChoices()
// this.choice.sort(() => Math.random() - 0.5)
