class Quiz {
  // YOUR CODE HERE:
  //
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
    this.questions.sort(() => Math.random() - 0.5);
  }

  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    if (answer === this.questions[this.currentQuestionIndex].answer)
      this.correctAnswers++;
  }

  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty === 1 || difficulty === 2 || difficulty === 3) {
      return (this.questions = this.questions.filter(
        (e) => e.difficulty === difficulty
      ));
    }
  }

  averageDifficulty() {
    const totalDifficulty = this.questions.reduce(
      (acc, curr) => acc + curr.difficulty,
      0
    );
    const averageDifficulty = totalDifficulty / this.questions.length;
    return averageDifficulty;
  }
}
