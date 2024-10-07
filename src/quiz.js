class Quiz {
  constructor(questions, duration) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
    this.timeRemaining = duration;
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

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  checkAnswer(selectedAnswer) {
    if (selectedAnswer === this.getCurrentQuestion().answer) {
      this.correctAnswers++;
    }
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}
