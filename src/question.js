class Question {
  // YOUR CODE HERE:
  //
  constructor(text, choices, answer, difficulty) {
    this.text = text; //string
    this.choices = choices; // Array of strings
    this.answer = answer; //string
    this.difficulty = difficulty; //number
  }

  shuffleChoices() {
    // this.choices = this.choices.sort(() => Math.random() - 0.5);
    for (let i = this.choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a new random index
        [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]]; // Swap the elements at indices i and j
    }
  }
}
