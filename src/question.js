class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text; // should be a string
    this.choices = choices; // newArray of strings [1,2,3,4]
    this.answer = answer; // string
    this.difficulty = difficulty; // number between 1 and 3 (1 being the easiest)
  }

  shuffleChoices() {
    const shuffled = [];
    while (this.choices.length) {
      const random = Math.floor(Math.random() * this.choices.length);
      shuffled.push(this.choices.splice(random, 1)[0]);
    }
    this.choices = shuffled;
  }
}