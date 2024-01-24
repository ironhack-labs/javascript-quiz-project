class Quiz{
    constructor(questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;

    }

    getQuestion(){

        return this.questions[this.currentQuestionIndex];
     }
    
    moveToNextQuestion(){
       // function nextQuestion (){}
        this.currentQuestionIndex++;

     }

    shuffleQuestions(){
        
        let currentIndex = this.questions.length;

            while (currentIndex > 0) {

            const randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

            [this.questions[currentIndex], this.questions[randomIndex]] =  [this.questions[randomIndex], this.questions[currentIndex]];
        }  
        return this.questions;    
    }

     
    
    checkAnswer(answer){

        this.correctAnswers++;
    }

    hasEnded(){
        if(this.currentQuestionIndex === this.questions.length){
            return true;
        }
        else if(this.currentQuestionIndex < this.questions.length){
            return false;
        }

    }

    filterQuestionsByDifficulty(difficulty){
        const filteredQuestions = this.questions.filter(function(question){
            if(typeof difficulty === "string"){
                return true;
            } else {
                return question.difficulty==difficulty;
            }
        })

        return filteredQuestions;
    }


    averageDifficulty(){

        const sumOfDifficulties = this.questions.reduce(function (acc, currentValue){
            return acc + currentValue.difficulty;

        }, 0);

        return sumOfDifficulties / this.questions.length;
    }
}