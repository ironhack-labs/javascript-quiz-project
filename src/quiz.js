
// 1. constructor (questions, timeLimit, timeRemaining)
class Quiz {
    constructor(questionsValue, timeLimitValue, timeRemainingValue) {
    this.questions = questionsValue
     this.timeLimit = timeLimitValue
     this.timeRemaining = timeRemainingValue
    this.correctAnswers = 0
    this.currentQuestionIndex = 0

    }

    // 2. getQuestion()
    getQuestion() {
        const currentQuestion = this.questions[this.currentQuestionIndex]
        return currentQuestion

}
    // 3. moveToNextQuestion()
    moveToNextQuestion() {
        return this.currentQuestionIndex++
    }

    // 4. shuffleQuestions()

    shuffleQuestions() {
        this.questions.sort(() => Math.random() - 0.5);
    }




    checkAnswer(answer) {
        return this.correctAnswers++
    }

    hasEnded() {

        if (this.currentQuestionIndex === this.questions.length) {
            return true  
        } 
        else {
            return false
        }
    }
    // day 2 
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





// YOUR CODE HERE:
    //
   


    
  



    // 5. checkAnswer(answer)

    // 6. hasEnded()
