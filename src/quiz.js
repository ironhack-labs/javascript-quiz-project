class Quiz {
    // YOUR CODE HERE:
    //
    constructor (questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    moveToNextQuestion(){
        this.currentQuestionIndex += 1;
    }

    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));  // Generate random index
          [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];  // Swap questions
        }
      }

    checkAnswer(answer) { 
       const currentQuestion = this.questions[this.currentQuestionIndex];
       if (answer === currentQuestion.answer) {
        this.correctAnswers++;
       }
 }

    hasEnded(){
        return this.currentQuestionIndex === this.questions.length;
    }

    filterQuestionsByDifficulty(difficulty) {
        if (typeof difficulty !== 'number' || difficulty < 1 || difficulty > 3) {
            return this.questions;
          }
        const newQuestions = this.questions.filter((element) => element.difficulty === difficulty)
        return this.questions = newQuestions;
      } 

      averageDifficulty(){
        
        const dificultadMedia = this.questions.reduce((accumulator, element) =>{
            return accumulator += element.difficulty
        },0)
        return dificultadMedia/this.questions.length 
    }
}

