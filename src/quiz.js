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
    if (answer === this.questions[this.currentQuestionIndex].answer) {
      this.correctAnswers++;
    }
  }
  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex === this.questions.length) {
      return true;
    } else {
      return false;
    }
  }
  // day 2 - 1. filterQuestionsByDifficulty(difficulty) method: .filter()

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty === 1 || difficulty === 2 || difficulty === 3) {
      const filteredByDifficulty = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
      this.questions = filteredByDifficulty;
      return this.questions;
    } else {
      return this.questions;
    }
  }

  // day 2 - 2. averageDifficulty(): .reduce()
  averageDifficulty(){
    let totalDifficulty = 0

    this.questions.reduce((acc, question)=> {
        totalDifficulty += question.difficulty;
        acc += question.difficulty;
    },0)
    return totalDifficulty / this.questions.length;
}
}
