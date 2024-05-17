class Question {
   constructor(text, choices, answer, difficulty) {
     this.text = text;
     this.choices = choices;
     this.answer = answer;
     this.difficulty = difficulty;
   }
 
   shuffleChoices() {
     if (Array.isArray(this.choices)) {

       for (let i = this.choices.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
       }

     }

   }
   
 }
 

const myQuestion = new Question("What is the capital of France?", ["Paris", "London", "Berlin", "Rome"], "Paris", 1);

//  console.log("Before shuffling:", myQuestion.choices);
//  myQuestion.shuffleChoices();
//  console.log("After shuffling:", myQuestion.choices);
 
