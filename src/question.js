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
    for (let i = this.choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
    
        // Swap elements array[i] and array[j]
        [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
        }

    }

}

// shuffleChoices() method

// Shuffles the elements stored in the choices array of the Question.

// should be defined.

// should be a function.

// should receive no arguments.

// should shuffle the elements stored in the choices array property.
