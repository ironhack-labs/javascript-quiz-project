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
    this.questions.sort(() => Math.random() - 1);
  }

  checkAnswer(answer) {
    if (!answer || this.currentQuestionIndex >= this.questions.length) return false;

    const isAnswerCorrect = answer === this.questions[this.currentQuestionIndex].answer;
    if (isAnswerCorrect) {
        this.correctAnswers++;
    }
    return isAnswerCorrect;
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
        (array) => array.difficulty === difficulty
      );
    }
  }

  averageDifficulty() {
    const totalDifficulty = this.questions.reduce(
      (acc, questionDifficulty) => acc + questionDifficulty.difficulty,
      0
    );
    return totalDifficulty / this.questions.length;
  }
}
