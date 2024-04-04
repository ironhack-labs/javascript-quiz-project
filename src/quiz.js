class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor (questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    getQuestion(){
        return this.questions[this.currentQuestionIndex];
    }

    moveToNextQuestion(){
        this.currentQuestionIndex++;
    }
    shuffleQuestions(){
        const array = this.questions;
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        this.questions = array;

    }

    checkAnswer(answer){
        this.shuffleQuestions();
        // console.log(this)
        this.correctAnswers++;
    }
    // 2. getQuestion()
    
    // 3. moveToNextQuestion()

    // 4. shuffleQuestions()

    // 5. checkAnswer(answer)

    hasEnded() {
        if(this.currentQuestionIndex < this.questions.length) {
            return false
        } else if(this.currentQuestionIndex === this.questions.length){
            return true
        }
        
            

    }
    
}