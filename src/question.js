class Question { 
    constructor( text, choices, answer, difficulty ){
this.text = text;
this.choices = choices;
this.answer = answer;
this.difficulty = difficulty;
}
shuffleChoices (){ for(let i= this.choices.length -1; i >0; i--) 
    {const j = Math.floor(Math.random() * (i + 1));
         [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];}}

//shuffleChoices(){
    //return shuffle(choices)
   //}
   //function shufflechoices(this.choices) {
    //let currentIndex = this.choices.length, randomIndex;
    //randomIndex = Math.floor(Math.random() * currentIndex);
    //currentIndex--
}
/*let question new Question()
console.log(question)*/