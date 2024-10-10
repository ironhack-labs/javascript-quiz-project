class Quiz {
    // YOUR CODE HERE:
    //
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions; // array
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0; 
        this.currentQuestionIndex = 0;
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }
    
    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }

    shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
    
        const randomPosition = Math.floor(Math.random() * (i + 1));
        const initialPosition = this.questions[i];
        // switching positions
        this.questions[i] = this.questions[randomPosition];
        this.questions[randomPosition] = initialPosition;
    }}

    checkAnswer(answer) {
        if(answer === this.questions[this.currentQuestionIndex].answer) {
        this.correctAnswers++;
        }
    }

    hasEnded() {
        if(this.currentQuestionIndex === this.questions.length) {
            return true;
        }
        else if (this.currentQuestionIndex < this.questions.length) {
            return false;
        }
    }

    filterQuestionsByDifficulty(difficulty) {
        
        if(typeof difficulty === "number" && difficulty >= 1 && difficulty <= 3) {
        const questionsWithSpecifiedDifficulty = this.questions.filter(function(questionObj) {
            return questionObj.difficulty === difficulty;
        })
        this.questions = questionsWithSpecifiedDifficulty;
        return this.questions;
    }
    }

    averageDifficulty() {
        const total = this.questions.reduce(function(acc, currentQuestionObj) {
            return acc + currentQuestionObj.difficulty
        }, 0)
        return total / this.questions.length
    }
};