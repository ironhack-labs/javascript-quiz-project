class Question {

    
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)
    constructor(text, choices, answer, difficulty){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    // 2. shuffleChoices()

    shuffleChoices(){

        //get a random number
        let randomNumber = Math.floor(Math.random() * 100) + 1;

        //run the loop randomNumber times, swap first and last choices 
        for(let i = 0; i < this.choices.length; i++) {
            let firstChoice = this.choices[i];
            this.choices[i] = this.choices[this.choices.length - 1];
            this.choices[this.choices.length - 1] = firstChoice;
        }

    }

}
