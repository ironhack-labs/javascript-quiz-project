class Quiz {
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
    this.currentQuestionIndex++;
  }
  shuffleQuestions() {
    const newQuestionsArray = [...this.questions];
    let currentIndex = newQuestionsArray.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = newQuestionsArray[currentIndex];
      newQuestionsArray[currentIndex] = newQuestionsArray[randomIndex];
      newQuestionsArray[randomIndex] = temporaryValue;
    }
    this.questions = newQuestionsArray;
    return this.questions;
  }
  checkAnswer(answer) {
    const currentQuestion = this.getQuestion();
    if (currentQuestion && currentQuestion.answer === answer) {
      this.correctAnswers++;
      return true
    }
    return false
  }
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      this.questions.filter((level) => level.difficulty === difficulty)
    }
  }
  averageDifficulty() {
    return this.questions.reduce((acc, curr) => acc + curr.difficulty, 0) / this.questions.length
  }

}
