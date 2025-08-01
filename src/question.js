class Question {
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;                // We are "linking" the reference of the array
        // this.choices = choices.slice(0);    // We can clone the argument instead
        this.answer = answer;
        this.difficulty = difficulty;       // Note: The difficulty will be a number between 1 and 3, with 1 being the easiest and 3 being the hardest.
    }

    shuffleChoices() {
        for (let i = this.choices.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]]; 
        }
    }
}
