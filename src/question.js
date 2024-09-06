class Question {
    // YOUR CODE HERE:
    
    constructor (text, choices, answer, difficulty){

        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

 shuffleChoices(){

    for (let i = this.choices.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];

    }
    }
}


    const question1 = new Question( " What is question 1?" , ["answer1", "answer 2", "answer 3", "answer 4"], "answer 3" , 3);
question1.shuffleChoices();
    const question2 = new Question( " What is question 2?" , ["answer1", "answer 2", "answer 3", "answer 4"], "answer 2" , 2);
    question2.shuffleChoices();
    const question3 = new Question( " What is question 3?" , ["answer1", "answer 2", "answer 3", "answer 4"], "answer 2" , 1);
    question3.shuffleChoices();
    const question4 = new Question( " What is question 4?" , ["answer1", "answer 2", "answer 3", "answer 4"], "answer 1" , 3);  
    question4.shuffleChoices();



 

