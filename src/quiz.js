class Quiz {
  // YOUR CODE HERE:
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
    this.currentQuestionIndex = this.currentQuestionIndex + 1;
  }
  // 4. shuffleQuestions()
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      //return Math.floor(Math.random() * max);
      const shuffle = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[shuffle]] = [
        this.questions[shuffle],
        this.questions[i],
      ];
    }
    return this.questions;
  }
  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    let currentQuestion = this.questions[this.currentQuestionIndex];
    if (currentQuestion.answer === answer) {
      this.correctAnswers++;
    }
  }
  hasEnded() {
    if (this.currentQuestionIndex === this.questions.length) {
      return true;
    } else {
      return false;
    }
  }
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      const filteredQuestions = this.questions.filter((question) => {
        if (question.difficulty === difficulty) {
          return true;
        }
      });
      this.questions = filteredQuestions;
    }
  }
  averageDifficulty() {
    const sum = this.questions.reduce((acc, currQuestion) => {
      return acc + currQuestion.difficulty;
    }, 0);
    return sum / this.questions.length;
  }
}
// 6. hasEnded()
