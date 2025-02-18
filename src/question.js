
class Question {
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices= choices;
        this.answer= answer;
        this.difficulty= difficulty;
    }
    

    

    shuffleChoices() {
        for (let i = this.choices.length; i > 0; i--) {
            const j = Math.floor(Math.random() * (i));
            [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
        }
        return this.choices;
    }
}