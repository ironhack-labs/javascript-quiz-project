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
        return this.questions[this.currentQuestionIndex]
    }
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }
    // 4. shuffleQuestions()
    shuffleQuestions() {
        this.questions.sort(() => Math.random() - 0.5);
    }
    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        this.correctAnswers++;
    }
    // 6. hasEnded()
    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        }
        else if (this.currentQuestionIndex === this.questions.length) {
            return true
        }
    }

    filterQuestionsByDifficulty(difficulty) {
        if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
            return;
        }
        let filterQuestions = [];
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].difficulty === difficulty) {
                filterQuestions.push(this.questions[i]);
            }
        }
        this.questions = filterQuestions;
    }
    averageDifficulty() {
        const totalSumDifficulty = this.questions.reduce((acc, question) => acc+question.difficulty,0)
        
        return totalSumDifficulty / this.questions.length;

    }   


}