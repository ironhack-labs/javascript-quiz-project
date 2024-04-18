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
    return (this.currentQuestionIndex += 1);
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
  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (answer === currentQuestion.answer) {
      this.correctAnswers++;
    }
  }

  // 6. hasEnded()
  hasEnded() {
    return this.currentQuestionIndex === this.questions.length;
  }
  averageDifficulty() {
    const aveDifficulty = this.questions.reduce((accumulator, question) => {
      return accumulator + question.difficulty;
    }, 0);
    const average = aveDifficulty / this.questions.length;
    return average;
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      const newQuestions = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
      this.questions = newQuestions;
    }
  }
}
