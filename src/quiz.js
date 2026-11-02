class Quiz {

    constructor (questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;

    }

    getQuestion(){
        return this.questions[this.currentQuestionIndex];
        //this.questions is an array
        //this.currentQuestionsIndex is the number of the position .IndexOf()
        //when we want to retrieve an item from an array we have to use []
        //array[index]
    }

    moveToNextQuestion(){
        return this.currentQuestionIndex++;
        //we only want to change the index
    }


    shuffleQuestions(){
        this.questions.sort(() => Math.random()-0.5);
    }
    // Uses sort() to shuffle the questions array.
    // The sort() method compares two questions at a time (a and b).
    // a represents the first question being compared, and b represents the second.
    // Math.random() - 0.5 generates a random positive or negative number.
    // sort() uses this result to decide which question (a or b) should come first.
    // This changes the order of the questions randomly instead of sorting them by a specific value.


    checkAnswer(answer){
        if(this.questions[this.currentQuestionIndex].answer === answer){
            this.correctAnswers++;
        }
    }
    // Uses an if statement to check whether the submitted answer is correct.
    // Accesses the current question in the questions array and retrieves its correct answer.
    // Compares the correct answer with the answer passed as an argument.
    // If they match, increments correctAnswers by 1.


    hasEnded(){
        if(this.currentQuestionIndex < this.questions.length){
            return false;
        } else if (this.currentQuestionIndex === this.questions.length) {
            return true;
        } 
    }
    //classic if statement with two conditions: one that sees if the position of the current question is < questions array lenght;
    //the second condition checks if these two are the same
    //purpose, see if the quiz has ended


    filterQuestionsByDifficulty(difficulty){
        if (typeof difficulty === "number" && difficulty >= 1 && difficulty <=3)
            {
            this.questions = this.questions.filter(question => question.difficulty === difficulty);
            }
    }
    //  checks whether the difficulty argument passed to the method is a number using typeof difficulty === "number".
    //  prevents the method from accepting other data types, such as strings or booleans.
    //  then checks whether the number is between 1 and 3 (inclusive), using difficulty >= 1 and difficulty <= 3.
    //  && operator means that all three conditions must be true for the code inside the if statement to execute.
    //filter
    // "question" represents each Question object in the array.
    // checks if the question's difficulty matches the selected difficulty.
    // if it matches, the question is kept; otherwise, it is removed.
    // the filtered array replaces the original questions array.
    // if the difficulty is invalid, the original array remains unchanged.

    averageDifficulty(){
        const totalofDifficulty= this.questions.reduce((accumulator, question) => accumulator + question.difficulty, 0);
        return totalofDifficulty/this.questions.length;
            
        }

    //creates a new variable in order to calculate the sum of all the difficult questions (sum + number.difficultypropery)
    // then divide this new variable with the questions length
}
