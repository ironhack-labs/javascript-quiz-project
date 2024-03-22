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
    const randomQuestion = this.questions.sort((a, b) => 0.5 - Math.random());
  }
  checkAnswer(answer) {
    const currentQuestion = this.getQuestion();
    if (currentQuestion.answer === answer) {
      this.correctAnswers += 1;
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
    if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
      return;
    }
    this.questions = this.questions.filter((currentQuestion) => {
      return currentQuestion.difficulty === difficulty;
    });
  }
  averageDifficulty() {
    const difficultySum = this.questions.reduce(
      (accumulator, currentQuestion) => {
        return accumulator + currentQuestion.difficulty;
      },
      0
    );
    return difficultySum / this.questions.length;
  }
}