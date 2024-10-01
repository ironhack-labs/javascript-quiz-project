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
  const restartButton = document.querySelector("#restartButton");

  /************  SET VISIBILITY OF VIEWS  ************/
  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/
  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question(
      "What is the capital of France?",
      ["Miami", "Paris", "Oslo", "Rome"],
      "Paris",
      1
    ),
    new Question(
      "Who created JavaScript?",
      ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"],
      "Brendan Eich",
      2
    ),
    new Question(
      "What is the mass–energy equivalence equation?",
      ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"],
      "E = mc^2",
      3
    ),
    new Question(
      "What is the name of the teacher in Ironhack school?",
      ["Max", "Tommy", "Joshua", "Sandra"],
      "Joshua",
      2
    ),
    new Question(
      "What is Joshua's dog name?",
      ["Babush", "Buddy", "Ragnar", "Tom"],
      "Ragnar",
      2
    ),
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/
  // Create a new Quiz instance object
  let quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/
  // Display the initial time remaining
  const timeRemainingContainer = document.getElementById("timeRemaining");
  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show the first question
  showQuestion();

  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);

  restartButton.addEventListener("click", () => {
    resetQuiz();
    console.log("restartButton");
  });

  /************  FUNCTIONS  ************/
  function resetQuiz() {
    // restart quiz
    // quiz = new Quiz(questions, quizDuration, quizDuration);
    // score = 0;
    // quizDuration = 120; // 120 seconds (2 minutes)
    // showQuestion();

    window.location.reload();
  }

  // Start the quiz timer
  function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
      if (quiz.timeRemaining <= 0) {
        clearInterval(timerInterval);
        showResults();
      } else {
        quiz.timeRemaining -= 1;
        updateTimerDisplay();
      }
    }, 1000);
  }

  // Updates the timer display in minutes and seconds
  function updateTimerDisplay() {
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }

  // Displays the current question and its choices
  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      clearInterval(timerInterval);
      showResults();
      return;
    }

    // Clear the previous question text and choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question
    const question = quiz.getQuestion();
    question.shuffleChoices();

    // Show the question
    questionContainer.innerText = question.text;

    // Create and display new radio input element for each choice
    question.choices.forEach((oneChoice, index) => {
      const htmlElement = document.createElement("div");
      htmlElement.innerHTML = `
        <input type="radio" id="choice${index}" name="choice" value="${oneChoice}">
        <label for="choice${index}">${oneChoice}</label><br>`;
      choiceContainer.appendChild(htmlElement);
    });

    // Update the progress bar and question count
    const progressPercentage =
      ((quiz.currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      questions.length
    }`;

    if (quiz.currentQuestionIndex === 0) {
      startTimer();
    }
  }
  // Handles the click on the next button
  function nextButtonHandler() {
    let selectedAnswer;
    const choiceElements = document.querySelectorAll('input[name="choice"]');
    choiceElements.forEach((choiceElement) => {
      if (choiceElement.checked) {
        selectedAnswer = choiceElement.value;
      }
    });

    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    } else {
      alert("Please select an answer!");
    }
  }

  // Shows the results at the end of the quiz
  function showResults() {
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length} correct answers!`;
  }
});
