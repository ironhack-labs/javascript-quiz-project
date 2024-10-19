class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0; 
    }

    // 2. getQuestion()

    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion()

    moveToNextQuestion() {
        this.currentQuestionIndex += 1;
    }

    // 4. shuffleQuestions()

    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    // 5. checkAnswer(answer)

    checkAnswer(answer) {
        if (answer === this.questions[this.currentQuestionIndex].answer) {
            this.correctAnswers += 1;
            return true;
        } 
    }

    // 6. hasEnded()

    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        }
        return true;
    }


    filterQuestionsByDifficulty(difficulty) {
        if (typeof difficulty === 'number' && difficulty >= 1 && difficulty <= 3) {
            this.questions = this.questions.filter(q => q.difficulty === difficulty);
        }    
    }

    averageDifficulty() {
        const totalDifficulty = this.questions.reduce((acc, question) => {
            return acc + question.difficulty;
        }, 0);
        return totalDifficulty / this.questions.length;
    }

}