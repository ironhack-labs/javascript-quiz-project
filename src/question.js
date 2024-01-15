class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  shuffleChoices() {
    const newChoices = this.choices.slice();
    for (let i = this.choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.choices[i];
      newChoices[i] = this.choices[j];
      newChoices[j] = temp;
    }
    this.choices = newChoices;
    return this.choices;
  }
}

const testChoices = ["choice1", "choice2", "choice3"];

// Instantiate a new Question object with the test choices array
const question = new Question("test", testChoices, "test");

console.log(question.shuffleChoices());
