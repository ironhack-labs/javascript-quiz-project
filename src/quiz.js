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
    const shuffle = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };
    this.questions = shuffle(this.questions);
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
  filterQuestionsByDifficulty(difficultyNumber) {
    if (
      difficultyNumber !== 1 &&
      difficultyNumber !== 2 &&
      difficultyNumber !== 3
    ) {
      return this.questions;
    }
    const filteredArr = this.questions.filter(
      (element) => element.difficulty === difficultyNumber
    );
    this.questions = filteredArr;
    this.currentQuestionIndex = 0;
  }
  averageDifficulty() {
    const totalDifficulty = this.questions.reduce(
      (accumulator, currentValue) => accumulator + currentValue.difficulty,
      0
    );
    const avgDifficulty = totalDifficulty / this.questions.length;
    console.log(avgDifficulty);
    return avgDifficulty;
  }
}

//const resultArr = [];
//git branch fix-HomePage
//git checkout fix-HomePage
//Homepage(title)
