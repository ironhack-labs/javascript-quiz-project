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
    return this.choices.sort(() => Math.random() - 0.5);
  }
}

const testChoices = ["choice1", "choice2", "choice3"];

// Instantiate a new Question object with the test choices array
const question = new Question("test", testChoices, "test");

console.log(question.shuffleChoices());
