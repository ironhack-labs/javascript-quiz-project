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
      let randomIndex = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[randomIndex]] = [
        this.questions[randomIndex],
        this.questions[i],
      ];
    }
  }
  checkAnswer(answer) {
    let theQuestion = this.questions[this.currentQuestionIndex].answer;

    if (answer === theQuestion) {
      this.correctAnswers++;
    }
  }
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if ((this.currentQuestionIndex = this.questions.length)) {
      return true;
    }
  }
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3 && Number.isInteger(difficulty)) {
      const filterDifficulty = this.questions.filter((question) => {
        return question.difficulty === difficulty;
      });
      this.questions = filterDifficulty;
    }
  }
  averageDifficulty() {
    let total = this.questions.reduce((acc, question) => {
      return acc + question.difficulty;
    }, 0);
    return total / this.questions.length;
  }
}
