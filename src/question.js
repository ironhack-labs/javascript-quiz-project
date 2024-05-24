class Question {
    // YOUR CODE HERE:
    // 1. constructor (text, choices, answer, difficulty)
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }
    // 2. shuffleChoices()
    shuffleChoices() {
        /*
    -- To shuffle an array a of n elements (indices 0..n-1):
        for i from n−1 down to 1 do
            j ← random integer such that 0 ≤ j ≤ i
            exchange a[j] and a[i]
        */
        for (let index = 0; index < this.choices.length; index++) {
            let randomIndex = Math.floor(Math.random() * this.choices.length);
            if (randomIndex === index) {
                index--;
                continue;
            }
            let temp = this.choices[index];
            this.choices[index] = this.choices[randomIndex];
            this.choices[randomIndex] = temp;
        }
    }
}

// For testing with: node src/question.js
/* const q = new Question("", [1, 2, 3, 4, 5, 6, 7, 8, 9], "", "");
console.log(q.choices);
let i = 0;
while (i < 100) {
    q.shuffleChoices();
    console.log(q.choices);
    i++;
} */
