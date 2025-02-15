class Quiz { 
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions; // Stores the questions array
        this.timeLimit = timeLimit; // Stores the total time limit
        this.timeRemaining = timeRemaining; // Stores the remaining time
        this.correctAnswers = 0; // Initializes the correct answer count
        this.currentQuestionIndex = 0; // Initializes the correct answer count
    }

    getQuestion(){
        return this.questions[this.currentQuestionIndex]; // Initializes the correct answer count
    }

    moveToNextQuestion(){
        this.currentQuestionIndex++; // Moves on to the next question
    }

    shuffleQuestions(){
        this.questions.sort(() => Math.random() - 0.5); // Shuffles randomly with the Fisher-Yates algorithm the questions
    }

    checkAnswer(answer){
        if (this.getQuestion().answer === answer){ // It checks if the questions is correct
            this.correctAnswers++; // It adds it to the correct Answers array
           }  
    }

    hasEnded(){
        if (this.currentQuestionIndex < this.questions.length){ // Continues because it reads that it has not reached the end of the questions array.
            return false;
        }
        else if (this.currentQuestionIndex === this.questions.length){ // It stops because it reads that it has reached the end of the questions array.
            return true;
        }
    }

    filterQuestionsByDifficulty(difficulty){
        if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3){ // Check if difficulty is a number between 1 and 3
            return ;
        }
        this.questions = this.questions.filter(question => question.difficulty === difficulty); // Update the questions array and filter through
    }

    averageDifficulty(){
    const totalDifficulty = this.questions.reduce((acc, currentValue) => acc + currentValue.difficulty, 0); // Add the total difficulty
    const count = this.questions.length; // Count the amount of questions
    return totalDifficulty / count; // Make the calculation of total difficulty / amount of questions
        
    }
}

//  const sumDifficulty = this.questions.reduce(function(sum, question) {
//     return sum + question.difficulty;

// }, 0);
//     return sumDifficulty / this.questions.length;
// } 

