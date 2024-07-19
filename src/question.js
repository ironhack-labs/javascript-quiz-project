class Question {
  // YOUR CODE HERE:
  //
  // 1. constructor (text, choices, answer, difficulty)

  // 2. shuffleChoices()
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  shuffleChoices() {
    const choices = this.choices;
    for (let i = choices.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * choices.length);
      const temp = choices[i];
      choices[i] = choices[j];
      choices[j] = temp;
    }
    return choices;
  }
}
