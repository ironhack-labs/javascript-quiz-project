class Quiz {
    constructor (questions, timeLimit, timeRemaining) {
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
        for (let i = 0; i < this.questions.length; i++){
            let j = Math.floor(Math.random() * this.questions.length);
            let tempVar = this.questions[i];
            this.questions[i] = this.questions[j];
            this.questions[j] = tempVar;
        }
        return this.questions;
    }

    checkAnswer(answer) {
        const currentQuestion = this.getQuestion();
        if (answer === currentQuestion.answer) {
            this.correctAnswers++;
        }
    }

    hasEnded() {
        return this.currentQuestionIndex === this.questions.length;
    }

    filterQuestionsByDifficulty(difficulty) {
        if (difficulty < 1 || difficulty > 3 || typeof difficulty !== "number") {
            return;
        }
       const filterQuestion =  this.questions.filter((newDifficulty) => {
        return newDifficulty.difficulty === difficulty;
    

       });
       this.questions = filterQuestion;
       return this.questions;
    }

    averageDifficulty() {
        const sumDifficulty = this.questions.reduce((sum, question) => {
            const newTotal = sum + question.difficulty;
            return newTotal;
        }, 0);
        return sumDifficulty / this.questions.length; 

    }
}
