class Quiz {
    // YOUR CODE HERE:
     
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining) {
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
        
        return this.currentQuestionIndex++
    }

    shuffleQuestions() {
        const shuffle = [];
        for(let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i+1));
            const temp = this.questions[i];
            this.questions[i] = this.questions[j];
            this.questions[j] = temp;      
        }
        return shuffle;
    }
    
    checkAnswer(answer) {
        
        if (this.questions[this.currentQuestionIndex].answer == answer) {
            this.correctAnswers++;
        } 
        return this.correctAnswers;
    }

    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false
        } else if (this.currentQuestionIndex === this.questions.length){
            return true
        }
    }

    filterQuestionsByDifficulty(difficulty) {
        
        if (difficulty >= 1 || difficulty <= 3) {
            this.questions = this.questions.filter(element => {
                return element.difficulty === difficulty;
        });
                return this.questions;
        }
    }

    averageDifficulty() {
        
        const totalDifficulty = this.questions.reduce((acc, currentValue) => {
                console.log(acc);
                console.log(currentValue)
                return acc + currentValue.difficulty  
        }, 0);

        const avgDiff = totalDifficulty / this.questions.length;
        return avgDiff

       
    }     
       
}
        
    
