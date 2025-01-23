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
    // Add more questions here
  ];
  const quizDuration = 121; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/


  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");

  // Show first question
  showQuestion();

  /************  TIMER  ************/

  let timer;

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    const question = quiz.getQuestion();

    questionContainer.innerText = question.text;

    const percentage =
      (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    progressBar.style.width = `${percentage}%`;

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;

    question.choices.forEach((choiceInput) => {
      const input = document.createElement("input");
      input.setAttribute("class", "choice-element");
      input.type = "radio";
      input.name = "choice";
      input.value = choiceInput;

      const label = document.createElement("label");
      label.innerText = choiceInput;

      const br = document.createElement("br");

      choiceContainer.appendChild(input);
      choiceContainer.appendChild(label);
      choiceContainer.appendChild(br);
    });
  }

  function nextButtonHandler() {
    const choiceElements = document.querySelectorAll(".choice-element");
    let selectedAnswer;

    choiceElements.forEach((choice) => {
      const selectedChoiceButtton = choice;
      const isButtonChecked = selectedChoiceButtton.checked;

      if (isButtonChecked) {
        selectedAnswer = selectedChoiceButtton.value;
        const isCorrect = quiz.checkAnswer(selectedAnswer);

        if (isCorrect) {
          quiz.moveToNextQuestion();
          showQuestion();
        } else {
          quiz.moveToNextQuestion();
          showQuestion();
        }
      }
    });
  }

  function showResults() {
    quizView.style.display = "none";

    endView.style.display = "flex";

    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;

    const resetButton = document.getElementById("restartButton");
    resetButton.addEventListener("click", () => {
      quiz.currentQuestionIndex = 0;
      quiz.correctAnswers = 0;
      showQuestion();

      quizView.style.display = "block";
      endView.style.display = "none";

      clearInterval(timer);
      quiz.timeRemaining = quizDuration;
      quizTimer();
    });
  }

  function quizTimer() {
    timer = setInterval(function () {
      if (quiz.timeRemaining > 0) {
        quiz.timeRemaining--;

        const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
        const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

        timeRemainingContainer.innerText = `${minutes}:${seconds}`;
      } else {
        showResults();
        clearInterval(timer);
      }
    }, 1000);
  }

  quizTimer();
});
