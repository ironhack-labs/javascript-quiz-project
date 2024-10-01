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
  const timeRemainingContainer = document.getElementById("timeRemaining");

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
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)
  let timerInterval; // Declare the variable for timer interval

  /************  QUIZ INSTANCE  ************/
  // Create a new Quiz instance object
  let quiz = new Quiz(questions, quizDuration, quizDuration);
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/
  updateTimeRemaining();

  // Show first question
  showQuestion();

  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);

  const restartButton = document.getElementById("restartButton");
  if (restartButton) {
    // Add event listener for the restart button
    restartButton.addEventListener("click", function () {
      console.log("Restart button clicked");
      restartQuiz();
    });
  } else {
    console.error("Restart button not found");
  }

  // Event listener for End Quiz button
  endQuizButton.addEventListener("click", function () {
    clearInterval(timerInterval); // Stop the timer
    showResults(); // Show results
  });

  /************  FUNCTIONS  ************/

  // Function to start the quiz timer
  function startTimer() {
    clearInterval(timerInterval); // Clear any existing interval

    timerInterval = setInterval(() => {
      quiz.timeRemaining--;

      updateTimeRemaining();

      if (quiz.timeRemaining === quizDuration / 2) {
        showAlert();
      }

      if (quiz.timeRemaining <= 0) {
        clearInterval(timerInterval); // Stop the timer when time runs out
        showResults(); // End the quiz
      }
    }, 1000);
  }

  // Function to update the time remaining display
  function updateTimeRemaining() {
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }

  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    const question = quiz.getQuestion();
    question.shuffleChoices();

    questionContainer.innerText = question.text;

    const total = questions.length;
    const current = questions.indexOf(question) + 1;

    const percentage = (current / total) * 100;
    progressBar.style.width = `${percentage}%`;

    questionCount.innerText = `Question ${current} of ${questions.length}`;

    question.choices.forEach((choice) => {
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "choice";
      radioInput.value = choice;

      const radioLabel = document.createElement("label");
      radioLabel.value = choice;
      radioLabel.innerText = choice;

      choiceContainer.appendChild(radioInput);
      choiceContainer.appendChild(radioLabel);
      choiceContainer.appendChild(document.createElement("br"));
    });
  }

  function nextButtonHandler() {
    let selectedAnswer;    
    const choiceElements = document.querySelectorAll(
      "#choices input[type=radio]"
    );
    choiceElements.forEach((choice) => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    });

    if (selectedAnswer !== undefined) {
      const wasCorrect = quiz.checkAnswer(selectedAnswer);
      
      const allChoices = choiceContainer.querySelectorAll("label")
      for(let i=0; i<allChoices.length; i++ ) {
       if( allChoices[i].value === selectedAnswer && wasCorrect) {
          console.log("that was the right answer", allChoices[i])
          allChoices[i].classList.add("correct-answer")
       }else if( allChoices[i].value === selectedAnswer && !wasCorrect) {
        console.log("that was the right answer", allChoices[i])
        allChoices[i].classList.add("incorrect-answer")
     }

      }
      
      
      setTimeout(() => {
        quiz.moveToNextQuestion()
        showQuestion();
        console.log('clicked!')
      }, 1000);
      
    }
    //quiz.moveToNextQuestion();
    //showQuestion();
  }

  function showResults() {
    clearInterval(timerInterval); // Stop the timer
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length} correct answers!`;
  }

  function restartQuiz() {
    // Reset the quiz instance without redeclaring the 'quiz' variable
    quiz = new Quiz(questions, quizDuration, quizDuration); // Reset the quiz
    quiz.shuffleQuestions(); // Shuffle the questions again

    // Reset views
    quizView.style.display = "block";
    endView.style.display = "none";

    // Reset the timer
    updateTimeRemaining();
    startTimer(); // Restart the timer

    // Show the first question
    showQuestion();

    console.log("Quiz restarted");
  }

  function showAlert() {
    alert("You have one minute left!");
  }
  // Start the quiz timer when the quiz begins
  startTimer();
});
