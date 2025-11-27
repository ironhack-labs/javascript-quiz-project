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
    return this.currentQuestionIndex++;
  }

  // 4. shuffleQuestions()
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[random]] = [
        this.questions[random],
        this.questions[i],
      ];
    }
  }

  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    // for (let i = 0; i < this.questions.length; i++) {
    //   const currentQuestion = this.questions[i];
    //   if (answer === currentQuestion.answer) {
    //     return this.correctAnswers++;
    //   }
    // }

    const correct = answer === this.questions[this.currentQuestionIndex].answer;

    if (correct) {
      this.correctAnswers++;
    }

    return correct;
  }

  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }

  // Day 2
  // 1. filterQuestionsByDifficulty(difficulty)
  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      let filteredQuestionByDifficulty = this.questions.filter(
        (currentQuestion) => currentQuestion.difficulty === difficulty
      );
      this.questions = filteredQuestionByDifficulty;
      return this.questions;
    } else {
      return false;
    }
  }

  // 2. averageDifficulty()
  averageDifficulty() {
    return (
      this.questions.reduce((acc, currentQuestion) => {
        return acc + currentQuestion.difficulty;
      }, 0) / this.questions.length
    );
  }
}
