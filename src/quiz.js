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
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    this.questions.sort((a, b) => 0.5 - Math.random());
  }

  checkAnswer(answer) {
    if (answer === this.questions[this.currentQuestionIndex].answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    if (typeof difficulty === "number" && difficulty >= 1 && difficulty <= 3) {
      return (this.questions = this.questions.filter(
        (questions) => questions.difficulty == difficulty
      ));
    }
  }

  averageDifficulty() {
    const averageDif =
      this.questions.reduce(
        (acc, currentValue) => acc + currentValue.difficulty,
        0
      ) / this.questions.length;
    return averageDif;
  }
}
