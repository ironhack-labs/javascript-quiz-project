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
    this.questions.sort(() => 0.5 - Math.random());
  }

  checkAnswer(answer) {
    if (this.questions[this.currentQuestionIndex].answer === answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      this.questions = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
    }
  }
<<<<<<< HEAD

  averageDifficulty() {
    const arrayValue = this.questions;
    const totalDifficulthy = arrayValue.reduce((sum, array)=>sum + array.difficulty,0);

    return totalDifficulthy / arrayValue.length

  }
  
=======
  averageDifficulty() {
    const totalDifficulty = this.questions.reduce(
      (accumulator, question) => (accumulator += question.difficulty),
      0);
    return totalDifficulty / this.questions.length;
  }
>>>>>>> 6ca16a2b9fab7f6e155aefc2b39d44d583a64dcf
}


