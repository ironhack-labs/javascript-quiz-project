class Quiz {
  // YOUR CODE HERE:
  // Day 1:
  // 1. constructor (questions, timeLimit, timeRemaining)
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  // 2. getQuestion()

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  // 3. moveToNextQuestion()
  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  // 4. shuffleQuestions()
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }

  // 5. checkAnswer(answer) // update done day 2
  checkAnswer(answer) {
    // answer by default is true
    if (this.getQuestion().answer === answer) {
      this.correctAnswers++;
    }
  }

  // 6. hasEnded()
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }

  // Day 2:

  // 7. filterQuestionsByDifficulty()

  filterQuestionsByDifficulty(difficulty) {
    if (typeof difficulty === "number" && difficulty >= 1 && difficulty <= 3) {
      this.questions = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
    }
  }

  // 8. averageDifficulty() method

  averageDifficulty() {
    const totalDifficulty = this.questions.reduce((sum, question) => {
      return sum + question.difficulty;
    }, 0);
    return totalDifficulty / this.questions.length;
  }
}
