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
    // this.currentQuestionIndex = this.currentQuestionIndex + 1;
    // this.currentQuestionIndex += 1;
    this.currentQuestionIndex++;
  }
  shuffleQuestions() {
    const shuffled = [];
    while (this.questions.length) {
      const random = Math.floor(Math.random() * this.questions.length);
      shuffled.push(this.questions.splice(random, 1)[0]);
    }
    this.questions = shuffled;
  }
  checkAnswer(answer) {
    if (answer) {
      this.correctAnswers++;
    }
    // if (this.getQuestion().answer === answer) {
    //   this.correctAnswers++;
    // }
  }

  hasEnded() {
    // if (this.currentQuestionIndex < this.questions.length) {
    //   return false;
    // }
    // return true;
    return this.currentQuestionIndex === this.questions.length;
  }

  filterQuestionsByDifficulty(difficulty) {
    let newArr = [];
    if (difficulty >= 1 || difficulty <= 3) {
      newArr = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
    } else {
      newArr = this.questions;
    }
    return newArr;
  }

  averageDifficulty() {
    const totalDifficulty = this.questions.reduce(
      (acc, curr) => acc + curr.difficulty,
      0
    );
    const avg = totalDifficulty / this.questions.length;
    return avg;
    // return this.questions.reduce((acc, curr) => acc + curr.difficulty, 0) / this.questions.length;
  }
}
