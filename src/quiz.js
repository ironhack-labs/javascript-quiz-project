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
    return this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    this.questions.sort(() => Math.random() - 0.5);
  }

  checkAnswer(answer) {
    if (answer === this.questions[this.currentQuestionIndex].answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) return true;
  }

  filterQuestionsByDifficulty(difficulty) {
    
  if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
    return 0;
  }
  this.questions = this.questions.filter((questions) => {
    return questions.difficulty === difficulty;
  });
}
  averageDifficulty() {
    const totDifficulty = this.questions.reduce((sum, obj) => {
      return sum + obj.difficulty;
    }, 0);
    const avg = totDifficulty / this.questions.length;
    return avg 
  }
}

