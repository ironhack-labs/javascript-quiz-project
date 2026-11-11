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
    this.currentQuestionIndex += this.currentQuestionIndex + 1;
  }

  // 4. shuffleQuestions()

  shuffleQuestions() {
    this.questions.reverse();
  }

  // 5. checkAnswer(answer)

  checkAnswer(answer) {
    if (this.getQuestion().answer === answer) {
      this.correctAnswers += 1;
    }
  }

  // 6. hasEnded()
  hasEnded() {
    return this.currentQuestionIndex < this.questions.length ? false : true;
  }

  // 7. filterQuestionsByDifficulty(difficulty)
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      this.questions = this.questions.filter(
        (question) => question.difficulty === difficulty,
      );
    }
  }

  //8. averageDifficulty()
  averageDifficulty() {
    return (
      this.questions.reduce((sum, question) => question.difficulty + sum, 0) /
      this.questions.length
    );
  }
}
