class Quiz {
  //DAY 1
  // 1. constructor (questions, timeLimit, timeRemaining)
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  // 2. method getQuestion()
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // 3. moveToNextQuestion()
  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  // 4. shuffleQuestions()
  shuffleQuestions() {
    this.questions.sort(() => Math.random() - this.questions.length);
  }

  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    if (answer === this.questions[this.currentQuestionIndex].answer) {
      this.correctAnswers++;
    }
  }

  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }

  //DAY 2
  // 1. filterQuestionsByDifficulty()
  filterQuestionsByDifficulty(difficulty) {
    if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3){
      return;
    }
    let filteredQuestions = this.questions.filter((eachQuestion) => {
      if (eachQuestion.difficulty === difficulty) {
        return true
      }else{
        return false
      }
    })
    this.questions = filteredQuestions 
  }

  //2. averageDifficulty()
  averageDifficulty() {
    let sumDifficulty = this.questions.reduce( (acc, eachQuestion) => {
      return acc + eachQuestion.difficulty
    }, 0 )
  return sumDifficulty / this.questions.length
  }
}
