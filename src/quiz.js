class Quiz {
    constructor (questions, timeLimit, timeRemaining){
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }
    getQuestion(){
        return this.questions[this.currentQuestionIndex]
    }
    moveToNextQuestion(){
        this.currentQuestionIndex += 1
    }
    shuffleQuestions(){
        this.questions.sort(() => Math.random() - 0.5)
      return this.questions
    }
    checkAnswer(answer){
        if (answer){
            this.correctAnswers +=1
        }
    }
    hasEnded(){
        if (this.currentQuestionIndex < this.questions.length){
            return false
        }
        else if(this.currentQuestionIndex === this.questions.length){
            return true
        }
    }
}
