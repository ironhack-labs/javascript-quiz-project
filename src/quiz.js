// YOUR CODE HERE:
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
    this.questions.sort(() => {
      return Math.random() - 0.5;
    });
  }

  checkAnswer(answer) {
    if (this.questions[this.currentQuestionIndex].answer === answer)
      this.correctAnswers++;
  }

  hasEnded() {
    if (this.questions.length > this.currentQuestionIndex) return false;
    else return true;
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3 && typeof difficulty === "number")
      this.questions = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
  }

  averageDifficulty() {
    if (this.questions.length)
      return (
        this.questions.reduce((acc, curr) => acc + curr.difficulty, 0) /
        this.questions.length
      );
  }
}
