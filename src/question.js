class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }
  shuffleChoices() {
    let shuffledArray = [];
    let randomIndex = Math.floor(Math.random * this.choices.length);
    if (!shuffledArray.includes(this.choices[randomIndex])) {
      shuffledArray.push(this.choices[randomIndex]);
    }
    this.choices = shuffledArray;
    return this.choices;
  }
}
