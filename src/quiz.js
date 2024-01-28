class Quiz {
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;

    };

    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    };
    
    moveToNextQuestion(){
        this.currentQuestionIndex += 1;
    };

    shuffleQuestions(){
        for (let i = this.questions.length - 1; i > 0; i--) { 
          const j = Math.floor(Math.random() * (i + 1)); 
          [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];  
        }; 
    }; 

    checkAnswer(answer) {
        const question = this.getQuestion();
        const isCorrectAnswer = question.answer === answer;
        if (isCorrectAnswer) {
         this.correctAnswers ++;
        } 
     };   
    hasEnded(){
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        }
        else if (this.currentQuestionIndex === this.questions.length) {
            return true;
        }
    };

    filterQuestionsByDifficulty(difficulty) {
            if (difficulty < 1 || difficulty > 3 || typeof difficulty !== "number") {
              return;
            }
        
            const filteredQuestions = this.questions.filter((question) => {
              return question.difficulty === difficulty;
            });

            return filteredQuestions;
          }

    averageDifficulty() {
        const sumDifficulty = this.questions.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.difficulty
        }, 0);
        const average = sumDifficulty/this.questions.length;
        return average;
    }
    };
    