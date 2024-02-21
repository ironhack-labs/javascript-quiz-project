class Question {

    constructor(text, choices, answer, difficulty, type = 'text', media = null) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
        this.type = type;
        this.media = media;
    }

    shuffleChoices() {
        
        for (let i = this.choices.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
        }
    }

}


// let arr = [1, 2, 3];

// function shuffle(array) {
//     //array.sort(() => Math.random() >= Math.random() ? -1 : 1);
//     //array.sort(() => Math.random() - 0.5);
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//   }
  
//   // counts of appearances for all possible permutations
//   let count = {
//     '123': 0,
//     '132': 0,
//     '213': 0,
//     '231': 0,
//     '321': 0,
//     '312': 0
//   };
  
//   for (let i = 0; i < 1000000; i++) {
//     let array = [1, 2, 3];
//     shuffle(array);
//     count[array.join('')]++;
//   }
  
//   // show counts of all possible permutations
//   for (let key in count) {
//     alert(`${key}: ${count[key]}`);
//   }
// console.table(count)

// array.sort(() => Math.random() >= Math.random() ? -1 : 1);
// ┌─────────┬────────┐
// │ (index) │ Values │
// ├─────────┼────────┤
// │ 123     │ 375341 │
// │ 132     │ 62374  │
// │ 213     │ 125130 │
// │ 231     │ 62470  │
// │ 312     │ 62406  │
// │ 321     │ 312279 │
// └─────────┴────────┘

// array.sort(() => Math.random() - 0.5);
// ┌─────────┬────────┐
// │ (index) │ Values │
// ├─────────┼────────┤
// │ 123     │ 374480 │
// │ 132     │ 62758  │
// │ 213     │ 125377 │
// │ 231     │ 62154  │
// │ 312     │ 62407  │
// │ 321     │ 312824 │
// └─────────┴────────┘

// for (let i = array.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
// }
// ┌─────────┬────────┐
// │ (index) │ Values │
// ├─────────┼────────┤
// │ 123     │ 165889 │
// │ 132     │ 167252 │
// │ 213     │ 166708 │
// │ 231     │ 166861 │
// │ 312     │ 167095 │
// │ 321     │ 166195 │
// └─────────┴────────┘
