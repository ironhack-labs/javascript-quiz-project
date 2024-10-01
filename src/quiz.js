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
    this.currentQuestionIndex += 1; //no return needed
  }

  shuffleQuestions() {
    let currentIndex1 = this.questions.length;

    while (currentIndex1 != 0) {
      let randomIndex1 = Math.floor(Math.random() * currentIndex1);
      currentIndex1--;

      [this.questions[currentIndex1], this.questions[randomIndex1]] = [
        this.questions[randomIndex1],
        this.questions[currentIndex1],
      ];
    }
  }

  checkAnswer(answer) {
    const currentQuestion = this.questions[this.currentQuestionIndex]; //@Erian: you just had a typo ('questions' instead of 'question')

    if (answer === currentQuestion.answer) {
      this.correctAnswers++;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
    return false;
  }

  filterQuestionsByDifficulty(diff) {
    if (diff === 1 || diff === 2 || diff === 3) {
      this.questions = this.questions.filter((question) => {
        return question.difficulty === diff
      });
    }
  }

  averageDifficulty() {
    let sumOfDif = this.questions.reduce((acc, curr) => {
      return acc + curr.difficulty;
    },0);
    let aveDif = sumOfDif/this.questions.length;
    return aveDif;
  }
}
