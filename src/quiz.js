class Quiz {
  // YOUR CODE HERE:
  //
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions; // Array of Question objects
    this.timeLimit = timeLimit; // Number
    this.timeRemaining = timeRemaining; // Number
    this.correctAnswers = 0; // Number
    this.currentQuestionIndex = 0; // Number
  }

  getQuestion() {
    return this.questions[this.currentQuestionIndex]; // Returns the current question object
  }

  moveToNextQuestion() {
    return this.currentQuestionIndex++; // Increments the current question index
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a new random index
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ]; // Swap the elements at indices i and j
    }
  }

  checkAnswer(answer) {
    if (this.getQuestion().answer === answer) {
      // Checks if the answer is correct
      this.correctAnswers++; // Increments the correct answers count
      return;
    }
    return "Wrong answer!"; // Returns a message if the answer is wrong
  }

  hasEnded() {
    // return this.currentQuestionIndex >= this.questions.length; // Checks if the quiz has ended

    if (this.currentQuestionIndex >= this.questions.length) {
      return true; // Returns true if the quiz has ended
    }
    return false; // Returns false if the quiz has not ended
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      const filteredQuestions = this.questions.filter(
        (question) => question.difficulty === difficulty
      ); // Filters the questions by difficulty

      return (this.questions = filteredQuestions);
    }
  }

  averageDifficulty() {
    const totalDifficulty = this.questions.reduce(
      (total, question) => total + question.difficulty,
      0
    );
    return totalDifficulty / this.questions.length;
  }
}
