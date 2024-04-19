class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor (questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers =0;
        this.currentQuestionIndex=0;
        //console.log(this.questions)
    }
    getQuestion(){
        return  this.questions[this.currentQuestionIndex];
    }
    moveToNextQuestion(){
        this.currentQuestionIndex++;
    }
    shuffleQuestions(){
        for (let i = this.questions.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.questions[i];
            this.questions[i] = this.questions[j];
            this.questions[j] = temp;
        }
    }
    checkAnswer(answer){
        if (answer === this.questions[this.currentQuestionIndex].answer){
            this.correctAnswers++
        }
    }
    hasEnded(){
        if (this.currentQuestionIndex >= this.questions.length){
            return true;
        }
        else{
            return false;
        }  
    }
    filterQuestionsByDifficulty(difficulty){
        let preguntasFiltradas = this.questions.filter((pregunta) => {
        return pregunta.difficulty === difficulty;
        })

        if((difficulty>0 && difficulty<4)){
            this.questions = preguntasFiltradas
        }
    
    } 
    averageDifficulty(){
        let suma = this.questions.reduce((acc, pregunta) => {
          return acc + pregunta.difficulty;
        }, 0);
        console.log(this.questions.length);
        console.log(suma);
        return suma / this.questions.length;
    }
}