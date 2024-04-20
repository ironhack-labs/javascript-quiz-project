class Quiz {
  // YOUR CODE HERE:
  constructor(questions, timeLimit, timeRemaining){
  this.questions = questions;
  this.timeLimit = timeLimit;
  this.timeRemaining = timeRemaining;
  this.correctAnswers = 0
  this.currentQuestionIndex = 0
  }
  // 1. constructor (questions, timeLimit, timeRemaining)
  getQuestion() {
  if (this.currentQuestionIndex >= 0 && this.currentQuestionIndex < this.questions.length) {
  return this.questions[this.currentQuestionIndex];
  }
  }
  moveToNextQuestion(){
  if (this.currentQuestionIndex < this.questions.length) {
  this.currentQuestionIndex++;
  } else {
  console.log("You have reached the end of the quiz"); 
  }
  }
  shuffleQuestions(){
  for (let i = this.questions.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1)); 
  [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]]; 
  }
  }
  checkAnswer(answer){
  let preguntaActual = this.getQuestion()
  if ( answer === preguntaActual.answer ){
  this.correctAnswers++;
  }
  
  
  }
  hasEnded(){
  if(this.currentQuestionIndex < this.questions.length) {
  return false
  } else if(this.currentQuestionIndex = this.questions.length) {
  return true
  }
  }
  
  
  filterQuestionsByDifficulty(difficulty){
  let filterQuestions = this.questions.filter((eachQuestion) =>{
  if( eachQuestion.difficulty === difficulty) {
  return eachQuestion 
  } 
  })
  if ((difficulty > 0 && difficulty < 4)){
  this.questions = filterQuestions
  }
  // modificar el array original para que sea el array filtrado
  //return filterQuestions
  }
  
  averageDifficulty(){
  let suma = this.questions.reduce((accumulador, quest) =>{
  return accumulador + quest.difficulty
  },0)
  return suma / this.questions.length;
  }
  //let averageDifficulty = questions.difficulty.reduce((accumulador, eachDifficult) => {
  //return accumulador / eachAmount
  //})
  }