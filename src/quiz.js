class Quiz{
    constructor(questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;

    }

    getQuestion(questions){
        this.questions = questions;

        for(let i=0; i<questions.length; i++){
            currentQuestionIndex = questions[i];
        }

        return questions[currentQuestionIndex];

     }
    
    moveToNextQuestion(){
       // function nextQuestion (){}
        this.currentQuestionIndex++;

     }

    shuffleQuestions(){
        function shuffle (array){
            let currentIndex = array.length;
    
             while (currentIndex > 0) {
    
                const randomIndex = Math.floor(Math.random() * currentIndex);
                 currentIndex--;
    
                [array[currentIndex], array[randomIndex]] =  [array[randomIndex], array[currentIndex]];
             }
         }
    
            return array;    
        }

     

    checkAnswer(answer){
        this.correctAnswers++;
    }

    hasEnded(){
        if(this.currentQuestionIndex === this.questions.length){
            return true;
        }
        else if(this.currentQuestionIndex < this.questions.length){
            return false;
        }

    }
}