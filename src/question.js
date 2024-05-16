//*************3.Organize data and functionality using classes******/
//***day01****/

class Question {
    // YOUR CODE HERE:
    constructor (text, choices, answer, difficulty){ // 1. constructor (text, choices, answer, difficulty)
        this.text = text;
        this.choices =choices;
        this.answer = answer;
        this.difficulty = difficulty;

    }
    shuffleChoices(){ // 2. shuffleChoices()
        for (let i = this.choices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
        }
    }
}