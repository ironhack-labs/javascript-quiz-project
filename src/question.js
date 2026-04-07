class Question {
    constructor (text, choices, answer, difficulty){
       this.text = text
       this.choices = choices
       this.answer = answer
       this.difficulty = difficulty
    }

    // 2. shuffleChoices()
    shuffleChoices(){
      
      
 this.choices= this.choices.reduce((acc, item )=>{
let index = Math.floor(Math.random() * acc.length+1 )
acc.splice(index,0,item)
return acc 

},[]) 


}
    
}
const question = new Question('Hello', ["rabbit" , "cat", "dog"])
 console.log(question.shuffleChoices())
 // figure out why we needed to add the new variable

