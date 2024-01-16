class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = [...questions];
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
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
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }

  checkAnswer(answer) {
    const currentQuestion = this.getQuestion();
    if (currentQuestion && currentQuestion.answer === answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    return this.currentQuestionIndex === this.questions.length;
  }
  filterQuestionsByDifficulty(difficulty) {
    if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
      console.error(
        "Invalid difficulty. Please provide a number between 1 and 3."
      );
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
    const totalDifficulty = this.questions.reduce((sum, question) => {
      return sum + question.difficulty;
    }, 0);
    const averageDifficulty = totalDifficulty / this.questions.length;
    return averageDifficulty;
  }
}
