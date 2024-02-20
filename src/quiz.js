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

  moveToNextQuestion() {}

  // 4. shuffleQuestions()

  // 5. checkAnswer(answer)

  // 6. hasEnded()
}

// let questions = [1, 2, 3, 4, 5];
// console.log(questions[1]);
