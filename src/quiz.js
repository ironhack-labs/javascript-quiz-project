class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions; // array
    this.timeLimit = timeLimit; // number
    this.timeRemaining = timeRemaining; // number
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
    let shuffledQuestions = [];
    while (this.questions.length) {
      const randomIndex = Math.floor(Math.random() * this.questions.length);
      shuffledQuestions.push(this.questions.splice(randomIndex, 1)[0]);
    }
    this.questions = shuffledQuestions;
    return shuffledQuestions;
  }

  checkAnswer(answer) {
    if (answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    }
    return true;
  }
}

/// DAY 2

// filterQuestionsByDifficulty() {
//   this.questions.filter; //??
// }

// averageDifficulty() {
//   return this.questions.reduce() / this.questions.length;
// }
