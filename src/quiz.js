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
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }

  checkAnswer(answer) {
    const currentQuestion = this.getQuestion();
    if (currentQuestion.answer === answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    return (
      this.currentQuestionIndex >= this.questions.length ||
      this.timeRemaining <= 0
    );
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      this.questions = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
    }
  }

  averageDifficulty() {
    let sum = 0;
    for (let i = 0; i < this.questions.length; i++) {
      sum += this.questions[i].difficulty;
    }
    return sum / this.questions.length;
  }
}

// YOUR CODE HERE:
//
// 1. constructor (questions, timeLimit, timeRemaining)

// 2. getQuestion()

// 3. moveToNextQuestion()

// 4. shuffleQuestions()

// 5. checkAnswer(answer)
