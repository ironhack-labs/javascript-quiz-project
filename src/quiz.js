class Quiz {
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
    this.currentQuestionIndex += 1;
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
    if (answer === currentQuestion.answer) {
      this.correctAnswers += 1;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
    return false;
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty !== 1 && difficulty !== 2 && difficulty !== 3) {
      return this.questions;
    }
    this.questions = this.questions.filter(function (question) {
      return question.difficulty === difficulty;
    });
    return this.questions;
  }

  averageDifficulty() {
    const totDifficulty = this.questions.reduce(function (
      accumulator,
      question
    ) {
      return accumulator + question.difficulty;
    },
    0);
    const avgDifficulty = totDifficulty / this.questions.length;

    return avgDifficulty;
  }
}
