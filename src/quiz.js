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
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }

  checkAnswer(answer) {
    const currentQuestion = this.getQuestion();
    if (currentQuestion.answer === answer) {
      this.correctAnswers++;
      return true;
    } else {
      return false;
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
    if (difficulty >= 1 || difficulty <= 3) {
      const filteredQuestions = this.questions.filter((question) => {
        if (question.difficulty === difficulty) {
          return true;
        }
      });

      this.questions = filteredQuestions;
    }
  }

  averageDifficulty() {
    let total = this.questions.reduce((acc, curr) => {
      return acc + curr.difficulty;
    }, 0);
    return total / this.questions.length;
  }
}
