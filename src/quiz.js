class Quiz {
    // YOUR CODE HERE:
    constructor (questions, timeLimit, timeRemaining){
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
        this.currentQuestionIndex++;
    }

    shuffleQuestions(){
        for(let i = this.questions.length - 1 ; i > 0 ; i--){
            // generating a randoum index between 0 and i
            const j = Math.floor(Math.random() * (i + 1));

            // swaping the elments
            let temp = this.questions[i];
            this.questions[i] = this.questions[j];
            this.questions[j] = temp;
        }
    }

    checkAnswer(answer){
        if(answer === this.getQuestion().answer)
            this.correctAnswers++;
    }

    hasEnded(){
        return this.currentQuestionIndex === this.questions.length;
    }
    filterQuestionsByDifficulty(difficulty){
        if( difficulty >= 1  && difficulty <= 3 )
            return this.questions.filter(question => question.difficulty === difficulty);
        return this.questions;
    }
    averageDifficulty(){
        const sumDifficulty = this.questions.reduce((acc,question) => {
            return acc + question.difficulty;
        } , 0);
        return sumDifficulty / this.questions.length;
    }
}




