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
      const a = Math.floor(Math.random() * i + 1);
      [this.questions[i], this.questions[a]] = [
        this.questions[a],
        this.questions[i],
      ];
    }
  }

  checkAnswer(answer) {
    if (answer === this.questions[this.currentQuestionIndex].answer) {
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

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 || difficulty <= 3) {
      this.questions = this.questions.filter(function (question) {
        if (question.difficulty === difficulty) {
          return true;
        }
      });
    }
  }

  averageDifficulty() {
    const average =
      this.questions.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.difficulty;
      }, 0) / this.questions.length;
    return average;
  }
}

// YOUR CODE HERE:
//
// 1. constructor (questions, timeLimit, timeRemaining)

// 2. getQuestion()

// 3. moveToNextQuestion()

// 4. shuffleQuestions()

// 5. checkAnswer(answer)

// 6. hasEnded()
