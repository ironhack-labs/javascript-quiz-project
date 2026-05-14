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
        this.questions.sort(() => Math.random() - .5);
    }

    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        const currentQuestion = this.getQuestion();

        if (answer === currentQuestion.answer) {
            this.correctAnswers++;
        }
    }

    // 6. hasEnded()
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }

    filterQuestionsByDifficulty(difficulty) {
        if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
            return this.questions;
        }

        this.questions = this.questions.filter((element) => {
            return element.difficulty === difficulty;
        });
    }
    averageDifficulty() {
        const average = this.questions.reduce(function (accumulator, element) {
            return accumulator + element.difficulty;
        }, 0);
        return average / this.questions.length;
    }

}   