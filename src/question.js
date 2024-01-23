class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  shuffleChoices() {
    const shuffled = [];
    while (this.choices.length) {
      const random = Math.floor(Math.random() * this.choices.length);
      shuffled.push(this.choices.splice(random, 1)[0]);
    }
    this.choices = shuffled;
  }
}
