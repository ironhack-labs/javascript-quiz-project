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
    this.currentQuestionIndex += 1;
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * this.questions.length);
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }

  checkAnswer(answer) {
    if (this.questions[this.currentQuestionIndex].answer === answer) {      
      this.correctAnswers += 1;
      return true
    } else {return false}
  }

  hasEnded() {
    if (this.questions.length === this.currentQuestionIndex) {
      return true;
    } else return false;
  }

  filterQuestionsByDifficulty(difficulty) {
    // Check if the difficulty is a valid number between 1 and 3
    if (typeof difficulty === "number" && difficulty >= 1 && difficulty <= 3) {
      // Update the questions array with filtered questions
      this.questions = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
      // Reset current question index after filtering
      this.currentQuestionIndex = 0;
    }
    // If invalid, do not modify the questions array
  }

  averageDifficulty() {
    if (this.questions.length === 0) return 0;

    const questionsArrayLength = this.questions.length;

    const sumOfDificulties = this.questions.reduce((acc, curr) => {
      return acc + curr.difficulty;
    }, 0);

    return sumOfDificulties / questionsArrayLength;
  }
}
