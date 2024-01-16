class Quiz {
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
    this.currentQuestionIndex += 1;
  }

  shuffleQuestions() {
    const newQuestions = this.questions.slice();
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.questions[i];
      newQuestions[i] = this.questions[j];
      newQuestions[j] = temp;
    }
    this.questions = newQuestions;
    return this.questions;
  }

  checkAnswer(answer) {
    let currentQuestion = this.questions[this.currentQuestionIndex];
    if (currentQuestion.answer === answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    let hasEnded = false;
    if (this.currentQuestionIndex === this.questions.length) {
      hasEnded = true;
    }
    return hasEnded;
  }
}

/* hasEnded() {
    return this.currentQuestionIndex === this.questions.length;
}
} */
