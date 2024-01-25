document.addEventListener("DOMContentLoaded", () => {

})
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

// Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

// Display the time remaining in the time remaining container
const timeRemainingContainer = document.getElementById("timeRemaining");
timeRemainingContainer.innerText = `${minutes}:${seconds}`;

// Show first question
showQuestion();


/************  TIMER  ************/


let timer = setInterval(() => {

  quiz.timeRemaining--

  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`

  if (quiz.currentQuestionIndex === quiz.questions.length) {
    clearInterval(timer)
    console.log('tiempo acabado')
  }

  if (minutes === '00' && seconds === '00') {
    console.log('EL intervalo se ha detenido')
    clearInterval(timer)
    showResults()
  }
}, 1000)



/************  EVENT LISTENERS  ************/

nextButton.addEventListener("click", nextButtonHandler);



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
  // 1. Show the question
  questionContainer.innerHTML = question.text


  // 2. Update the green progress bar
  const totalQuestions = quiz.questions.length
  const currentQuestion = quiz.currentQuestionIndex
  const progressPercent = (currentQuestion / totalQuestions) * 100

  progressBar.style.width = `${progressPercent}%`; // This value is hardcoded as a placeholder


  // 3. Update the question count text 
  questionCount.innerText = `Question ${currentQuestion} of ${totalQuestions}`; //  This value is hardcoded as a placeholder


  // 4. Create and display new radio input element with a label for each choice.
  question.choices.forEach(eachChoice => {

    const inputTag = document.createElement('input')

    inputTag.setAttribute('type', 'radio')
    inputTag.setAttribute('name', 'choice')
    inputTag.setAttribute('value', eachChoice)

    choiceContainer.appendChild(inputTag)

    const labelTag = document.createElement('label')
    labelTag.innerHTML = eachChoice

    choiceContainer.appendChild(labelTag)

    const breakTag = document.createElement('br')

    choiceContainer.appendChild(breakTag)
  })
}



function nextButtonHandler() {

  // YOUR CODE HERE:
  // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
  const allInputs = document.querySelectorAll('input')


  // 2. Loop through all the choice elements and check which one is selected
  // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
  allInputs.forEach(elm => {
    if (elm.checked) {
      quiz.checkAnswer(elm.value)
    }
  })

  quiz.moveToNextQuestion()
  showQuestion()
}


function showResults() {

  // YOUR CODE HERE:
  // 1. Hide the quiz view (div#quizView)
  quizView.style.display = "none";

  // 2. Show the end view (div#endView)
  endView.style.display = "flex";

  // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
  const correctAnswers = quiz.correctAnswers
  const totalQuestions = quiz.questions.length
  resultContainer.innerText = `You scored ${correctAnswers} out of ${totalQuestions} correct answers!`; // This value is hardcoded as a placeholder

  const restartButton = document.querySelector("#restartButton");
  function reloadBrowser() {
    location.reload();
  }

  restartButton.onclick = () => {
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.moveToNextQuestion()
    quizView.style.display = "flex";
    endView.style.display = "none";
    const totalQuestions = quiz.questions.length;
    const currentQuestion = quiz.currentQuestionIndex
    const progressPercent = (currentQuestion / totalQuestions) * 100
    progressBar.style.width = `${progressPercent}%`;
    reloadBrowser()
  }
}



