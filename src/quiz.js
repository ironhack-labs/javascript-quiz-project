//************4.Organize data and functionality using classes******//
class Quiz {
    // YOUR CODE HERE:
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor(questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    
    }
     // 2. getQuestion() return the item from the questions array 
     // at the position of currentQuestionIndex.
    getQuestion(){ 
        return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion()
    moveToNextQuestion(){
        this.currentQuestionIndex += 1;
    }

    // 4. shuffleQuestions()
    shuffleQuestions(){
        for (let i = this.questions.length - 1; i > 0; i--) {
           const j = Math.floor(Math.random() * (i + 1));
           [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }
    // 5. checkAnswer(answer
    //increase correctAnswers by 1 when called with a correct answer for the current question
    checkAnswer(answer){
        if(this.getQuestion().answer === answer){
            this.correctAnswers += 1;
        }
    }

    // 6. hasEnded()
    hasEnded(){
        return this.currentQuestionIndex >= this.questions.length;

        //return 'true' or 'false' when currentQuestionIndex 
        //is less than the questions array length
    }

//*************************Day 02**************/

    filterQuestionsByDifficulty(difficulty){
        if (difficulty >= 1 && difficulty <= 3 ){
            this.questions = this.questions.filter(questions => questions.difficulty === difficulty);
    }
    }
    averageDifficulty(){
        const avgTotal = this.questions.reduce((acc, question) => {
            return acc + question.difficulty;
        },0);
        return avgTotal / this.questions.length;
    }

}















