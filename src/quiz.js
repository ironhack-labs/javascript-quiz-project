    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;

    }
   
    // 2. getQuestion()
    getQuestion(){
        return this.questions[this.currentQuestionIndex]
    }



       
    // 3. moveToNextQuestion()

    moveToNextQuestion() {
       this.currentQuestionIndex++;
       
       if (this.currentQuestionIndex >= this.questions.length) {
        this.currentQuestionIndex = 0;
       }
}

    // 4. shuffleQuestions()
    shuffleQuestions(){
        for (let i = this.questions.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
    }


    // 5. checkAnswer(answer)

    checkAnswer(answer){
        let currentQuestion = this.questions[this.currentQuestionIndex];
        if (answer === currentQuestion.answer){
        this.correctAnswers++;
        }
    }

    // 6. hasEnded()
    hasEnded(){
        if (this.currentQuestionIndex < this.questions.length){
            return false;}
    else if (this.currentQuestionIndex === this.questions.length)
        {return true;
    }
}

    // 7. filterQuestionsByDifficulty()    
    filterQuestionsByDifficulty(difficulty){
        if(difficulty < 1 || difficulty > 3 || typeof difficulty !== "number"){
            return 
        }
        this.questions = this.questions.filter(function(element){
            return element.difficulty === difficulty;
        })
    }


    // 8. averageDifficulty()
    averageDifficulty(){
        const totalDifficulty = this.questions.reduce(function(total,question){
            return total + question.difficulty;
        },0)
        
        return totalDifficulty / this.questions.length;
    }
    

}
