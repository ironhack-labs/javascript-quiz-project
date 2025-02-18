class Quiz {    
    constructor (questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers=0;
        this.currentQuestionIndex=0;
    }
    

    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    moveToNextQuestion(){
        this.currentQuestionIndex++;
    }

    shuffleQuestions(){
        for (let i = this.questions.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
        console.log(this.questions)
    }
    

    checkAnswer(answer){
        if (answer === this.getQuestion().answer) {
          this.correctAnswers++;
        }
    }

    hasEnded(){
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        } else if (this.currentQuestionIndex = this.questions.length) {
            return true;
        }
    }


    filterQuestionsByDifficulty(difficulty) {
        if (difficulty >= 1 && difficulty <= 3) {
            this.questions = this.questions.filter((question) => question.difficulty === difficulty);
        }
    }
    
    averageDifficulty() {
        const reduce = this.questions.reduce((accumulator, current) => accumulator + current.difficulty, 0);

        const avg = reduce / this.questions.length;

        return avg;
    }
    
}
