class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text; // should be a string
    this.choices = choices; // newArray of strings [1,2,3,4]
    this.answer = answer; // string
    this.difficulty = difficulty; // number between 1 and 3 (1 being the easiest)
  }

  shuffleChoices() {
    const shuffled = [...this.choices]; // Create a copy to avoid modifying the original array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }
    this.choices = shuffled;
  }
}
