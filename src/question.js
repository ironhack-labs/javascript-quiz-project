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
    let currentElement;
    for (let i = this.choices.length - 1; i > 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      currentElement = this.choices[i];
      this.choices[i] = this.choices[rand];
      this.choices[rand] = currentElement;
    }
    return this.choices;
  }
}
