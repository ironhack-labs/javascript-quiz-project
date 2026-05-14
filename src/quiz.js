class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }

    // 2. getQuestion()
    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        this.currentQuestionIndex++
    }

    // 4. shuffleQuestions()
    shuffleQuestions() {

        for(let i=0; i < this.questions.length; i++) {
            
            const j = Math.floor(Math.random() * this.questions.length);

            // swap elements
            const val = this.questions[i]
            this.questions[i] = this.questions[j]
            this.questions[j] = val
        }
    }

    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        if (answer === this.questions[this.currentQuestionIndex].answer) {
            this.correctAnswers++
        }
    }

    // 6. hasEnded()
    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false
        } else {
            return true
        }
    }

    filterQuestionsByDifficulty(difficulty) {
        if (typeof difficulty === 'number' && difficulty >= 1 && difficulty <= 3) {
            this.questions = this.questions.filter((question) => {
                return question.difficulty === difficulty;
            });
        }
        // If invalid, do nothing
        // console.log(this.questions)
    }

    averageDifficulty() {
        if (this.questions.length === 0) return 0;
        
        const sum = this.questions.reduce(
            (acc, question) => acc + question.difficulty, 0);
        return sum / this.questions.length;
    }

    showQuestion() {
        // this.currentQuestionIndex
        const contentObj = document.getElementByClassName("content")
        console.log("contentObj = ", contentObj)
    }
    // const mainTitle = document.getElementById("main-title")
}


