class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }
        
    moveToNextQuestion() {
        return this.currentQuestionIndex++
    }

    shuffleQuestions() {
        return this.questions.sort(() => Math.random() -0.5)
    }

    checkAnswer(answer) {
  //      if (this.getQuestion().correctAnswers === answer) {
            this.correctAnswers++
        }
    
     hasEnded(){

        if(this.currentQuestionIndex<this.questions.length){
            return false;
        }
        if(this.currentQuestionIndex==this.questions.length){
            return true;
        }
}

filterQuestionsByDifficulty(difficulty){
//if(difficulty===1||difficulty===2||difficulty===3){

if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 3) {
            return 
        }

        this.questions = this.questions.filter(question => 
             question.difficulty === difficulty
        )


         
}

averageDifficulty(){
const averageDifficultQuestion= this.questions.reduce((Acc,questions) =>{
   
return Acc + questions.difficulty  ;
},0);

return averageDifficultQuestion / this.questions.length
}

}





const newQuiz = new Quiz('what is your fav sport',2,1)

console.log(newQuiz.filterQuestionsByDifficulty(difficulty - 3))

console.log(newQuiz.checkAnswer('reading'));
//console.log(newQuiz.hasEnded());
//console.log(newQuiz.shuffleQuestions());
//console.log(newQuiz.moveToNextQuestion());
//console.log(newQuiz.getQuestion());