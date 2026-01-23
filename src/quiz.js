class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;

  }

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[randomIndex]] =
        [this.questions[randomIndex], this.questions[i]];
    }
  }

checkAnswer(answer) {
  if (this.getQuestion().answer === answer) {
    this.correctAnswers++;
  }
}

  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }

  filterQuestionsByDifficulty(difficulty) {
  if (difficulty < 1 || difficulty > 3 || typeof difficulty !== "number") {
    return; // do nothing if invalid
  }

  this.questions = this.questions.filter(question => {
    return question.difficulty === difficulty;
  });
}

averageDifficulty() {
  if (this.questions.length === 0) return 0;

  const totalDifficulty = this.questions.reduce((sum, question) => {
    return sum + question.difficulty;
  }, 0);

  return totalDifficulty / this.questions.length;
}


}
