class Quiz {
  // YOUR CODE HERE:
  //
  // 1. constructor (questions, timeLimit, timeRemaining)
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }
  // 2. getQuestion()
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  // 3. moveToNextQuestion()
  moveToNextQuestion() {
    this.currentQuestionIndex += 1;
  }
  // 4. shuffleQuestions()
  shuffleQuestions() {
    this.questions.sort(() => 0.5 - Math.random());
  }
  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    if (answer === this.questions[this.currentQuestionIndex].answer)
      this.correctAnswers += 1;
  }
  // 6. hasEnded()
  hasEnded() {
    return this.currentQuestionIndex < this.questions.length ? false : true;
  }

  // Day 2
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      this.questions = this.questions.filter(
        (value) => value.difficulty === difficulty
      );
    }
  }

  averageDifficulty() {
    return (
      this.questions.reduce(
        (total, elements) => total + elements.difficulty,
        0
      ) / this.questions.length
    );
  }
}
