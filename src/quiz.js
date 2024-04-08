class Quiz {
  // this a comment
  // second comment

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
    let currentIndex = this.questions.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.questions[currentIndex], this.questions[randomIndex]] = [
        this.questions[randomIndex],
        this.questions[currentIndex],
      ];
    }
  }

  checkAnswer(answer) {
    if (answer === this.getQuestion().answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex == this.questions.length) {
      return true;
    } else {
      return undefined;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    if (typeof difficulty == "number" && difficulty >= 1 && difficulty <= 3) {
      return (this.questions = this.questions.filter(
        (e) => e.difficulty === difficulty
      ));
    }
  }

  averageDifficulty() {
    const sumDifficulty = this.questions.reduce((acc, cur) => {
      return acc + cur.difficulty;
    }, 0);
    return sumDifficulty / this.questions.length;
  }
}
