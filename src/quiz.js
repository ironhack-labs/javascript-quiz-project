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
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestionIndex++;
    }
  }
  // 4. shuffleQuestions()
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      var temp = this.questions[i];
      this.questions[i] = this.questions[j];
      this.questions[j] = temp;
    }
  }

  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    const currentQuestion = this.getQuestion();
    if (currentQuestion.answer === answer) {
      this.correctAnswers++;
    }
  }

  // 6. hasEnded()
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty < 1 || difficulty > 3 || typeof difficulty !== "number") {
      return;
    }

    this.questions = this.questions.filter(
      (question) => question.difficulty === difficulty
    );
  }

  averageDifficulty() {
    if (this.questions.length === 0) {
      return 0;
    }

    const totalDifficulty = this.questions.reduce(
      (sum, question) => sum + question.difficulty,
      0
    );
    return totalDifficulty / this.questions.length;
  }
}
