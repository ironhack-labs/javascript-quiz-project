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
        const array = this.questions;
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        this.questions = array;

    }

    checkAnswer(answer) {
        const expectedAnswer = this.questions[this.currentQuestionIndex].answer;
        if (answer === expectedAnswer) {
            this.correctAnswers++
        }
    }


    // 5. checkAnswer(answer)

    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false
        } else if (this.currentQuestionIndex === this.questions.length) {
            return true
        }



    }

    filterQuestionsByDifficulty(difficulty) {
        // console.log(difficulty);
        // console.log(this.questions);
        if (typeof difficulty === "number") {
            const temp = this.questions.filter((question) => question.difficulty === difficulty)
            this.questions = temp;
        }


        console.log(this.questions);
    }

    averageDifficulty() {
        const average = this.questions.reduce((acc, currVal) => (acc + currVal.difficulty / this.questions.length), 0);
        console.log(average)
        return average
    }

}