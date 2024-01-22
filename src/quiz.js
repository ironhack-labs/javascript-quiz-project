
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
}

    








// YOUR CODE HERE:
    //
   


    
  



    // 5. checkAnswer(answer)

    // 6. hasEnded()
