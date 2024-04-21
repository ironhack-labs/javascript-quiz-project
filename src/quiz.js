class Quiz {
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
        this.currentQuestionIndex++;
    }
    
    shuffleQuestions() {
        for (let i = this.questions.length -1; i > 0 ; i--) {
            let j  = Math.floor(Math.random()*(i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    checkAnswer(answer) {
        const currentQuestion = this.getQuestion();
        if (answer === currentQuestion.answer) {
            this.correctAnswers++;
        }
    }

    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        } else if (this.currentQuestionIndex === this.questions.length) {
        return true;
    }
}
    filterQuestionsByDifficulty(difficulty) {
        this.questions = this.questions.filter((element) => {
            if (difficulty > 0 && difficulty <= 3){
                return element.difficulty === difficulty;
            } else {
                return this.questions;
            }
        });
        }

    averageDifficulty() {
        const totalDifficulty = this.questions.reduce((acc, question) => acc + question.difficulty, 0);
        return totalDifficulty / this.questions.length
    }
    
}
