class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions; // 1º array of objects to store all questions
    this.timeLimit = timeLimit; // 2º Number
    this.timeRemaining = timeRemaining; // 3º Number
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  getQuestion() {
    return this.questions[this.currentQuestionIndex]; // Array index already initialized by 0
  } 

  moveToNextQuestion() {
    this.currentQuestionIndex += 1;
  }

  shuffleQuestions() {
    this.questions = this.questions.sort(() => Math.random() - 0.9);
  } 

  checkAnswer(answer) {
    const currentQuestion = this.getQuestion(); // Store answer input into a variable
    if (answer === currentQuestion.answer) {
      //compare answer input with correct answer from the question
      this.correctAnswers += 1; // increase by 1 if correct answered.
    }
  }

  hasEnded() {
    return this.currentQuestionIndex === this.questions.length; // It is comparisson No need to return with if/else
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty !== 1 && difficulty !== 2 && difficulty !== 3) {
      return;
    }
    this.questions = this.questions.filter((oneQuestion) => {
      if (oneQuestion.difficulty === difficulty) {
        return true;
      }
    });
  }

  averageDifficulty() {
    return (
      this.questions.reduce((acc, currentQuestion) => {
        return acc + currentQuestion.difficulty;
      }, 0) / this.questions.length
    );
  }
}
