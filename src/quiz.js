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
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    this.questions.sort(() => Math.random() - 0.5);
  }

  checkAnswer(answer) {
    const currentQuestion = this.getQuestion();
    
    if (currentQuestion.answer == answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    const filteredQuestions = this.questions.filter((element) => {
      if (difficulty === element.difficulty) {
        return element;
      }
      else if (difficulty >= 4 || difficulty <= 0) {
        return element;
      }
    })
    return filteredQuestions;
  }

  averageDifficulty() {
    const average = this.questions.reduce((acc, curr) => {
      return acc + curr.difficulty;
    }, 0)
    return average / this.questions.length;
  }
}
