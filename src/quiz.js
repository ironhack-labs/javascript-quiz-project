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
    return this.currentQuestionIndex++;
  }

  // 4. shuffleQuestions()
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      let randomQuestion = this.questions[i];
      this.questions[i] = this.questions[j];
      this.questions[j] = randomQuestion;
    }
  }
  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    if (this.questions[this.currentQuestionIndex].answer === answer) {
      return this.correctAnswers++;
    }
  }
  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex === this.questions.length) {
      return true;
    } else if (this.currentQuestionIndex < this.questions.length) {
      return false;
    }
  }
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty === 0 || difficulty >= 4 || typeof difficulty === "string") {
      return this.questions;
    }
    this.questions = this.questions.filter(
      (question) => question.difficulty === difficulty
    );
    return this.questions;
    /*const filteredDiff = this.questions.filter(
      (difficulty) => this.difficulty < 3
    );*/
  }
  averageDifficulty() {
    const totalDifficulty = this.questions.reduce(
      (accumulator, question) => (accumulator += question.difficulty),
      0
    );
    return totalDifficulty / this.questions.length;
  }
}
