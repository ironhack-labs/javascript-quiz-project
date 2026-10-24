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

  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/

  const quiz = new Quiz(questions, quizDuration, quizDuration);
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  const timeRemainingContainer = document.getElementById("timeRemaining");
  let timer;

  showTimeRemaining();

  // Show first question
  showQuestion();


  /************  TIMER  ************/

  startTimer();


  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", restartButtonHandler);


  /************  FUNCTIONS  ************/

  function showTimeRemaining() {
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }


  function startTimer() {
    timer = setInterval(function() {
      quiz.timeRemaining--;
      showTimeRemaining();

      // When the time is up, end the quiz
      if (quiz.timeRemaining <= 0) {
        showResults();
      }
    }, 1000);
  }


  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz
    const question = quiz.getQuestion();
    question.shuffleChoices();

    // 1. Show the question text
    questionContainer.innerText = question.text;

    // 2. Update the progress bar
    const progressPercent = (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // 3. Update the question count
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;

    // 4. Create radio inputs for each choice
    for (let i = 0; i < question.choices.length; i++) {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "choice";
      input.value = question.choices[i];

      const label = document.createElement("label");
      label.innerText = question.choices[i];

      const br = document.createElement("br");

      choiceContainer.appendChild(input);
      choiceContainer.appendChild(label);
      choiceContainer.appendChild(br);
    }
  }


  function nextButtonHandler() {
    let selectedAnswer;

    // 1. Get all the choice elements
    const allChoices = document.querySelectorAll("input[name='choice']");

    // 2. Loop through and find which one is selected
    for (let i = 0; i < allChoices.length; i++) {
      if (allChoices[i].checked) {
        selectedAnswer = allChoices[i].value;
      }
    }

    // 3. If an answer is selected, check it and move to next question
    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    }
  }


  function showResults() {
    // Stop the timer
    clearInterval(timer);

    // 1. Hide the quiz view
    quizView.style.display = "none";

    // 2. Show the end view
    endView.style.display = "flex";

    // 3. Show the score
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }


  function restartButtonHandler() {
    // 1. Hide the end view
    endView.style.display = "none";

    // 2. Show the quiz view
    quizView.style.display = "block";

    // 3. Reset the quiz
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    showQuestion();

    // 4. Reset and restart the timer
    quiz.timeRemaining = quiz.timeLimit;
    showTimeRemaining();
    startTimer();
  }

});
