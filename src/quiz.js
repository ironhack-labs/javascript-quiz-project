
class Quiz{
    constructor(questions, timeLimit, timeRemaining){
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
        for (let i = 0; i < this.questions.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            let temp = this.questions[i];
            this.questions[i] = this.questions[j];
            this.questions[j] = temp;
        }
    }
    
       
        checkAnswer(answer){

        const currentQuestion = this.getQuestion();
        if (currentQuestion.answer === answer){
            this.correctAnswers++;
        }
    
    }
    hasEnded(){
        if (this.currentQuestionIndex < this.questions.length){
            return false;
        }else if 
            (this.currentQuestionIndex === this.questions.length){
                return true;
        
        }
    
    }
    
    filterQuestionsByDifficulty(difficulty){
    
        if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
            console.log(`Difficulty is not between 1 and 3.`);
             } else{
             this.questions = this.questions.filter(question => question.difficulty === difficulty)};
        }

        averageDifficulty() {
            const sum = this.questions.reduce(function(acc, question) {
                return acc + question.difficulty;
            }, 0);
        
            return sum / this.questions.length;
        }
        
    }
    

