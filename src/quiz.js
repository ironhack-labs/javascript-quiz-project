class Quiz {
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }
    
    moveToNextQuestion(){

    this.currentQuestionIndex += 1

    }


    shuffleQuestions(){

        for (let i = this.questions.length - 1; i > 0 ; i--){
            const newQuestions = Math.floor(Math.random() * (i + 1));  //randomIndex re mane it
            [this.questions[i]], this.questions[newQuestions] = [this.questions[newQuestions], this.questions[i]]
            ///[1, 2, 3, 4, 5]    [2, 1, 4, 3, 5]
    }}

    checkAnswer(answer) {
        // if(this.questions){  // how is this possible? I don't know :O
        //     this.correctAnswers += 1
        // }

        if(answer){
            if(this.questions[this.currentQuestionIndex].answer === answer){
                this.correctAnswers++
            } 
        } else {
            alert("Please provide an answer")
        }
    }



   hasEnded(){
    if (this.currentQuestionIndex < this.questions.length){
        return false 
    }
    else{
        return true 
    }
   }

   
}
