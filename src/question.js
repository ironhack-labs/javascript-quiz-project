class Question {
  // YOUR CODE HERE:
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;

    if (difficulty <= 3 && difficulty >= 1) {
      this.difficulty = difficulty;
    } else {
      this.difficulty = 1;
    }

    // 1 - 3
  }

  shuffleChoices() {
    for (let i = this.choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      const _element = this.choices[j];

      this.choices[j] = this.choices[i];
      this.choices[i] = _element;
    }
  }
}
