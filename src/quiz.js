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
    return (this.currentQuestionIndex += 1);
  }

  shuffleQuestions() {
    let mixedQuestions = this.questions.sort(() => Math.random() - 0.5);
    return mixedQuestions;
  }

  checkAnswer(answer) {
    if (this.getQuestion().answer === answer) {
      this.correctAnswers += 1;
    }
    console.log("the answer", answer);
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {

    if (1 <= difficulty && difficulty <= 3){

      this.questions= this.questions.filter((question)=>
        question.difficulty === difficulty)
    }
    return;
  }


  averageDifficulty(){
    const average = this.questions.reduce((sum, question)=> {
      sum += question.difficulty;
      return sum;
  }, 0);
    return (average / this.questions.length)
  }
}
