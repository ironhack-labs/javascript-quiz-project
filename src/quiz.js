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
        this.currentQuestionIndex++;
    }
    // 4. shuffleQuestions()
    shuffleQuestions() {
        // Método de Fisher-Yates
        if (!this.questions) {
            return undefined;
        }
        for (let i = this.questions.length - 1; i > 0; i--) {
            // Seleccionar un elemento aleatorio
            const m = Math.floor(Math.random() * (i + 1));

            // Intercambiar el elemento actual con el elemento seleccionado
            [this.questions[i], this.questions[m]] = [this.questions[m], this.questions[i]];
        }

        return this.questions;
    }
    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        if (answer === this.getQuestion().answer) {
            this.correctAnswers ++;
        } 
    }
    // 6. hasEnded()
    hasEnded() {
        return this.currentQuestionIndex === this.questions.length;
    }
    filterQuestionsByDifficulty(difficulty) {
        if (difficulty > 0  &&   difficulty < 4) {
            return this.questions = this.questions.filter((question) => 
                 question.difficulty === difficulty
            );    
        }
    }
    averageDifficulty() {
        return this.questions.reduce((sumOfDifficulty, question) => {
            return sumOfDifficulty += question.difficulty;
            // Using the index (i)
            if (i === this.questions.length -1) {
                return sumOfDifficulty / this.questions.length
            }
        }, 0) /  this.questions.length;
    }
}