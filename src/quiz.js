class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining){
        this.questions=questions;
        this.timeLimit=timeLimit;
        this.timeRemaining=timeRemaining;
        this.correctAnswers=0;
        this.currentQuestionIndex=0;
    }


    // 2. getQuestion()
    getQuestion(){
        return this.questions[this.currentQuestionIndex];
    }
/*
    Questions = [
        {text:, choices:[], answer:[], difficulty:};
        {text:, choices:[], answer:[], difficulty:};
        {text:, choices:[], answer:[], difficulty:};
        {text:, choices:[], answer:[], difficulty:}
    ]
*/



    // 3. moveToNextQuestion()
    moveToNextQuestion(){
       this.currentQuestionIndex +=1;
    }


    // 4. shuffleQuestions() 
    shuffleQuestions(){
        let i = 10;
        while (i>0){
            const randomArrayIndex = Math.floor(Math.random()*(this.questions.length));
            const pichOneAnswer = this.questions[randomArrayIndex];
            this.questions.splice(randomArrayIndex, 1);
            this.questions.push(pichOneAnswer);
            i --;
        }
    }

    // 5. checkAnswer(answer)
    checkAnswer(answer){
        const currentQuestion = this.getQuestion();
        if(answer === currentQuestion.answer){
            this.correctAnswers += 1;
        }
    }


    // 6. hasEnded()
    hasEnded(){
        if(this.currentQuestionIndex===this.questions.length){
        return true;            
        } else {
            return false;
        }
    }

    // 7. filterQuestionsByDifficulty()
    filterQuestionsByDifficulty(difficulty){
        if (difficulty>=1 && difficulty<=3){
            const newVar7 = this.questions.filter( each_question =>{
            return each_question.difficulty === difficulty; 
            })
            this.questions=newVar7;
        }
    }    


    // 8. averageDifficulty()    
    averageDifficulty(){
        const sumDifficulty = this.questions.reduce((accummulative, each_question)=>{
            const valueDifficulty = each_question.difficulty;
            return accummulative + valueDifficulty;
            },0)
        const howManyQuesitons = this.questions.length;
        return sumDifficulty/howManyQuesitons;
    }


}
