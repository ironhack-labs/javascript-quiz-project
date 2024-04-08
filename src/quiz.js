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
    for (let i = 0; i < this.questions.length; i++) {
      let randomIndex = Math.floor(Math.random() * this.questions.length);
      let temp = this.questions[i];
      this.questions[i] = this.questions[randomIndex];
      this.questions[randomIndex] = temp;
    }
    return this.questions;
  }

  checkAnswer(answer) {
    if (answer === this.getQuestion().answer) {
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
    if (difficulty >= 1 || difficulty <= 3) {
      this.questions = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
    }
  }

  averageDifficulty() {
    const sumDifficulty = this.questions.reduce((acc, curr) => {
      return acc + curr.difficulty;
    }, 0);
    return sumDifficulty / this.questions.length;
  }
}
