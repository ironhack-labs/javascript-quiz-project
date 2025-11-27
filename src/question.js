class Question {
<<<<<<< HEAD
    constructor (text, choices, answer, difficulty){
=======
    // YOUR CODE HERE:
   constructor (text, choices, answer, difficulty){
>>>>>>> 311a1b7734a6ea61227793b654d97e505f3922b6
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }
<<<<<<< HEAD

=======
>>>>>>> 311a1b7734a6ea61227793b654d97e505f3922b6
    shuffleChoices(){
    for (let i = this.choices.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = this.choices[i];
        this.choices[i] = this.choices[j];
        this.choices[j] = temp;
    }
<<<<<<< HEAD
}

}
=======
    
}
}
>>>>>>> 311a1b7734a6ea61227793b654d97e505f3922b6
