class Question {
  // YOUR CODE HERE:
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  shuffleChoices() {
    return this.choices.sort((a, b) => 0.5 - Math.random()); //['choice 2', 'choice 1', 'choice 3']
  }
}
