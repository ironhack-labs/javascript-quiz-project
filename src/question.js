
    // YOUR CODE HERE:
    class Question {
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }
    
// 1. constructor (text, choices, answer, difficulty)

//shuffle the choices randomly


    // shuffleChoices() {
    //     for (let i = this.choices.length -1; i > 0; i--){
    //         const j = Math.floor(Math.random() * (i))
    //         [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
    //     }
        
    // }
   
    // Shuffle choices using while loop
    shuffleChoices() {
        let currentIndex = this.choices.length;

        while (currentIndex != 0) {
            
            let randomIndex = Math.floor(Math.random() * currentIndex);
            
            currentIndex--;

            [this.choices[currentIndex], this.choices[randomIndex]] = [
                this.choices[randomIndex], this.choices[currentIndex]
            ];
        }
    }
}
