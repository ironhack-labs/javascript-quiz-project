class Quiz {
  // YOUR CODE HERE:
  //
  // 1. constructor (questions, timeLimit, timeRemaining)
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }
  // 2. getQuestion()
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // 3. moveToNextQuestion()
  moveToNextQuestion() {
    this.currentQuestionIndex += 1;
  }
  // 4. shuffleQuestions()
  shuffleQuestions() {
    let shuffledArray = [];
    let randomIndex = Math.floor(Math.random * this.questions.length);
    if (!shuffledArray.includes(this.questions[randomIndex])) {
      shuffledArray.push(this.questions[randomIndex]);
    }
    this.questions = shuffledArray;
    return this.questions;
  }

  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    if (typeof answer === "string") {
      this.correctAnswers++;
    }
  }

  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    if (typeof difficulty === "number" && difficulty > 0 && difficulty <= 3) {
      this.questions = this.questions.filter((q) => {
        return q.difficulty === difficulty;
      });
    }
  }

  averageDifficulty() {
    const totDiff = this.questions.reduce((acc, current) => {
      return acc + current.difficulty;
    }, 0);
    // console.log(totDiff);
    return totDiff / this.questions.length;
  }
}
