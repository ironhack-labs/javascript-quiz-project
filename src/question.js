class Question {
  constructor(text, choices, answer, difficulty) {
    if (
      !text ||
      !choices ||
      !answer ||
      !difficulty ||
      typeof text !== "string" ||
      !Array.isArray(choices) ||
      choices.length == 0 ||
      typeof answer !== "string" ||
      typeof difficulty !== "number" ||
      difficulty < 1 ||
      difficulty > 3
    ) {
      throw new Error("Invalid input, HAHA");
    }

    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  // 2. shuffleChoices()
  shuffleChoices() {
    let randomIndice = [];
    while (randomIndice.length < this.choices.length) {
      const idx = Math.floor(Math.random() * this.choices.length);
      if (!randomIndice.includes(idx)) {
        randomIndice.push(idx);
      }
    }

    let meChoices = [];
    randomIndice.forEach((element) => meChoices.push(this.choices[element]));
    this.choices = meChoices;
  }
}
