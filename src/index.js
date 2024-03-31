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

  function startQuizTimer(timeInSeconds) {
      let remainingTime = timeInSeconds;

      function updateTimerDisplay() {
          const minutes = Math.floor(remainingTime / 60).toString().padStart(2, "0");
          const seconds = (remainingTime % 60).toString().padStart(2, "0");
          timeRemainingContainer.innerText = `${minutes}:${seconds}`;
      }

      function countdown() {
          updateTimerDisplay();
          if (remainingTime <= 0) {
              clearInterval(timer);
              console.log("Time's up!");
              showResults();
          } else {
              remainingTime--;
          }
      }

      updateTimerDisplay();

      timer = setInterval(countdown, 1000);
  }

  function stopQuizTimer() {
      clearInterval(timer);
  }

  function restartQuizTimer(initialTimeInSeconds) {
      stopQuizTimer();
      startQuizTimer(initialTimeInSeconds);
  }

  function showResults() {
      stopQuizTimer();
  }

  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/
  function showQuestion() {
    if (quiz.hasEnded()) {
        showResults();
        return;
    }

    const question = quiz.getQuestion();

    questionContainer.textContent = question.text;

    choiceContainer.innerHTML = "";
    question.choices.forEach((choice, index) => {
        const choiceElement = document.createElement("li");
        choiceElement.textContent = choice;
        choiceElement.dataset.index = index; 
        choiceElement.addEventListener("click", () => {
            // Mark the clicked choice as selected
            choiceElement.classList.add("selected");
            // Call nextButtonHandler to move to the next question
            nextButtonHandler();
        });
        choiceContainer.appendChild(choiceElement);
    });

    progressBar.style.width = `${((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100}%`;

    questionCount.textContent = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;
}

function getSelectedChoiceIndex() {
  const selectedChoice = choiceContainer.querySelector("li.selected");
  return selectedChoice ? parseInt(selectedChoice.dataset.index) : undefined;
}




function nextButtonHandler() {
  const selectedChoiceIndex = getSelectedChoiceIndex();
  if (selectedChoiceIndex !== undefined) {
      quiz.checkAnswer(selectedChoiceIndex);
  }

  quiz.moveToNextQuestion();
  showQuestion();
}

function showResults() {
  stopQuizTimer();

  const percentageCorrect = (quiz.correctAnswers / quiz.questions.length) * 100;
  resultContainer.textContent = `You got ${quiz.correctAnswers} out of ${quiz.questions.length} questions correct (${percentageCorrect}%).`;

  quizView.style.display = "none";
  endView.style.display = "block";
}


  // Start the timer countdown when the quiz starts
  startQuizTimer(quizDuration);

});
