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
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/
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
  ];

  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  quiz.shuffleQuestions();

  /************  TIMER VARIABLES  ************/
  let interval = null;
  let timer = quizDuration; // Initialize timer

  /************  TIMER FUNCTION  ************/

  /* Conditions:
- Countdown starts at 2 minutes and 00 seconds (2:00)
- Countdown ends at 0 minutes and 0 seconds (0:00)
- Countdown is for all of the questions
- Countdown is not shown for the results
- The Countdown is restarted when the quizz is restarted
*/

  function startTimer() {
    // Clear any existing timer
    if (interval) {
      clearInterval(interval);
    }

    timer = quizDuration; // Reset timer
    const timeRemainingContainer = document.getElementById("timeRemaining"); // Select the element that displays the time

    interval = setInterval(() => {
      // Calculate minutes and seconds, ensuring they always have two digits
      const minutes = Math.floor(timer / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (timer % 60).toString().padStart(2, "0");

      // Update the timer display on the page
      timeRemainingContainer.innerText = `Remaining Time: ${minutes}:${seconds}`;

      // Decrease the timer by 1 second
      timer--;

      // If the timer reaches zero, stop the countdown and display "00:00"
      if (timer < 0) {
        clearInterval(interval);
        timeRemainingContainer.innerText = "00:00";
      }
    }, 1000); // Run this function every 1000 milliseconds (1 second)
  }

  // Start the initial timer
  startTimer();

  /************  SHOW INITIAL QUESTION  ************/
  showQuestion();

  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);

  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    const question = quiz.getQuestion();
    question.shuffleChoices();

    questionContainer.textContent = question.text;

    const progress =
      ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;

    question.choices.forEach((choice) => {
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "choice";
      radioInput.value = choice;

      const label = document.createElement("label");
      label.innerText = choice;

      choiceContainer.appendChild(radioInput);
      choiceContainer.appendChild(label);
      choiceContainer.appendChild(document.createElement("br"));
    });
  }

  function nextButtonHandler() {
    let selectedAnswer;
    let allChoices = document.querySelectorAll("#choices input[type='radio']");

    for (let i = 0; i < allChoices.length; i++) {
      if (allChoices[i].checked === true) {
        selectedAnswer = allChoices[i].value;
        break;
      }
    }

    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    }
  }

  function showResults() {
    clearInterval(interval);
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }

  /************  RESTART BUTTON FUNCTIONALITY  ************/
  let restartButton = document.querySelector("#restartButton");

  restartButton.addEventListener("click", () => {
    // Clear any running timer before restarting
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = "02:00";
    
    // Reset quiz state
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();

    // Hide end view and show quiz view
    quizView.style.display = "block";
    endView.style.display = "none";
    
    // Restart timer
    startTimer();

    // Show first question
    showQuestion();
  });
});
