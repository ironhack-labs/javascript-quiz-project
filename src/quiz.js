class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.score = 0; // ← renamed from correctAnswers
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
    const currentQuestion = this.questions[this.currentQuestionIndex];
    console.log("Respuesta seleccionada:", answer);
    console.log("Respuesta correcta:", currentQuestion.correctAnswer);
    console.log("¿Son iguales?", answer === currentQuestion.correctAnswer);
    if (answer === currentQuestion.correctAnswer) {
      this.score++;
    }
  }

  hasEnded() {
    return this.currentQuestionIndex === this.questions.length;
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      this.questions = this.questions.filter(
        (q) => q.difficulty === difficulty,
      );
    }
  }

  averageDifficulty() {
    return (
      this.questions.reduce((sum, q) => sum + q.difficulty, 0) /
      this.questions.length
    );
  }
}
