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
    //code here
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    //code here
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    //code here
    return this.questions.sort((a, b) => 0.5 - Math.random());
  }

  checkAnswer(answer) {
    //code here
    if (answer) {
      this.correctAnswers++;
      //not complete yet, need to add more stuff to check if correct answer matches the question
    }
  }

  hasEnded() {
    //code here
    if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
    return false;
  }
}
