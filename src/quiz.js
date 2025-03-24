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

    // 2. getQuestion()
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }

    // 4. shuffleQuestions()
    shuffleQuestions() {
        let arrayQuestionSize = this.questions.length;

        while (arrayQuestionSize !== 0) {
            let randomPosQuestion = Math.floor(Math.random() * arrayQuestionSize);
            arrayQuestionSize--;

            [this.questions[arrayQuestionSize], this.questions[randomPosQuestion]] = [this.questions[randomPosQuestion], this.questions[arrayQuestionSize]];
        }
    }

    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        this.questions.forEach((question) => {
            if (question.answer === answer) {
                this.correctAnswers++;
            }
        });
    }

    // 6. hasEnded()
    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) return false;
        if (this.currentQuestionIndex === this.questions.length) return true;
    }

    filterQuestionsByDifficulty(difficulty) {
        if (difficulty < 1 || difficulty > 3) {
            return;
        }
        if (typeof difficulty === "string") return;
        const filteredQuestions = this.questions.filter( question => question.difficulty === difficulty);
        this.questions = filteredQuestions;
        return this.questions;
    }
    averageDifficulty() {
        if (this.questions.length === 0) return 0; // If don't have questions, return 0

        const totalDifficulty = this.questions.reduce((sum, question) => sum + question.difficulty, 0);
        return totalDifficulty / this.questions.length;
    }
}

    