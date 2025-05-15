class Quiz {

    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)

    constructor(questions, timeLimit, timeRemaining)
     {  
        this.questions = questions; 
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0; 
    }


    // 2. getQuestion()

    getQuestion() {
        return this.questions[this.currentQuestionIndex];

    }
    
    // 3. moveToNextQuestion()

    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }

    // 4. shuffleQuestions()

    shuffleQuestions() {
        let currentIndex = this.questions.length;
        while(currentIndex != 0){
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            var temp = this.questions[currentIndex];
            this.questions[currentIndex]= this.questions[randomIndex];
            this.questions[randomIndex] = temp;
        }
        
   
    }


    // 5. checkAnswer(answer)

    checkAnswer(answer){
        let currentQuestion = this.getQuestion();
        if (currentQuestion.answer == answer){
            this.correctAnswers++;
        }            

        }   

    hasEnded() {
        if(this.currentQuestionIndex < this.questions.length){
            return false;
        }
        else{
            return true;
        }
    }
    
    filterQuestionsByDifficulty(difficulty) {

        if( difficulty >= 1 && difficulty <=3){
            this.questions = this.questions.filter(question =>{ 
                if(question.difficulty === difficulty){
                    return true;
                }
        })
        return this.questions
        }else{
            return this.questions
        }
        

        }

        averageDifficulty() {
            
            const totalDifficulty = this.questions.reduce ((acc, question) => {
                return acc + question.difficulty;

            }, 0); 

            const average = totalDifficulty / this.questions.length; 
            return average 
        }
    

}

// const questions = [
//         {
//           text: "Question 1",
//           choices: ["a", "b", "c"],
//           answer: "a",
//           difficulty: 1,
//         },
//         {
//           text: "Question 2",
//           choices: ["d", "e", "f"],
//           answer: "d",
//           difficulty: 2,
//         },
//         {
//           text: "Question 3",
//           choices: ["g", "h", "i"],
//           answer: "g",
//           difficulty: 2,
//         },
//         {
//           text: "Question 4",
//           choices: ["j", "k", "l"],
//           answer: "j",
//           difficulty: 1,
//         },
//         {
//           text: "Question 5",
//           choices: ["m", "n", "o"],
//           answer: "m",
//           difficulty: 3,
//         },
//       ];
// let question1 = new Quiz(questions, "test", 60);
    
// console.log(question1.filterQuestionsByDifficulty(1))
    
