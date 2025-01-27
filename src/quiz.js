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
    for (let i = this.questions.length - 1; i > 0; i--) {
      // Generate a random index between 0 and currentQuestionIndex
      const randomIndex = Math.floor(Math.random() * (i + 1));
      // Swap elements at index i and randomIndex
      [this.questions[i], this.questions[randomIndex]] = [
        this.questions[randomIndex],
        this.questions[i],
      ];
    }
    return this.questions;
  }

  checkAnswer(answer) {
    return this.correctAnswers++;
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if ((this.currentQuestionIndex = this.questions.length)) {
      return true;
    }
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
    const totalDifficulty = this.questions.reduce(
      (acc, currentValue) => acc + currentValue.difficulty,
      0
    );
    return totalDifficulty / this.questions.length;
  }

  getCorrectAnswersCount() {
    return this.correctAnswers || 0; // Return the correctAnswers property
  }
}
