// day 1
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
    if (this.currentQuestionIndex <= this.questions.length - 1) {
      this.currentQuestionIndex += 1;
    }
  }
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = this.questions[i];
      this.questions[i] = this.questions[randomIndex];
      this.questions[randomIndex] = temp;
    }
  }

  checkAnswer(answer) {
    if (this.getQuestion().answer === answer) {
      this.correctAnswers += 1;
      return true;
    }
    return false;
  }

  hasEnded() {
    console.log(this.currentQuestionIndex, this.questions.length);
    return this.currentQuestionIndex === this.questions.length;
  }
  // day 2
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty === 1 || difficulty === 2 || difficulty === 3) {
      this.questions = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
    }
  }
  averageDifficulty() {
    const total = this.questions.reduce((sum, questions) => {
      return sum + questions.difficulty;
    }, 0);
    return total / this.questions.length;
  }
}
