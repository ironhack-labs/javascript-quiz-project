class Quiz {
  // YOUR CODE HERE:
  //
  //1.constructor (questions, timeLimit, timeRemaining)

  // 2. getQuestion()

  // 3. moveToNextQuestion()

  // 4. shuffleQuestions()

  // 5. checkAnswer(answer)

  // 6. hasEnded()
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
    return this.currentQuestionIndex++;
  }
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.questions[i];
      this.questions[i] = this.questions[j];
      this.questions[j] = temp;
    }
  }

  checkAnswer(answer) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (currentQuestion && currentQuestion.answer === answer) {
      this.correctAnswers += 1;
    }
  }
  hasEnded() {
    if (
      this.currentQuestionIndex >= this.questions.length ||
      this.timeRemaining <= 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    if (typeof difficulty === "number" && difficulty >= 1 && difficulty <= 3) {
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
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      document.getElementById(
        "timeRemaining"
      ).innerText = `Time remaining: ${this.timeRemaining} seconds`;
      if (this.hasEnded()) {
        clearInterval(this.timerInterval);
        this.displayEndView();
      }
    }, 1000);
  }
  displayEndView() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("end-view").style.display = "block";
    document.getElementById(
      "score"
    ).innerText = `Your score is ${this.correctAnswers} out of ${this.questions.length}`;
  }
}
