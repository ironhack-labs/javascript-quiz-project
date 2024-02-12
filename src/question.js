class Question {
    // YOUR CODE HERE:
    //
    constructor (text, choices, answer, difficulty) {
        this.text = text
        this.choices = choices
        this.answer = answer
        this.difficulty = difficulty    
    }

    shuffleChoices() {
        let currentIndex = this.choices.length , randomIndex;

        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            
            [this.choices[currentIndex], this.choices[randomIndex]] = [this.choices[randomIndex], this.choices[currentIndex]];
        }
    }
}

let question1 = new Question("text", [1,2,3,5,6,7,8,9,10], "answer", "difficulty")
console.log(question1.choices)
question1.shuffleChoices()