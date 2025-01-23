class Quiz {

    
    constructor (questions, timeLimit, timeRemaining){
      this.questions = questions; 
      this.timeLimit = timeLimit;
      this.timeRemaining = timeRemaining;
      this.correctAnswers = 0;
      this.currentQuestionIndex = 0;
    };

    getQuestion(){

    return this.questions[this.currentQuestionIndex];

    };
    
    moveToNextQuestion(){
        this.currentQuestionIndex++;
    };


     shuffleQuestions(){

        for (let i = this.questions.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[randomIndex]] = [this.questions[randomIndex], this.questions[i]];
        }

     };

    checkAnswer(answer){
     if(this.questions[this.currentQuestionIndex].answer === answer){
     this.correctAnswers++;
     }
    };

   hasEnded(){

   if(this.currentQuestionIndex < this.questions.length){
    return false;

   }else if(this.currentQuestionIndex === this.questions.length){
      return true;
   }
    };

    filterQuestionsByDifficulty(difficulty) {
       if (difficulty < 1 || difficulty > 3 || typeof difficulty != "number") {return};
        this.questions = this.questions.filter(question => question.difficulty === difficulty);
        
    };

    averageDifficulty() {
        return this.questions.reduce((acc , curr)=> acc + curr.difficulty ,0)/ this.questions.length;
    }
            
}


