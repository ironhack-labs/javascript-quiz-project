class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
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
        return this.currentQuestionIndex ++;
    }

    shuffleQuestions() {
        for (let i = 0; i < this.questions.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
        return this.questions;
    }

    checkAnswer(answer) {
        const question = this.getQuestion()

        console.log(answer);

        if (answer === question.answer) {
            return this.correctAnswers ++;
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
        if (typeof difficulty !== 'number' || difficulty < 1 || difficulty > 3) {
            return;
        }
        const filteresQuestions = this.questions.filter((question) => question.difficulty === difficulty);
        this.questions = filteresQuestions;
    }

    averageDifficulty() {
        const total = this.questions.reduce((acc, curr) => {
            const sum = acc + curr.difficulty;
            return sum;
        }, 0);
        return total / this.questions.length;

        //return this.questions.reduce((acc, curr, index, array) => acc + curr.difficulty / array.length, 0);
        
    }
}


