class Quiz {
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = Number(timeLimit);
        this.timeRemaining = Number(timeRemaining);
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;

    }
    getQuestion(){
        return this.questions[this.currentQuestionIndex];
    }
    moveToNextQuestion() {
        this.currentQuestionIndex += 1;
    }
    shuffleQuestions(){
       for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.questions[i];
      this.questions[i] = this.questions[j];
      this.questions[j] = temp;
    }
    }

     checkAnswer(answer) {
        let currentQuestion = this.questions[this.currentQuestionIndex];

        if (answer === currentQuestion.answer) {
            this.correctAnswers += 1;
        }
     }
    
    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length){
            return false;
        } else if (this.currentQuestionIndex === this.questions.length){
            return true;
        }
    }
    filterQuestionsByDifficulty(difficulty){
        if(difficulty < 1 || difficulty > 3 || typeof difficulty !== 'number'){
            return;
        }
        
       return this.questions = this.questions.filter (question => question.difficulty === difficulty)
         

    }
    averageDifficulty(){
        
    const totalDificulty = this.questions.reduce((sum, question) => sum + question.difficulty, 0)
    return totalDificulty / this.questions.length
    }
}

