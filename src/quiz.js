class Quiz {
  // YOUR CODE HERE:
  //
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
    return this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      this.questions.push(this.questions[randomIndex]);
      this.questions.splice(randomIndex, 1);
    }
    return this.questions;
  }

  checkAnswer(answer) {
    this.questions.map((element) => {
      if (element.answer === answer) {
        this.correctAnswers++;
      }
    });
  }

  hasEnded() {
    if (this.currentQuestionIndex === this.questions.length) return true;
    if (this.currentQuestionIndex < this.questions.length) return false;
  }

  filterQuestionsByDifficulty(difficulty) {
    const newArr = this.questions.filter(
      (element) => element.difficulty === difficulty
    );
    if (difficulty === 1 || difficulty === 2 || difficulty === 3)
      return (this.questions = newArr);
    return this.questions;
  }

  averageDifficulty() {
    let questionAverageDifficulty = 0;
    this.questions.reduce((acc, curr) => {
      acc += curr.difficulty;
      return (questionAverageDifficulty = acc);
    }, 0);
    return questionAverageDifficulty / this.questions.length;
  }
}
