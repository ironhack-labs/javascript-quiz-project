class Quiz {
  // YOUR CODE HERE:
  //
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
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const _element = this.questions[j];
      this.questions[j] = this.questions[i];
      this.questions[i] = _element;
    }
  }

  checkAnswer(answer) {
    if (this.getQuestion().answer === answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    return this.currentQuestionIndex === this.questions.length;
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty < 1 || 3 < difficulty) return this.questions;

    if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
      return this.questions;
    }

    let result = this.questions.filter((elem) => {
      return elem.difficulty === difficulty;
    });

    this.questions = result;
    return result;
  }

  averageDifficulty() {
    let answer = this.questions.reduce(
      (accumulator, currentValue) => accumulator + currentValue.difficulty,
      0
    );

    return answer / this.questions.length;
  }
}
