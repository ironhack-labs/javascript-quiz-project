class Quiz {
  // YOUR CODE HERE:

  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
  }

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    this.questions.sort(() => Math.random() - 0.5);
  }

  checkAnswer(answer) {
    const currentQuestion = this.getQuestion();
    if (answer === currentQuestion.answer) {
      this.correctAnswers += 1;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty !== 1 && difficulty !== 2 && difficulty !== 3) {
      return;
    } else {
      this.questions = this.questions.filter((e) => {
        return e.difficulty === difficulty;
      });
    }
  }
  averageDifficulty() {
    const difficulty = this.questions.reduce((acc, question) => {
      const sum = acc + question.difficulty;
      return sum;
    }, 0);
    return difficulty / this.questions.length;
  }
}
