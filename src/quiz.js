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
    this.questions.sort(() => Math.random() - 0.5);
  }

  checkAnswer(answer) {
    const question = this.getQuestion()
    const correctAnswers = question.answer === answer
    if (correctAnswers) {
      this.correctAnswers++
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex == this.questions.length) {
      return true;
    }
  }
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty < 1 || difficulty > 3 || typeof difficulty !== "number") {
      return;
    }
    const filteredQuestions = this.questions.filter((question) => {
      return question.difficulty === difficulty;
    });
    this.questions = filteredQuestions;

    return this.questions;
  }
  averageDifficulty() {
    // const sum = questions.reduce((question, number) => {
    //   if (number.difficulty != 0) {
    //     return question + number.difficulty / this.questions.length;
    //   }
    // }, 0);
    // return sum;

    const sum = this.questions.reduce((total, question) => {
      const newTotal = total + question.difficulty;

      return newTotal;
    }, 0);
    return sum / this.questions.length;
  }
}
