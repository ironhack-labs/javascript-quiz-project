class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  getQuestion() {
    let question = this.questions.find(
      (_, index) => index == this.currentQuestionIndex
    );
    return question;
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    this.questions.sort(() => Math.random() - 0.5);
  }

  checkAnswer(answer) {
    if (answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    // if (difficulty <= 1 || difficulty > 3 || typeof difficulty !== "number") {
    //   console.error("Invalid number");
    //   return;
    // }
    // this.questions = this.questions.filter((question) => {
    //   return question.difficulty === difficulty;
    // });
    if (typeof difficulty === "number" && difficulty >= 1 && difficulty <= 3) {
      this.questions = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
    }
  }
  averageDifficulty() {
    const avgDifficulty = this.questions.reduce(
      (acc, next) => acc + next.difficulty,
      0
    );
    return avgDifficulty / this.questions.length;
  }
  //comment
}
