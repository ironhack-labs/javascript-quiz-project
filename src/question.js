class Question {
    // YOUR CODE HERE:
    // 1. constructor (text, choices, answer, difficulty)
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }
    // 2. shuffleChoices()
    shuffleChoices() {
        for (let i = this.choices.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i));
            [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
        }
        return this.choices;
    }
}


const q1 = new Question ('hola', ['a','b','c','d'], 'que tal', 1)
 console.log(q1.shuffleChoices())


//console.log(q1.shuffleChoices(q1.choices)) 
