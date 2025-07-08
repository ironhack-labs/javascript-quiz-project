class Question {
  // 1. constructor (text, choices, answer, difficulty)
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  // 2. shuffleChoices()
  shuffleChoices() {
    for (let i = this.choices.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * this.choices.length);
      [this.choices[i], this.choices[random]] = [
        this.choices[random],
        this.choices[i],
      ];
    }
    return this.choices;
  }
}

// const question1 = new Question("11", [1, 2, 3, 4, 5], "123", 1);
// console.log(question1.shuffleChoices());
