class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor (questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    // 2. getQuestion()
    getQuestion(){
        return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion(){
         this.currentQuestionIndex += 1;
        }

    // 4. shuffleQuestions()
    shuffleQuestions(){
        for (let i = this.questions.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]]= [this.questions[j], this.questions[i]];
           }
    }

    // 5. checkAnswer(answer)
    checkAnswer(answer){
      const currentQuestion = this.getQuestion();
      if (currentQuestion.answer === answer){
        this.correctAnswers ++;
        
      }
      
    }

 
   // 6. hasEnded()
   hasEnded(){
  
    return this.currentQuestionIndex >= this.questions.length;
  

}

filterQuestionsByDifficulty(difficulty){
    if (typeof difficulty === 'number' && difficulty >= 1 && difficulty <= 3)
    this.questions = this.questions.filter (questions => questions.difficulty === difficulty)
}
averageDifficulty() {
    if (this.questions.length === 0) return 0;
    const totalAvg = this.questions.reduce ((sum, questions) => sum + questions.difficulty , 0)
    return totalAvg / this.questions.length;
}
}