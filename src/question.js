class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)
    constructor(text, choices, answer, difficulty) {
        // Assigning the arguments to the respective properties
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        // Validate the difficulty level, ensuring it's between 1 and 3
        if (difficulty < 1 || difficulty > 3) {
            throw new Error("Difficulty must be a number between 1 and 3.");
        }
  
        this.difficulty = difficulty;
      }
    // 2. shuffleChoices()
    // Method to shuffle the choices array
    shuffleChoices() {
        for (let i = this.choices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]]; // Swap elements
        }
    }
}