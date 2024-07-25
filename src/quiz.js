class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)

    // 2. getQuestion()
    
    // 3. moveToNextQuestion()

    // 4. shuffleQuestions()

    // 5. checkAnswer(answer)

    // 6. hasEnded()

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
        let tempQuestions = this.questions.slice();
        this.questions = [];
        while(tempQuestions.length > 0){
            let randomIndex = Math.floor(Math.random() * tempQuestions.length);
            this.questions.push(tempQuestions.splice(randomIndex, 1)[0]);
        };
    }

    checkAnswer(answer){
        if(answer === this.questions[this.currentQuestionIndex].answer){
            this.correctAnswers++;
        }
    }

    hasEnded(){
        return this.currentQuestionIndex < this.questions.length ? false : true
    }

    // filterQuestionsByDifficulty(difficulty){
    //     if(difficulty > 0 && difficulty < 4){
    //         let tempQuestionsByDifficulty = [];
    //         for(let i = 0; i < this.questions.length; i++){
    //             if(this.questions[i].difficulty === difficulty){
    //                 tempQuestionsByDifficulty.push(this.questions[i])
    //             }
    //         }   
    //         this.questions = tempQuestionsByDifficulty;
    //     }
    // }


    // filterQuestionsByDifficulty(difficulty){
    //     return this.questions.sort((q1, q2) => {
    //         return q1.difficulty - q2.difficulty;
    //     })
    // }

    filterQuestionsByDifficulty(difficulty) {
        if(difficulty > 0 && difficulty < 4){
            this.questions = this.questions.filter(question => question.difficulty === difficulty);
        }
        return this.questions;
    }

    // averageDifficulty(){
    //     let sum = 0
    //     this.questions.forEach(function(question){
    //         sum += question.difficulty;
    //     });
    //     return sum / this.questions.length;
    // }

    averageDifficulty(){
        const totalDif = this.questions.reduce(function(sum, currentQuestion){
            return sum + currentQuestion.difficulty;
        }, 0);
        return totalDif / this.questions.length;
    }
    
}

console.log(new Quiz().filterQuestionsByDifficulty(1));
