class Question {
    // YOUR CODE HERE:
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }
    

    shuffleChoices() {
        for(let i = 0; i < this.choices.length; i++){
            const randomIndex = Math.floor(Math.random() * this.choices.length);
            const tempValue = this.choices[i];
            this.choices[i] = this.choices[randomIndex];
            this.choices[randomIndex] = tempValue;
        }
    }

    // 1. constructor (text, choices, answer, difficulty)

    // 2. shuffleChoices()
}