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
        for (let i = 0; i < this.questions.length; i++) {
          const randomIndex = Math.floor(Math.random() * this.questions.length);
          const temp = this.questions[i];
          this.questions[i] = this.questions[randomIndex];
          this.questions[randomIndex] = temp;
        }
    }
    // 5. checkAnswer(answer)
    checkAnswer(answer){
        const currentQuestion = this.getQuestion();
        if (answer === currentQuestion.answer) {
            this.correctAnswers++;
        }
    }

    // 6. hasEnded()
    hasEnded() {
        return this.currentQuestionIndex === this.questions.length;
    }

    filterQuestionsByDifficulty(difficulty) {
        return this.questions.filter((question) => question.difficulty === difficulty);
    }

    averageDifficulty() {
        const totalDifficulty = this.questions.reduce((sum, question) => sum + question.difficulty, 0);
        return totalDifficulty / this.questions.length;
    }
}