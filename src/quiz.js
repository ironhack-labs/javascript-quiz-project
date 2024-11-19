class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;             // Array of Question objects
        this.timeLimit = timeLimit;             // Number (time limit for the quiz)
        this.timeRemaining = timeRemaining;     // Number (time remaining for the quiz)
        this.correctAnswers = 0;                // Initially set to 0
        this.currentQuestionIndex = 0;          // Initially set to 0
    }
    // 2. getQuestion()
    getQuestion() {
        return this.questions[this.currentQuestionIndex]; // Return the current question
    }
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex += 1; // Increment the index to move to the next question
    }
    // 4. shuffleQuestions()
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Random index
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]]; // Swap
        }
    }
    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        const currentQuestion = this.getQuestion();
        if (currentQuestion.answer === answer) {
            this.correctAnswers += 1;
        }
        
    }
    // 6. hasEnded()
    hasEnded() {
        // Return true if the quiz has ended (currentQuestionIndex equals questions length)
        return this.currentQuestionIndex >= this.questions.length;
    }

    filterQuestionsByDifficulty(difficulty) {
        if (difficulty >= 1 && difficulty <= 3) { // Ensure difficulty is valid
            this.questions = this.questions.filter(q => q.difficulty === difficulty);
        }
    }

    averageDifficulty() {
        if (this.questions.length === 0) return 0; // Avoid division by zero
        const totalDifficulty = this.questions.reduce((sum, q) => sum + q.difficulty, 0);
        return totalDifficulty / this.questions.length; // Return average difficulty
    }



    
}