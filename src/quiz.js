class Quiz {
  // YOUR CODE HERE:
  // 1. constructor (questions, timeLimit, timeRemaining)
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
  }
  // 2. getQuestion()
  getQuestion() {
    // console.log(this.questions[this.currentQuestionIndex]);
    return this.questions[this.currentQuestionIndex];
  }
  // 3. moveToNextQuestion()
  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  // 4. shuffleQuestions()
  shuffleQuestions() {
    let randomIndex = Math.floor(Math.random() * this.questions.length) + 1;

    for (let i = 0; i < this.questions.length; i++) {
      this.questions[i] = this.questions[randomIndex];
    }
  }

  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    this.questions.forEach((element) => {
      if (answer === element.answer) {
        this.correctAnswers++;
      }
    });
  }

  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    }
    if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    if (typeof difficulty !== "number" || difficulty < 1 || difficulty >= 3) {
      return this.questions;
    }
    this.questions = this.questions.filter(
      (el) => el.difficulty === difficulty
    );
  }

  averageDifficulty() {
    if (this.questions.length === 0) {
      return 0;
    }

    let totalDifficulty = this.questions.reduce((acc, question) => {
      return acc + question.difficulty;
    }, 0);

    return totalDifficulty / this.questions.length;
  }
}
