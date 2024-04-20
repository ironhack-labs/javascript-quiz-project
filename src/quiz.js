class Quiz {
    // YOUR CODE HERE:
    //
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
       this.currentQuestionIndex += 1; 
    }

    shuffleQuestions(){
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
        
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
            }
    }

    checkAnswer(userAnswer){
        if(this.questions[this.currentQuestionIndex].answer === userAnswer) {
            this.correctAnswers += 1;
        }
    }

    hasEnded() {
        if(this.currentQuestionIndex < this.questions.length) {
            return false;
        } else {
            return true;
        }
    }
    filterQuestionsByDifficulty(userDifficulty) {
        if(userDifficulty >= 1 && userDifficulty <= 3) {
            this.questions = this.questions.filter(question => question.difficulty === userDifficulty);
            // original array needs to be update as "filter" does not modify array but gives new one
        }
    }
    averageDifficulty(){
        let totalDifficulties = this.questions.reduce((acc, question) => {
                                    return acc + question.difficulty;
                                }, 0) // here I have to pass 0 otherwise I add object as first accumulator
        return totalDifficulties/this.questions.length;
    }   
}



// In the src/Quiz.js file, implement the averageDifficulty() method.

// You should use the reduce() method to sum the difficulty of all the questions and then divide the sum by the number of questions to get the average difficulty.



// averageDifficulty() method:

// should be defined.

// should be a function.

// should receive no arguments.

// should return the average difficulty (number) of the questions in the quiz