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
    for (let i = 0; i < this.questions.length; i++) {
      let j = Math.floor(Math.random() * this.questions.length);

      let temp = this.questions[i];
      this.questions[i] = this.questions[j];
      this.questions[j] = temp;
    }
  }

  // 5. checkAnswer(answer)

  checkAnswer(answer) {
    let currentQuestion = this.questions[this.currentQuestionIndex];
    if (answer === currentQuestion.answer) {
      this.correctAnswers++;
    }
  }

  // 6. hasEnded()

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    }

    return true;
  }

  // 7. filterQuestionsByDifficulty()

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty > 0 || difficulty < 4) {
      this.questions = this.questions.filter((question) => {
        return question.difficulty === difficulty;
      });
    }
  }

  // 8. averageDifficulty()

  averageDifficulty() {
    const sum = this.questions.reduce((acc, curr) => {
      return acc + curr.difficulty;
    }, 0);
    return sum / this.questions.length;
  }
}
