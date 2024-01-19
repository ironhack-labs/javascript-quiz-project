class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  shuffleChoices() {
    for (let i = 0; i < this.choices.length; i++) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = this.choices[i];
      this.choices[i] = this.choices[randomIndex];
      this.choices[randomIndex] = temp;
    }
}

}

const testChoices = ["choice1", "choice2", "choice3"];

// Instantiate a new Question object with the test choices array
const question = new Question("test", testChoices, "test");

// console.log(question.shuffleChoices());
