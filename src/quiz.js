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
    // 2. getQuestion()
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex ++;
    }

    // 4. shuffleQuestions()
    shuffleQuestions() {
        this.questions.sort(() => Math.random() - 0.5);
        return this.questions;
    }

    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        if (answer === currentQuestion.answer) {
            this.correctAnswers++;
        }
    }

    // 6. hasEnded()
    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        }
        else if (this.currentQuestionIndex === this.questions.length) {
            return true;
        }
    }



// Day 2
// filterQuestionsByDifficulty()
    filterQuestionsByDifficulty(difficulty) {
        if (typeof difficulty !== 'number' || difficulty < 1 || difficulty > 3) {
            return this.question;
        };
        
    
        this.questions = this.questions.filter(question => question.difficulty === difficulty);
       
        return this.questions;
        }

// averageDifficulty()
    averageDifficulty(){
        const totalDifficulty = this.questions.reduce((acc,question) => acc + question.difficulty, 0);
        return totalDifficulty / this.questions.length
    }
}



// Day 3
