class Quiz {
  // 1. constructor (questions, timeLimit, timeRemaining)
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions; // arr
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
    this.currentQuestionIndex++;
  }
  // 4. shuffleQuestions()
  shuffleQuestions() {
    this.questions.sort(() => Math.random() - 0.5);
    // for (let i = this.questions.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [this.questions[i], this.questions[j]] = [
    //     this.questions[j],
    //     this.questions[i],
    //   ];
    // }
  }
  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    const currentQuestion = this.getQuestion();
    if (answer === currentQuestion.answer) {
      this.correctAnswers++;
      return true;
    }
    return false;
  }
  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else {
      return true;
    }
    // } else if (this.currentQuestionIndex = this.questions.length) {
    //   return true;
    // }
  }
  // Day-2

  // 7. Filter by difficulty
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty <= 3 && difficulty >= 1) {
      this.questions = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
    }
  }

  // 8. Get the average difficulty
  averageDifficulty() {
    return (
      this.questions.reduce((acc, question) => acc + question.difficulty, 0) /
      this.questions.length
    );
  }
}
