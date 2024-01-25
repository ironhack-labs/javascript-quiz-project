class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }
    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }
    moveToNextQuestion() {
        this.currentQuestionIndex += 1
    }
    shuffleQuestions() {
        this.questions.sort(() => Math.random() - 0.5)
        return this.questions
    }
    checkAnswer(answer){
        const currentAnswer = this.questions[this.currentQuestionIndex].answer
        
        if (answer === currentAnswer) {
            this.correctAnswers++
        }
    }
    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false
        }
        else if (this.currentQuestionIndex === this.questions.length) {
            return true
        }
    }
        
        
        
    filterQuestionsByDifficulty(difficulty) {

         if (!isNaN(difficulty) && difficulty > 0 && difficulty < 4) {
    
             const filteredQuestions = this.questions.filter(elm => {
    
                 return elm.difficulty === difficulty
             })
    
             this.questions = filteredQuestions
            }
         }   


    averageDifficulty() {

        const sumDifficulties = this.questions.reduce((acc, elm) => acc + elm.difficulty, 0)

        const totalQuestions = this.questions.length

        const average = sumDifficulties / totalQuestions

        return average
    }

}
