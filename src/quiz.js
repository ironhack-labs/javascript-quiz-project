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
    return this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    this.questions.reverse();
  }

  checkAnswer(answer) {
    if (answer) {
      this.correctAnswers++;
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
    if (difficulty >= 1 && difficulty <= 3) {
      this.questions = this.questions.filter(
        (item) => item.difficulty === difficulty
      );
    }
  }
  averageDifficulty() {
    return (
      this.questions.reduce((element, item) => element + item.difficulty, 0) /
      this.questions.length
    );
  }
}
