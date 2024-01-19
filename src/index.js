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
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();

  /************  TIMER  ************/

  let timer;

  function updateTimer() {
    const minutes = Math.floor(quiz.timeRemaining / 60);
    const seconds = quiz.timeRemaining % 60;
    timeRemainingContainer.innerText = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }

  timer = setInterval(() => {
    quiz.timeRemaining--;

    updateTimer();

    if (quiz.timeRemaining <= 0) {
      clearInterval(timer);
      showResults();
    }
  }, 1000);

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

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
d
    let progress = ((quiz.currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    let countText = quiz.currentQuestionIndex + 1;
    questionCount.innerText = `Question ${countText} of 10`; 

    question.choices.forEach((choice, index) => {
      const input = document.createElement("input");
      input.innerHTML = choice;
      input.type = "radio";
      input.value = choice;
      input.name = "choice";
      console.log(input);
      choiceContainer.appendChild(input);

      const label = document.createElement("label");
      label.innerText = choice;
      choiceContainer.appendChild(label);
      const br = document.createElement("br");
      choiceContainer.appendChild(br);
    });
  }

  function nextButtonHandler() {
    let selectedAnswer; 

    const choices = document.querySelectorAll("input[name=choice]");

    choices.forEach((choice) => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    });

    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    }
  }

  function showResults() {
    clearInterval(timer);
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }

  const restartButton = document.querySelector("#restartButton");
  restartButton.addEventListener("click", () => {
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    showQuestion();
    quizView.style.display = "flex";
    endView.style.display = "none";
  });
});
