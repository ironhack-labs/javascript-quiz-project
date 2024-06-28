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
    if (
      this.currentQuestionIndex >= 0 &&
      this.currentQuestionIndex < this.questions.length
    ) {
      return this.questions[this.currentQuestionIndex];
    }
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }

  checkAnswer(answer) {
    let currentQuestion = this.getQuestion();
    console.log(currentQuestion);
    if (answer === currentQuestion.answer) {
      this.correctAnswers++;
      //respuesta seleccionada por el usuario y la respuesta correcta
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if ((this.currentQuestionIndex = this.questions.length)) {
      return true;
    }
  }
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      const filteredQuestions = this.questions.filter((eachQuestion) => {
        if (eachQuestion.difficulty === difficulty) {
          return true;
        } else {
          return false;
        }
      });
      this.questions = filteredQuestions;
      //  return filteredQuestions
    }
  }
  averageDifficulty() {
    const averageDiff = this.questions.reduce((acc, eachEl) =>{
    return (acc + eachEl.difficulty)
    },0)
    return averageDiff / this.questions.length
  } 
}
