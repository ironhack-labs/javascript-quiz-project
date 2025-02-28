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
    this.currentQuestionIndex += 1;
  }

  shuffleQuestions() {
    const shuffledQuestions = this.questions.sort(
      (a, b) => 0.5 - Math.random()
    );
    return shuffledQuestions;
  }
  checkAnswer(answer) {
    if (answer === this.questions[this.currentQuestionIndex].answer) {
      this.correctAnswers += 1;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    // difficulty between 1 - 3
    if (difficulty > 0 && difficulty <= 3) {
      const filteredQuestions = this.questions.filter((oneQuestion) => {
        if (oneQuestion.difficulty === difficulty) {
          return true;
        } else {
          return false;
        }
      });
      this.questions = filteredQuestions;
    } else {
      return false;
    }
  }
  averageDifficulty() {
    const difficultySum = this.questions.reduce((acc, current) => {
      return acc + current.difficulty;
    }, 0);
    return difficultySum / this.questions.length;
  }
}
