class Quiz {
    // YOUR CODE HERE:
    //
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }

    shuffleQuestions() {
        for (let i = this.questions.length -1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[randomIndex]] = [this.questions[randomIndex], this.questions[i]];
           }
    }

    checkAnswer(answer) {
        const currentQuestion = this.questions[this.currentQuestionIndex].answer;
        if (answer === currentQuestion) {
            this.correctAnswers++;
        }
    }

    hasEnded() {
        if (this.currentQuestionIndex === this.questions.length) {
            return true
        } else return false;
    }

    filterQuestionsByDifficulty(difficulty) {
//should not change the 'questions' array if the 1st argument is not a number between 1 and 3
        if (![1, 2, 3].includes(difficulty)){
        return; 
    }
// should update the 'questions' array with the questions filtered by difficulty
    // if (!this.originalQuestions) { 
    //     this.originalQuestions = [this.questions];
    // }
    // should receive 1 argument (difficulty)
    // this.questions = this.originalQuestions.filter(question)

    const difficultyFilteredQuestions = this.questions.filter((element) => {
        if (element.difficulty === difficulty) {return true};
    })
    this.questions = difficultyFilteredQuestions    
    }

    averageDifficulty () {
        if (this.questions.length === 0)
            return 0;
        const totalDifficulty = this.questions.reduce((acc, currentElement) => {
            return acc + currentElement.difficulty;
        }, 0);
        return totalDifficulty / this.questions.length;
    }
}

