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

  filterQuestionsByDifficulty(difficulty) {
    if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
      return;
    }
    let filteredQuestions = this.questions.filter((question) => {
      return filteredQuestions.difficulty === difficulty;
    });
  }

  averageDifficulty() {
    let sum = this.questions.reduce((acc, question) => {
      return acc + question.difficulty;
    }, 0);
return sum/this.questions.length;
  }

}
