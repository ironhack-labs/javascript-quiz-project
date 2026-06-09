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
    const current = this.getQuestion();
    if (current.answer === answer) {
        this.correctAnswers += 1;
    }
}
    // 6. hasEnded()
hasEnded() {
    return this.currentQuestionIndex === this.questions.length;
}

// 7. filterQuestionsByDifficulty()
filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
        this.questions = this.questions.filter(q => q.difficulty === difficulty);
    }
} 

// 8. averageDifficulty()
averageDifficulty() {
    if (this.questions.length === 0) {
        return 0;
    }
    const total = this.questions.reduce((sum, q) => sum + q.difficulty, 0);
    return total / this.questions.length;
}
}