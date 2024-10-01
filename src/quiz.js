class Quiz {
  //Questions = ["In which country you are?"]
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }
  //Method difinition
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  moveToNextQuestion() {
    this.currentQuestionIndex += 1;
  }
  shuffleQuestions() {
    for (let i = 0; i < this.questions.length; i++) {
      const currentQuestion = this.questions[i];
      const randomIndex = Math.floor(Math.random() * this.questions.length);
      this.questions.splice(i, 1);
      this.questions.splice(randomIndex, 0, currentQuestion);
    }
  }
  checkAnswer(answer) {
    if (answer === this.getQuestion().answer) {
      this.correctAnswers += 1;
    }
  }
  hasEnded() {
    if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
    return false;
  }

  //filterQuestionsByDifficulty Method
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty === 3 || difficulty === 1 || difficulty === 2) {
      const filterQuestions = this.questions.filter((oneQuestion) => {
        if (oneQuestion.difficulty === difficulty) {
          return true;
        }
      });
      this.questions = filterQuestions;
    }
  }
  // reduce Method
  averageDifficulty() {
    const sumDifficulty = this.questions.reduce((acc, curr) => {
      return acc + curr.difficulty;
    }, 0);
    console.log(this.questions, sumDifficulty);
    return sumDifficulty / this.questions.length;
  }
}
