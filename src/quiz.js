class Quiz {
    constructor(questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }  
    
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }   

    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }

    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    checkAnswer(selectedChoice) {
        const currentQuestion = this.getQuestion();
        if (selectedChoice === currentQuestion.answer) {
            this.correctAnswers++;
            return true;
        }
        return false;
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length || this.timeRemaining <= 0;
    }

    filterQuestionsByDifficulty(difficulty) {
        if(difficulty >= 1 && difficulty <= 3){
            this.questions = this.questions.filter(
        (question) => question.difficulty === difficulty)
        }
        else{
            return this.questions;
        }
            return this.questions;
        }

        averageDifficulty(){
       const total = this.questions.reduce((accumulator, currentElement) => {
            return accumulator += currentElement.difficulty;
       },0)
       return total / this.questions.length;
    }
    

}
