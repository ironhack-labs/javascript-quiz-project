class Quiz {
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
    this.timer = null;
    this.isOver = false;
  }

  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  /*
  if(this.currentQuestionIndex < this.questions.length)
  {return false}
  else {return true}
  */

  /*
  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeRemaining === 0) {
        this.stopTimer();
        this.hasEnded();
      } else {
        this.timeRemaining--;
        console.log("Time remaining:", this.timeRemaining);
        document.getElementById("timeRemaining").innerText = this.timeRemaining;
      }
    }, 1000);
  }
*/

  moveToNextQuestion() {
    return this.currentQuestionIndex++;
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
      return this.questions;
    }
  }

  checkAnswer(answer) {
    //console.log(this.questions)
    //if(this.questions.forEach((element) => element.answer) === this.questions.answer)
    //if(this.questions.answer === this.questions)
    // return
    this.getQuestion().answer === answer ? this.correctAnswers++ : null;
    //this.correctAnswers++
  }

  hasEnded() {
    this.currentQuestionIndex === this.questions.length ||
    this.timeRemaining === 0
      ? (this.isOver = true)
      : (this.isOver = false);
  }

  filterQuestionsByDifficulty(difficulty) {
    return typeof difficulty !== "number"
      ? this.questions
      : (this.questions = this.questions.filter(
          (e) => e.difficulty == difficulty
        ));
    //return this.questions
  }

  averageDifficulty() {
    const difficultySum = this.questions.reduce(
      (acc, curr) => acc + curr.difficulty,
      0
    );
    return difficultySum / this.questions.length;
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
        console.log("Time remaining:", this.timeRemaining);
        document.getElementById("timeRemaining").innerText = this.timeRemaining;
      } else {
        this.stopTimer();
        this.hasEnded();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }
}
