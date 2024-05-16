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
    return this.questions[this.currentQuestionIndex++];
  }

  shuffleQuestions() {
    const randomizedArr = [];
    let counter = this.questions.length;
    while (counter > 0) {
      let shuffledChoice =
        this.questions[Math.floor(Math.random() * this.questions.length)];
      if (!randomizedArr.includes(shuffledChoice)) {
        randomizedArr.push(shuffledChoice);
        counter -= 1;
      }
    }
    this.questions = randomizedArr;
    return this.questions;
  }

  checkAnswer(answer) {
    if (this.questions[this.currentQuestionIndex].answer === answer) {
      return this.correctAnswers++;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex === this.questions.length) {
      return true;
    } else {
      return false;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    this.questions = this.questions.filter((question) => {
      if (difficulty >= 1 && difficulty <= 3) {
        return question.difficulty === difficulty; // true
      } else {
        return this.questions;
      }
    });
    return this.questions;
  }

  averageDifficulty() {
    let sum = this.questions.reduce((acc, curr) => {
      return acc + curr.difficulty;
    }, 0);

    return sum / this.questions.length;
  }
}
