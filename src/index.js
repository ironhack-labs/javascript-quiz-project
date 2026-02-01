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

  let timer;


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

    // Update the green progress bar
    const progressPercentage = ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    
    // Update the question count text
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;

    // Display the question text
    questionContainer.innerText = question.text;

    // Create and display new radio input with a label for each choice
    question.choices.forEach((choice, index) => {
      // Create radio input element
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "choice";
      radioInput.id = `choice${index}`;
      radioInput.value = choice;
      
      // Create label element
      const label = document.createElement("label");
      label.htmlFor = `choice${index}`;
      label.innerText = choice;
      
      // Create a div to contain the radio and label
      const choiceDiv = document.createElement("div");
      choiceDiv.classList.add("choice");
      choiceDiv.appendChild(radioInput);
      choiceDiv.appendChild(label);
      
      // Add the choice to the choice container
      choiceContainer.appendChild(choiceDiv);
    });
  }

  function nextButtonHandler() {
    const choiceElements = document.querySelectorAll('input[name="choice"]');
    let selectedAnswer = null;
    
    choiceElements.forEach(choiceElement => {
      if (choiceElement.checked) {
        selectedAnswer = choiceElement.value;
      }
    });
    
    if (selectedAnswer !== null) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    } else {
      alert("Please select an answer before proceeding!");
    }
  }

  function showResults() {
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
    clearInterval(timer);
  }

  function startTimer() {
    timer = setInterval(() => {
      quiz.timeRemaining--;
      
      const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

      const timeRemainingContainer = document.getElementById("timeRemaining");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
      
      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
        showResults();
      }
    }, 1000);
  }

  function resetQuizHandler() {
    endView.style.display = "none";
    quizView.style.display = "block";
    
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.timeRemaining = quiz.timeLimit;
    
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    
    quiz.shuffleQuestions();
    
    clearInterval(timer);
    startTimer();
    
    showQuestion();
  }
});