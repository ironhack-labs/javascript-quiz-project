class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }
  
  shuffleChoices() {
    // Fisher-Yates shuffle algorithm
    const shuffled = [...this.choices]; // Create a copy of the array
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at indices i and j
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    this.choices = shuffled;
  }
}