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
    this.currentQuestionIndex += 1;
  }

  shuffleQuestions() {

      for (let i = this.questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
      // const newQuestion = Math.floor(Math.random() * (i + 1)); //randomIndex re mane it
      // [this.questions[i]],
      //   (this.questions[newQuestions] = [
      //     this.questions[newQuestions],
      //     this.questions[i],
      //   ]);
      ///[1, 2, 3, 4, 5]    [2, 1, 4, 3, 5]
    
  }

  checkAnswer(answer) {
    // if(this.questions){  // how is this possible? I don't know :O
    //     this.correctAnswers += 1
    // }

    if (answer) {
      if (this.questions[this.currentQuestionIndex - 1].answer === answer) {
        this.correctAnswers++;
        console.log("correct answer!")
      } 
    } else {
      alert("Please provide an answer");
    }
  }

  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty){
    
    // let randomDifficulty = Math.floor(Math.random() * 3) + 1 ;
    if(difficulty >= 1 && difficulty <= 3) {

        this.questions = this.questions.filter((question) => {
          return question.difficulty === difficulty
        })
    }
  }

  // averageDifficulty() {

  //      let avgDifficulty =  this.difficulty.reduce(function(acc, difficulty ){ acc + this.difficulty
  //   }, 0)

  //   let avgTotal = avgDifficulty / this.difficulty

  //   return avgTotal


    averageDifficulty() {
      let sum =
      this.questions.reduce((acc, question) => acc + question.difficulty, 0) 
          let average = sum / this.questions.length;
      return average
  }
}
