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

        let currentIndex = this.choices.length - 1;

    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
       
        [this.choices[currentIndex], this.choices[randomIndex]] = 
        [this.choices[randomIndex], this.choices[currentIndex]];

         currentIndex--;
         
    }
    /* return this.choices; */
    }

}


this.questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    ];