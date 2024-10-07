class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  shuffleChoices() {
    let currentIndex = this.choices.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      let temp = this.choices[currentIndex];
      this.choices[currentIndex] = this.choices[randomIndex];
      this.choices[randomIndex] = temp;
    }
    return this.choices;
  }
}
