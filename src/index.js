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


  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/
  
  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/
  
  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/
    function updateTimer(){

    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    
}

  // Show first question
  showQuestion();

  
  /************  TIMER  ************/
  let timer;
  function StartTheTimer() {
  timer = setInterval(() =>{
   quiz.timeRemaining--;
   updateTimer();
  

  if(quiz.timeRemaining<=0) 
  {
   showResults() ;
  }   

  },1000);
}
StartTheTimer() 

   /************  EVENT LISTENERS  ************/



  restartButton.addEventListener("click", function restartButtonQuiz(){
    endView.style.display = "none";
    quizView.style.display = "block";

    quiz.currentQuestionIndex=0;
    quiz.correctAnswers=0;
    quiz.shuffleQuestions();
    quiz.timeRemaining = quizDuration;
    showQuestion();
    updateTimer();
    clearInterval(timer);
    StartTheTimer() 
    
  });


  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results




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
    
    

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text;
  
    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    const percent = ((quiz.currentQuestionIndex+1) / 4 ) *100;
    
    
    progressBar.style.width = `${percent}%` ; // This value is hardcoded as a placeholder
      console.log(percent);
  

    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions
    
    questionCount.innerText = `Question ${quiz.currentQuestionIndex+1} of ${quiz.questions.length} `; //  This value is hardcoded as a placeholder

    

    let choicesCurrentQuestions = question.choices;
    choicesCurrentQuestions.forEach((e, index) => {
      const newInput = document.createElement('input');
      newInput.type='radio';
      newInput.name='choice';
      newInput.value= e;
      newInput.id = e + index;


      const label = document.createElement("label");

      
      label.htmlFor= newInput.id;
      label.innerHTML = e;
      
      choiceContainer.appendChild(newInput);
      choiceContainer.appendChild(label);
      choiceContainer.appendChild(document.createElement("br"));
    });  

  }


  nextButton.addEventListener("click", nextButtonHandler);

  function nextButtonHandler () {
    let selectedAnswer = null; // A variable to store the selected answer value
    const allChoices = document.querySelectorAll('input[name="choice"]');
    for (let i = 0; i < allChoices.length; i++) {
      if (allChoices[i].checked) {
        selectedAnswer = allChoices[i].value;
        break;
      }
    }
    if (selectedAnswer !== null) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
  } else {
    alert("please select an answer to continue...");
  }
    } 


  function showResults() {
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length}  correct answers!`; // This value is hardcoded as a placeholder
    clearInterval(timer);
  }
  
});


