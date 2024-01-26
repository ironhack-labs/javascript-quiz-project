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
    this.questions.sort(() => Math.random() - 0.5);
  }

  checkAnswer(answer) {
    this.correctAnswers++;
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    let filteredDifficulty;
    if (difficulty >= 1 && difficulty <= 3) {
      filteredDifficulty = this.questions.filter(function (element) {
        return element.difficulty === difficulty;
      });
    } else {
      filteredDifficulty = this.questions; // Return the original questions array if the difficulty is not between 1 and 3
    }

    return filteredDifficulty;
  }

  averageDifficulty() {
    const totalDifficulty = this.questions.reduce((accumulator, question) => {
      // Accumulate the total difficulty by adding the difficulty of each question to the accumulator
      return accumulator + question.difficulty;
    }, 0);

    const average = totalDifficulty / this.questions.length;
    return average;
  }
}
