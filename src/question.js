class Question {
    // YOUR CODE HERE:
    //
    constructor(text, choices, answer, difficulty){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }
    // Fisher-Yates shuffle algorithm
    shuffleChoices(){
        for(let i = this.choices.length - 1 ; i > 0 ; i--){
            // generating a randoum index between 0 and i
            const j = Math.floor(Math.random() * (i + 1));

            // swaping the elments
            let temp = this.choices[i];
            this.choices[i] = this.choices[j];
            this.choices[j] = temp;
        }
    }
}


