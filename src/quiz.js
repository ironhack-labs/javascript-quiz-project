class Quiz {
  constructor (questions, timeLimit, timeRemaining){
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
    this.score = 0;
  }

    getQuestion(){
      return this.questions[this.currentQuestionIndex];
    }
    moveToNextQuestion(){
      if (!this.hasEnded()){
         this.currentQuestionIndex++;
      }
     
    }
    shuffleQuestions(){
      for (let i = this.questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
      }
    }
    
    checkAnswer(answer){
      console.log(answer, 'fdfggdfgsdfg')
      console.log(answer)
      console.log(answer)
      if (answer === this.questions[this.currentQuestionIndex].answer){
        
        this.correctAnswers++
        this.score++
        
      }
      this.moveToNextQuestion();
    }
    hasEnded(){
      return this.currentQuestionIndex >= this.questions.length
    }
    filterQuestionsByDifficulty(difficulty) {
      if (typeof difficulty !== 'number' || difficulty < 1 || difficulty > 3) {
        return this.questions; 
      }
      this.questions = this.questions.filter((eachQuestions) => {
        if(eachQuestions.difficulty === difficulty) {
            return true;
        };
    });   
  
    }
    averageDifficulty() {
      if (this.questions.length === 0) {
        return 0; 
      }
  
      const totalDifficulty = this.questions.reduce((acc, question) => acc + question.difficulty, 0);
      return totalDifficulty / this.questions.length;
    }
}