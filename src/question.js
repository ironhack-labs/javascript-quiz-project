class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }
  shuffleChoices() {
    for (let i = 0; i < this.choices.length; i++) {
    const randomIndex = Math.floor(Math.random() * this.choices.length);

    // swap array[i] with array[randomIndex]
    const temp = this.choices[i];
    this.choices[i] = this.choices[randomIndex];
    this.choices[randomIndex] = temp;
  }

  return this.choices;
    }
  }


