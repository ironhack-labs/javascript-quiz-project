class Quiz {
  // 1. constructor (questions, timeLimit, timeRemaining)
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions; // array
    this.timeLimit = timeLimit; // number
    this.timeRemaining = timeRemaining; // number
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  // shuffleQuestions() {
  //   let currentQuestion = this.choices; //change this!!!!!!!!!!!!
  //   let shuffledArray = [currentArray[0]];

  //   for (let i = 0; i < currentArray.length; i++) {
  //     if (!shuffledArray.includes(currentArray[i])) {
  //       shuffledArray.push(
  //         currentArray[Math.floor(Math.random() * currentArray.length)]
  //       );
  //     }
  //   }
  //   shuffledArray = this.choices;
  //   return this.choices;
  // }

  checkAnswer(answer) {
    if (answer === true) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if ((this.currentQuestionIndex = this.questions.length)) {
      return true;
    }
    return undefined;
  }
}
