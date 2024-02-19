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

    // 2. getQuestion()
    getQuestion() {

        return this.questions(this.currentQuestionIndex);
    }
    // 3. moveToNextQuestion()
    moveToNextQuestion(){

        this.currentQuestionIndex++;
    }
// 4. shuffleQuestion()
    shuffleQuestions(){ 
    for (let i = this.questions.length - 1; i > 0; i--) {
        const randomize = Math.floor(Math.random() * (i + 1));
        [this.questions[i], this.questions[randomize]] = [this.questions[randomize], this.questions[i]];
    };
};


    // 5. checkAnswer(answer)
    checkAnswer(answer) {
        this.answer = answer;
        if (this.answer){
            this.correctAnswers++
        }
    }


    // 6. hasEnded()
}

hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) { return false }
    else { return true }
}
