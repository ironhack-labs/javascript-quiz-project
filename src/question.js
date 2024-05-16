class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }
  shuffleChoices() {
    // Our solution
    const randomizedArr = [];
    let counter = this.choices.length;
    while (counter > 0) {
      let shuffledChoice =
        this.choices[Math.floor(Math.random() * this.choices.length)];
      if (!randomizedArr.includes(shuffledChoice)) {
        randomizedArr.push(shuffledChoice);
        counter -= 1;
      }
    }
    this.choices = randomizedArr;
    return this.choices;
  }
}
