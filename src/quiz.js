class Quiz {
    
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
        this.currentQuestionIndex ++;
    }

    shuffleQuestions() {
        return this.questions.sort(() => Math.random() -0.5);
    }

    checkAnswer(answer){
           return this.correctAnswers ++;
    }

    hasEnded() {
        if(this.currentQuestionIndex < this.questions.length){
            return false
        } else if (this.currentQuestionIndex === this.questions.length){
            return true;
        }
    }

    // Day 2
    filterQuestionsByDifficulty(difficulty) {
        if( difficulty < 1 || difficulty > 3 || typeof difficulty !== "number" ){
            return;
        }

        const filteredQuestions = this.questions.filter((question) =>{
            return question.difficulty === difficulty;
        })

        this.questions = filteredQuestions;

        return this.questions;
    }
    averageDifficulty() {
        if(this.questions.length === 0){
            return 0;
        }

        const sumDifficulty = this.questions.reduce((sum, question) => sum + question.difficulty, 0);
          return sumDifficulty / this.questions.length;
        }
}



