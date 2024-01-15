class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions; // array
    this.timeLimit = timeLimit; // number
    this.timeRemaining = timeRemaining; // number
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  //This method returns the currently shown question
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    this.questions = shuffleArray(this.questions);
  }

  checkAnswer(answer) {
    //if the answer provided by the player is the same as the answer of the currently shown question
    if (answer === this.getQuestion().answer) {
      //then we inscrease the count of this.correctAnswers.
      this.correctAnswers++;
    }
  }

  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length
  }
}

//Another way to write this: 
//     if (this.currentQuestionIndex < this.questions.length) {
//       return false;
//     } else if ((this.currentQuestionIndex === this.questions.length)) {
//       return true;
//     }
