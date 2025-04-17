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
    const question = this.getQuestion();
    const isCorrectAnswer = question.answer === answer;
    if (isCorrectAnswer) {
      ++this.correctAnswers;
    }
  }

  hasEnded() {
    return this.currentQuestionIndex === this.questions.length;
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty <= 3 && difficulty >= 1) {
      this.questions = this.questions.filter(function (question) {
        if (question.difficulty === difficulty) return question.difficulty;
      });
    }
  }

  averageDifficulty() {
    const sumOfDifficulty = this.questions.reduce(function (
      subtotal,
      question
    ) {
      return subtotal + question.difficulty;
    },
    0);
    return sumOfDifficulty / this.questions.length;
  }
}
