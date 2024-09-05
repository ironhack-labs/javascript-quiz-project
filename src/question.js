class Question {
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    shuffleChoices() {
        // Recorremos el this.choices desde el final hasta el principio
    for (let i = this.choices.length - 1; i > 0; i--) {
        // Seleccionamos un índice aleatorio entre 0 y i
        const j = Math.floor(Math.random() * (i + 1));
        // Intercambiamos los elementos this.choices[i] y this.choices[j]
        [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
    }
    return this.choices;
    }
}

let obj1 = new Question("Esto es una pregunta", ["A", "B", "C", "D"], "C", 1)

console.log(obj1.shuffleChoices())
//console.log(obj1.filterQuestionsByDifficulty(1))