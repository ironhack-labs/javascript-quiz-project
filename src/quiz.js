class Quiz {
  // YOUR CODE HERE:
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex += 1;
    }
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.questions[i];
      this.questions[i] = this.questions[j];
      this.questions[j] = temp;
    }
  }

  checkAnswer(answer) {}

  // 6. hasEnded()
}

// let questions = [1, 2, 3, 4, 5];
// console.log(questions[1]);
