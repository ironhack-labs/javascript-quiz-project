class Question {
  // YOUR CODE HERE:
  //
  // 1. constructor (text, choices, answer, difficulty)

  // 2. shuffleChoices()

  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }
  shuffleChoices() {
    for (let i = this.choices.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i
      const randomIndex = Math.floor(Math.random() * (i + 1));
      // Swap elements at index i and randomIndex
      [this.choices[i], this.choices[randomIndex]] = [
        this.choices[randomIndex],
        this.choices[i],
      ];
    }
    return this.choices;
  }
}
const result = new Question();
