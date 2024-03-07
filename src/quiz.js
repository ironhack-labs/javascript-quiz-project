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
    let i = 0;
    let temp = "";

    while (i < this.questions.length) {
      let random = Math.floor(Math.random() * this.questions.length);
      let randomNum = this.questions[random];
      temp = this.questions[i];
      this.questions[i] = randomNum;
      this.questions[random] = temp;
      i++;
    }
    return this.questions;
  }

  checkAnswer(answer) {
    if (this.getQuestion().answer === answer) {
      this.correctAnswers++;
    }
    console.log(this.getQuestion());
    console.log(answer);
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty <= 3 && difficulty >= 1) {
      this.questions = this.questions.filter(
        (n) => n.difficulty === difficulty
      );
    }
  }

  averageDifficulty() {
    const sum = this.questions.reduce((acc, val) => acc + val.difficulty, 0);
    const avg = sum / this.questions.length;
    return avg;
  }
}
