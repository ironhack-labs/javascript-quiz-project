class Quiz {
    constructor(questions, timeLimit, timeRemaining){
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = this.correctAnswers
        this.currentQuestionIndex = this.currentQuestionIndex
        
    }
        correctAnswers = 0
        currentQuestionIndex = 0
    
        getQuestion() {
        return this.questions[this.currentQuestionIndex];   
        }

        moveToNextQuestion(){
           this.currentQuestionIndex +=1;
        }

        shuffleQuestions(){
            for (let i = this.questions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
            }
        }
        
        

        checkAnswer(answer){
            this.checkAnswer = this.checkAnswer;
                this.correctAnswers +=1;
            }

        hasEnded(){
         if(this.currentQuestionIndex < this.questions.length){
            return false;
         }
         else if (this.currentQuestionIndex = this.questions.length){ 
            return true;}
        }    
            
        }
       
    

    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)

    // 2. getQuestion()
    
    // 3. moveToNextQuestion()

    // 4. shuffleQuestions()

    // 5. checkAnswer(answer)

    // 6. hasEnded()
