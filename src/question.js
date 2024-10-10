class Question {
    // YOUR CODE HERE:
        constructor (text, choices, answer, difficulty) {
           this.text = text;
           this.choices = choices;
           this.answer = answer;
           this.difficulty = difficulty; 
        }

    shuffleChoices() {
        let previous;
        for (let i = this.choices.length -1; i > 0; i--) {
            
            let random = Math.floor(Math.random() * (i + 1));
            previous = this.choices[i]
            this.choices[i] = this.choices[random];
            this.choices[random] = previous
        };
    }
}

