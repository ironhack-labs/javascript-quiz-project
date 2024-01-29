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
      let tempVar = this.questions[i];
      this.questions[i] = this.questions[j];
      this.questions[j] = tempVar;
    }
    return this.questions;
  }

  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    const currentQuestion = this.getQuestion();
    if (answer === currentQuestion.answer) {
      this.correctAnswers++;
    }
  }
  // 6. hasEnded()

  hasEnded() {
    return this.currentQuestionIndex === this.questions.length;
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty < 1 || difficulty > 3 || typeof difficulty !== "number") {
      return;
    }

    const filteredQuestions = this.questions.filter((newDifficulty) => {
      return newDifficulty.difficulty === difficulty;
    });

    this.questions = filteredQuestions;
    return this.questions;
  }

  averageDifficulty() {
    const sumDif = this.questions.reduce((sum, question) => {
      const newTotal = sum + question.difficulty;
      return newTotal;
    }, 0);
    return sumDif / this.questions.length;
  }
}
