class Quiz {
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    };
    // 2. getQuestion()
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    };

    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex++;
    };
    // 4. shuffleQuestions()
    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const randomize = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[randomize]] = [this.questions[randomize], this.questions[i]];
        };
    };


    // 5. checkAnswer(answer)
    checkAnswer(answer) {

        const correctAnswer = this.questions[this.currentQuestionIndex].answer;
        if (answer === correctAnswer) {
            this.correctAnswers++;
        }
    }
    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        } else if (this.currentQuestionIndex === this.questions.length) {
            return true;
        }
    }

}
