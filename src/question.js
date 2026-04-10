class Question {
  // 1. constructor (text, choices, answer, difficulty)
  constructor(text, choices, correctAnswer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.correctAnswer = correctAnswer;
    this.difficulty = difficulty;
  }

  // 2. shuffleChoices()
  shuffleChoices() {
    for (let i = this.choices.length - 1; i > 0; i--) {
      const randomQuestions = Math.floor(Math.random() * (i + 1));
      const temp = this.choices[i];
      this.choices[i] = this.choices[randomQuestions];
      this.choices[randomQuestions] = temp;
    }
  }
}
