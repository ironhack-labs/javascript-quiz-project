class Question {
    constructor (text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }
    shuffleChoices() {
        let array = this.choices
        for (let i=array.length-1; i>0;i--) {
            const j = Math.floor(Math.random() * (i+1));
            [array[i], array [j]] = [array[j], array[i]];
        }
        return array
    }

}

