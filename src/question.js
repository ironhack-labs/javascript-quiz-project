class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)
    constructor(text,choices,answer,difficulty){
        this.text = text
        this.choices = choices 
        this.answer = answer
        this.difficulty = difficulty
    }
    shuffleChoices(){
        let randomChoice = [];
        for(let i = this.choices.length - 1; i > 0; i--  ){
            const randomizer = Math.floor(Math.random()* (i+1));
            randomChoice.push([this.choices[i], this.choices[randomizer]] = [this.choices[randomizer], this.choices[i]])
        }
        return randomChoice;
    }
}

// Done for now 