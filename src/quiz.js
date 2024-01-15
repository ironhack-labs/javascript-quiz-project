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
    return this.currentQuestionIndex++;
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
    if (typeof answer === 'string') {
      this.correctAnswers++;
    }
  }
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }
}
