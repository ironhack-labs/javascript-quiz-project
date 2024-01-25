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
  const choicesRadioInput = document.querySelectorAll("#choices input[type='radio']");
  const restartButton = document.getElementById("restartButton");
  const timerContainer = document.getElementById('timeRemaining');


  // End view elements
  const resultContainer = document.querySelector("#result");

  // Used Counter
  let answeredQuestions = 0; 
 
  


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
  const totalQuestions = questions.length;

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();


  /************  TIMER  ************/

  // let timer = timerInterval();


  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener('click', restartQuiz);
   // window.onload = timerInterval();
  

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results



  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    };

    // update the counter of answered answers 
    answeredQuestions++;

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();

    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    const showQuestion = document.getElementById('question');
    questionContainer.innerText = question.text;
    showQuestion.innerText = question.text;


    // Update the green progress bar
    const percentage = (answeredQuestions / totalQuestions) * 100;
    progressBar.style.width = percentage + '%';


    // Update the question count (div#questionCount) show the current question out of total questions
    const actualQuestion = answeredQuestions;
    //questionCount.innerText = `Question ${actualQuestion} of ${totalQuestions}`;
    questionCount.innerText = `Question ${answeredQuestions} of ${totalQuestions}`;


    // Display the choices calling a new function
    const createInputs = setChoices(question.choices);
  }; // end of showquestion function


  // function to show the choices 
  function setChoices(choices) {

    while (choiceContainer.firstChild) {
      choiceContainer.removeChild(choiceContainer.firstChild);
    };


    for (const key in choices) {
      if (choices.hasOwnProperty(key)) {
        const choice = choices[key];

        // Create a new radio input
        const input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'choice');
        input.setAttribute('value', choice);
        input.setAttribute('id', `choice-${key}`);

        // Create a new label
        const label = document.createElement('label');
        label.setAttribute('for', `choice-${key}`);
        label.appendChild(input);
        label.appendChild(document.createTextNode(choice));

        // Append the label to the choice container
        choiceContainer.appendChild(label);
      };
    };
  }; // end of choices function

  function nextButtonHandler() {

    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    const choices = document.querySelectorAll("#choices input[type='radio']");

    // 2. Loop through all the choice elements and check which one is selected
    let selectedAnswer = null;
    for (let i = 0; i < choices.length; i++) {
      if (choices[i].checked) {
        selectedAnswer = choices[i].value;
      break;
    }
  }

    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    if (quiz.checkAnswer(selectedAnswer)) {
      quiz.correctAnswers++;
    }
    
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    quiz.moveToNextQuestion();
    // Show the next question by calling the function `showQuestion()`.
    showQuestion();

    console.log(`Total Correct Answers: ${quiz.correctAnswers}`);
    
    // return correctAnswers;
  
  }; // end of nextbtnhandler function


  function showResults() {

    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    // let correctAnswers = getCorrectAnswers();
    resultContainer.innerText = `You scored ${quiz.correctAnswers} correct answers out of ${questions.length} questions!`;

  }; // end of showResult fn
  
  function restartQuiz(){
    console.log('restart quiz');
    
      // hide the endView
    endView.style.display = "none";
      // display the quiz view
    quizView.style.display = "block";
    
  
    // reset the quiz
    quiz.shuffleQuestions();
    quiz.resetCorrectAnswerCounter(); // fn to reset the correctAnswers into quiz.js
    quiz.resetCurrentQuestionIndex(); //fn to reset to current question index into quiz.js

    //show
    showQuestion();
    
  };

/*
  function timerInterval (timeRemaining){

    for (let i= timeRemaining; i>0; i--){

    const timer = setInterval(() => {
      timeRemaining--;
      timerContainer.innerText = timeRemaining;
      if (timeRemaining === 0) {
        showResults();
        timeRemaining = this.timeRemaining;
        clearInterval();
      };
    }, 1000);

    };
  };
  */


}); // end of page DO NOT DELETE


// Notes by Pauline
// errors fixed
// added on top const "restart btn"
// added fn restart quiz
// trying to make it work
// it works motherfuckers IT WORKS
// try to implement the timer now
// don't get it yet 
// add timerContainer l15
// add function l227-242
// comment l78 to start the counter when arriving on the page (doesnt work)
// comment timer l71
