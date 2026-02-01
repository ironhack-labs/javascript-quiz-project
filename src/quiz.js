class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0; // Fixed: changed from correctQuestionIndex to currentQuestionIndex
    }
    
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    moveToNextQuestion() {
        this.currentQuestionIndex++; // Fixed: increment index, don't return question
    }

    shuffleQuestions() { 
        for (let i = this.questions.length - 1; i > 0; i--) { // Fixed: changed i-0 to i>0
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    checkAnswer(answer) {
        const currentQuestion = this.getQuestion();
        if (answer === currentQuestion.answer) {
            this.correctAnswers++;
            return true;
        }
        return false;
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
     filterQuestionsByDifficulty(difficulty) {
        // Check if difficulty is a number between 1 and 3
        if (typeof difficulty === 'number' && difficulty >= 1 && difficulty <= 3) {
            // Use filter() to keep only questions with the specified difficulty
            this.questions = this.questions.filter(question => {
                return question.difficulty === difficulty;
            });
        }
        // If difficulty is not valid (not a number between 1-3), do nothing
    }
    averageDifficulty() {
        // Handle edge case: empty questions array
        if (this.questions.length === 0) {
            return 0;
        }
        
        // Use reduce() to sum up all difficulty values
        const totalDifficulty = this.questions.reduce((sum, question) => {
            // Add current question's difficulty to the running sum
            return sum + question.difficulty;
        }, 0); // Start with initial value of 0
        
        // Calculate and return the average
        return totalDifficulty / this.questions.length;
    }
}
