// YOUR CODE HERE:
    
class Quiz {
    constructor(questionsValue, timeLimitValue, timeRemainingValue) {
        
        this.questions = questionsValue
        this.timeLimit = timeLimitValue
        this.timeRemaining = timeRemainingValue
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }
        getQuestion() {
           return this.questions[this.currentQuestionIndex]

        }

        moveToNextQuestion() {
            this.currentQuestionIndex++

        }

        shuffleQuestions() {
            this.questions.sort(() => Math.random() - .5)
        }

        checkAnswer(answer) {
            this.correctAnswers++

        }

        hasEnded() {
            if(this.currentQuestionIndex === this.questions.length){
                return true

        }
        else {
            return false
        }


    }

}


    // 1. constructor (questions, timeLimit, timeRemaining)

    // 2. getQuestion()
    
    // 3. moveToNextQuestion()

    // 4. shuffleQuestions()

    // 5. checkAnswer(answer)

    // 6. hasEnded()


     


