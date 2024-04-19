document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs  
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");
  const restartButton = document.querySelector("#restartButton");
  const answerCount = 0;
  let timerId;
  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/
  
  // Array with the quiz questions
  const questions = [/*
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),*/
    // Add more questions here
    new Question("Cual es el tubérculo favorito de Jorge?", ["Patata", "Remolacha", "Tomate", "Cebolla"], "Patata", 1),

    new Question("¿Cuántos toques máximos hace Sheldon con la pelotita?", ["34", "12", "8", "42"], "42", 3),

    new Question("¿Cuál de estos es un pokemon?", ["Lavadoramon", "Digimon", "Picachu", "Patata"], "Picachu", 1),

    new Question("Dado el siguiente array:[1,2,3,4,5] ¿Cuál es el valor del índice 3?", ["Patata", "2", "3", "4"], "4", 1),

    new Question("¿Cuál es la correcta?", ["let nombreVariable = 0", "let NombreVariable = 0", "let nombreVariable == 0", "const nombreVariable"], "let nombreVariable = 0", 2),

    new Question("BONUS: PATATA", ["Patata", "Patata", "Patata", "Patata"], "Patata", 2),
  ];

  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/
  
  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  let minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  let seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  //const timeRemainingContainer = document.getElementById("timeRemaining");
  let timeRemainingContainer = document.querySelector("#timeRemaining");
  

  timeRemainingContainer.style.justifyContent="flex-end"
  timeRemainingContainer.style.marginTop="0px"
  timeRemainingContainer.style.marginRight="0px"

  // Show first question
  showQuestion();


  /************  TIMER  ************/
  function control(){
    let time=quizDuration
    timerId=setInterval(()=>{
      minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      time--   
      timeRemainingContainer.innerText = `Remaining time: ${minutes}:${seconds}`;
      quiz.timeRemaining--
      if(time===0){
        clearInterval(timerId)
        showResults()
      }
    },1000)
  }
 

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", restartButtonHandler);


  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results
  control()


  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    questionContainer.innerText = question.text

    let barPercent = ((quiz.currentQuestionIndex+1) / quiz.questions.length) *100
    //console.log(barPercent)
    progressBar.style.width = `${barPercent}%`; // This value is hardcoded as a placeholder
    if(barPercent>0 && barPercent>20){
        progressBar.style.backgroundColor="#ff0000"
    }
    if(barPercent>30){
      progressBar.style.backgroundColor="#fc6a21"
    }
    if(barPercent>40){
      progressBar.style.backgroundColor="orange"
    }
    if(barPercent>50){
      progressBar.style.backgroundColor="yellow"
    }
    if(barPercent>70){
      progressBar.style.backgroundColor="#ADFF2F"
    }
    if(barPercent>90){
      progressBar.style.backgroundColor="green"
    }
    
    questionCount.innerText = `Question ${quiz.currentQuestionIndex+1} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder


      question.choices.forEach((choice)=>{
        const inputRadio = document.createElement("inputRadio")
        inputRadio.innerHTML=`
        <input class="inputRadio" type="radio" name="choice" value="${choice}">
          <label>"${choice}"</label>
        <br>
        `
        //console.log(questions[quiz.currentQuestionIndex].choices[index])
        //console.log(question.choices[1])
        choiceContainer.appendChild(inputRadio)
      })
  }

  function restartButtonHandler () {
    quizView.style.display = "flex";
    endView.style.display = "none";
    quiz.currentQuestionIndex=0
    quiz.correctAnswers=0
    time=quizDuration
    quiz.timeRemaining=quizDuration
    quiz.shuffleQuestions()
    control()
    showQuestion()
  }
  
  function nextButtonHandler () {
    let selectedNodeList = document.querySelectorAll(".inputRadio"); // A variable to store the selected answer value
    
    selectedNodeList.forEach((circulo)=>{
      if (circulo.checked===true){
        quiz.checkAnswer(circulo.value)
      }
    })

    quiz.moveToNextQuestion()
    showQuestion()

  }  


  function showResults() {

    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";
    
    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
    quiz.timeRemaining=quizDuration
    clearInterval(timerId)

  }
  
});