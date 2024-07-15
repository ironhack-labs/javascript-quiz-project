class Quiz {
    // YOUR CODE HERE:
    //
 constructor (questions, timeLimit, timeRemaining){

    this.questions = questions
    this.timeLimit = timeLimit
    this.timeRemaining = timeRemaining
    this.correctAnswers = 0
    this.currentQuestionIndex = 0
}
    getQuestion(){
      return this.questions[this.currentQuestionIndex]
    }
    
     moveToNextQuestion(){
        this.currentQuestionIndex++
     }

     shuffleQuestions(){
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    
     }

     checkAnswer(answer){
        if(answer === this.questions[this.currentQuestionIndex].answer){
            return this.correctAnswers++;
        }
     }

     hasEnded(){
        if(this.currentQuestionIndex < this.questions.length){
           return false
        }else{
            return true
        }
     }

     filterQuestionsByDifficulty(difficultyNumber){
         if(difficultyNumber !== 1 && difficultyNumber !== 3 && difficultyNumber !== 2){
            return
         }  
      
      const filteredQuestions = this.questions.filter((eachQuestion) => {
         return eachQuestion.difficulty === difficultyNumber;
        });
        this.questions = filteredQuestions;
     }

     averageDifficulty(){
         const averageDif = this.questions.reduce((acc,eachQuestion) => {
            return acc += eachQuestion.difficulty;
         }, 0);
         return averageDif / this.questions.length;
     }
}
