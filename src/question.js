class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)

    // 2. shuffleChoices()


    constructor(text, choices, answer, difficulty){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    shuffleChoices(){
        let tempChoices = this.choices.slice();
        this.choices = [];
        while(tempChoices.length > 0){
            let randomIndex = Math.floor(Math.random() * tempChoices.length);
            this.choices.push(tempChoices.splice(randomIndex, 1)[0]);
        };
    }
};