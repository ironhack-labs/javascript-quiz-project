class Question {
    // YOUR CODE HERE:
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }
    shuffleChoices() {
    for (let i = this.choices.length - 1; i > 0; i--) {
    
    const randomPosition = Math.floor(Math.random() * (i + 1));
    const initialPosition = this.choices[i];
    // switching positions
    this.choices[i] = this.choices[randomPosition];
    this.choices[randomPosition] = initialPosition;
}
}
}