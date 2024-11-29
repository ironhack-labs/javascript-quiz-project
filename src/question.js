//
//
//
//
//
class Question {
  constructor(text, choices, answer, difficulty) {
    (this.text = text),
      (this.choices = choices),
      (this.answer = answer),
      (this.difficulty = difficulty);
  }
  
  shuffleChoices() {
    for (let i = 0; i < this.choices.length; i += 1) {
        let index = Math.floor(Math.random() * this.choices.length);
        let tmp = this.choices [i];
        this.choices[i] = this.choices[index];
        this.choices[index] = tmp;
    }
  }
}
