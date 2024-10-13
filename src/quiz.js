class Quiz {
  // YOUR CODE HERE:
  //
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
    this.currentQuestionIndex += 1;
    return this.currentQuestionIndex;
  }

  shuffleQuestions() {
    for (let i = 0; i < this.questions.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
    return this.questions;
  }

  checkAnswer(answer) {
    if (this.getQuestion().answer === answer) {
      this.correctAnswers += 1;
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex === this.questions.length) {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty){
    if(typeof difficulty === "number" && difficulty <= 3 && difficulty !=0){
      const result = this.questions.filter(function(question){
        return question.difficulty === difficulty ;
   
       })
      this.questions = result;
      return this.questions;
      

    }
   
  }

  averageDifficulty(){
    return this.questions.reduce(function(acc, question){
      return acc += question.difficulty
    }, 0) / this.questions.length ;

  }
  
}

