class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining) {
        //questions, timeLimit, timeRemaining, correctAnswers, currentQuestionIndex
        this.questions = questions,
            this.timeLimit = timeLimit,
            this.timeRemaining = timeRemaining,
            this.correctAnswers = 0,
            this.currentQuestionIndex = 0
    }
    // 2. getQuestion()
    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        return this.currentQuestionIndex++
    }
    // 4. shuffleQuestions()
    shuffleQuestions() {
        function shuffle(array) {
            let currentIndex = array.length;

            // While there remain elements to shuffle...
            while (currentIndex != 0) {

                // Pick a remaining element...
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }
        }
        return shuffle(this.questions)
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
        } else if (this.currentQuestionIndex = this.questions.length) {
            return true
        }
    }

    filterQuestionsByDifficulty(level) {
        if (isNaN(difficulty) || !(difficulty > 0 && difficulty < 4) || typeof difficulty != 'number') {
            this.questions = this.questions.filter((eachquestion) => {
                return eachquestion.difficulty == level
            })
        }
    }

    averageDifficulty() {
        let counter = 0
        const average = this.questions.reduce((acc, eachDificulty) => {
            counter++
            return acc + eachDificulty.difficulty
        }, 0)
        return average / counter
    }

}

console.log("prueba")
