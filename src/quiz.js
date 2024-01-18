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
    console.log('Questions: ', this.questions, this.currentQuestionIndex)
    return this.questions[this.currentQuestionIndex];
  }

  // {question: "asdad", answer: "asdasd"}
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
      return true;
    }
    return false;
  }

  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty < 1 || difficulty > 3 || typeof difficulty !== "number") {
      return;
    }
    this.questions = this.questions.filter((question) => {
      return question.difficulty === difficulty;
    });
  }
  averageDifficulty() {
    const averageDifficulty = this.questions.reduce(
      (sum, question) => sum + question.difficulty,
      0
    );
    const average = averageDifficulty / this.questions.length;
    return Math.round(average);
  }
}

