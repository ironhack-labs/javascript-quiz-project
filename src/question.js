class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)
    constructor(text, choices, answer, difficulty) {
        this.text = text
        this.choices = choices
        this.answer = answer
        // difficulty: with 1 being the easiest and 3 being the hardest.
        this.difficulty = difficulty
        //console.log("choices = ", choices)
    }

    // 2. shuffleChoices()
    shuffleChoices() {
        console.log("choices = ", this.choices)

        for(let i=0; i < this.choices.length; i++) {
            // console.log("Choise = ", this.choices[i])
            const j = Math.floor(Math.random() * this.choices.length);

            // swap elements
            const val = this.choices[i]
            this.choices[i] = this.choices[j]
            this.choices[j] = val
        }

        // console.log("Choise = ", this.choices)
    }

}