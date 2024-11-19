class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
      this.questions = questions;
      this.timeLimit = timeLimit;
      this.timeRemaining = timeRemaining;
      this.correctAnswers = 0;
      this.currentQuestionIndex = 0;
}
//should return the item from the 'questions' array at the position of 'currentQuestionIndex'
    getQuestion(){
        return this.questions[this.currentQuestionIndex]; 
    }
    

    moveToNextQuestion() {
        this.currentQuestionIndex += 1;
      }
    
      shuffleQuestions() {
        this.questions.forEach((question, i) => {
          const randomIndex = Math.floor(Math.random() * (i + 1));
          [this.questions[i], this.questions[randomIndex]] = [
            this.questions[randomIndex],
            this.questions[i],
          ];
        });
      }

      //should increase 'correctAnswers' by 1 when a correct answer is passed as an argument
      //should check if the answer is correct by comparing it to the 'answer' property of the current question
      checkAnswer(answer) {
        const currentQuestion = this.getQuestion();
        if (answer === currentQuestion.answer) {
            this.correctAnswers += 1;
        }
    }
    //should return 'false' when 'currentQuestionIndex' is less than the 'questions' array length
    //should return 'true' when 'currentQuestionIndex' is equal to the 'questions' array length
    hasEnded(){
      if(this.currentQuestionIndex < this.questions.length){
        return false;
      }
      return true; 
    }

    //should update the 'questions' array with the questions filtered by difficulty
    //should not change the 'questions' array if the 1st argument is not a number between 1 and 3

    filterQuestionsByDifficulty(difficulty){
      if (difficulty >= 1 && difficulty <= 3){
        this.questions = this.questions.filter(question => question.difficulty === difficulty);
        //filter check each element of the array (questions) and checks the prperty if it matches the difficulty
      }
    }
//should return the average difficulty of the questions in the quiz

    averageDifficulty(){
      const totalDifficulty = this.questions.reduce((sum, question) => sum + question.difficulty, 0);
      const average = totalDifficulty/ this.questions.length; 
      return average;
    }

}
