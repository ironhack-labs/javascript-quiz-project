class Question {
  // YOUR CODE HERE:
  //
  // 1. constructor (text, choices, answer, difficulty)
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }
  // 2. shuffleChoices()
  shuffleChoices() {
    // Método de Fisher-Yates
    if (!this.choices) {
      return undefined;
    }
    for (let i = this.choices.length - 1; i > 0; i--) {
      // Seleccionar un elemento aleatorio
      const m = Math.floor(Math.random() * (i + 1));

      // Intercambiar el elemento actual con el elemento seleccionado
      [this.choices[i], this.choices[m]] = [this.choices[m], this.choices[i]];
    }

    return this.choices;

  }
}