class Question {
  // 1. constructor (text, choices, answer, difficulty)
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices; // array
    this.answer = answer;
    this.difficulty = difficulty; // number between 1 and 3
  }
  // 2. shuffleChoices()
  shuffleChoices() {
    // this.choices.sort(() => Math.random() - 0.5);
    for (let i = this.choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
    }
  }
}
