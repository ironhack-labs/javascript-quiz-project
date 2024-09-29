class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining, correctAnswers = 0, currentQuestionIndex = 0) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = correctAnswers;
        this.currentQuestionIndex = currentQuestionIndex;
    }

    // 2. getQuestion()
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex ++
    }

    // 4. shuffleQuestions()
    shuffleQuestions() {
        this.questions.sort(() => Math.random() - 0.5);
    }

    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        if (answer) this.correctAnswers++
    }

    // 6. hasEnded()
    hasEnded(){
        return this.currentQuestionIndex === this.questions.length;
    }

    // filterQuestionsByDifficulty(difficulty)
    filterQuestionsByDifficulty(difficulty) {
        if (typeof difficulty === 'number' && difficulty >= 1 && difficulty <= 3) this.questions = this.questions.filter(q => q.difficulty === difficulty);
    }


    averageDifficulty() {
        return this.questions.length ? this.questions.reduce((sum, q) => sum + q.difficulty, 0) / this.questions.length : 0;
    }
    
}