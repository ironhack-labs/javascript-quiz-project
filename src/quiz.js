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
    for (let i = 0; i < this.questions.length; i++) {
      return this.questions[this.currentQuestionIndex];
    }
  }
  // 3. moveToNextQuestion()
  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }
  // 4. shuffleQuestions()
  shuffleQuestions() {
    this.currentIndex = this.questions.length;
    this.randomIndex = Math.floor(Math.random() * this.currentIndex);
    // While there remain elements to shuffle.
    while (this.currentIndex > 0) {
      // Pick a remaining element.

      this.currentIndex--;

      // And swap it with the current element.
      [this.questions[this.currentIndex], this.questions[this.randomIndex]] = [
        this.questions[this.randomIndex],
        this.questions[this.currentIndex],
      ];
    }
    console.log(this.questions);
    return this.questions;
  }
  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    this.correctAnswers++;
  }
  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }
}
