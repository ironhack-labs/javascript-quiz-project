class Question {
    constructor (text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }



    shuffleChoices() {
        for (let i = this.choices.length - 1; i > 0; i--) {
            const randomNum = Math.floor(Math.random() * (i + 1));
            [this.choices[i], this.choices[randomNum]] = [this.choices[randomNum], this.choices[i]];
        }
    }
}