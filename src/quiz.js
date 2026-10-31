class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)

  // 2. getQuestion()

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // 3. moveToNextQuestion()

  moveToNextQuestion() {
    this.currentQuestionIndex += this.currentQuestionIndex + 1;
  }

  // 4. shuffleQuestions()

  // 5. checkAnswer(answer)

    // 6. hasEnded()
}
