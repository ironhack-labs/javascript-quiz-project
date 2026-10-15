class Question {
    constructor(text, choices, answer, difficulty) {
        this.text = text
        this.choices = choices
        this.answer = answer
        this.difficulty = difficulty
    }
    
    shuffleChoices() {
        const mixedChoices = this.choices.sort(() => Math.random() -0.5);
        return mixedChoices
    }

}

console.log(mixedChoices);

const newQuestion = new Question ("Hello", ["hello", "bye"], "goodbye", 2)


console.log(newQuestion);