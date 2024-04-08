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

  function startTimer() {
    timer = setInterval(() => {
      quiz.timeRemaining--; // Decrement the time remaining
      if (quiz.timeRemaining <= 0) {
        // If time runs out, show results and stop the timer
        showResults();
        clearInterval(timer);
      } else {
        // If time is remaining, update the time remaining container
        const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
        const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
        timeRemainingContainer.innerText = `${minutes}:${seconds}`;
      }
    }, 1000); // Update timer every second (1000 milliseconds)
  }

  // Start the timer when the page loads
  startTimer();

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

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

    // Show the question
    questionContainer.innerText = question.text;

    // Update the green progress bar
    const progressPercentage =
      (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    // Update the question count text
    const questionCountText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;
    questionCount.innerText = questionCountText;

    // Create and display new radio input element with a label for each choice.
    question.choices.forEach((choice) => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "choice";
      radio.value = choice;
      choiceContainer.appendChild(radio);

      const radiolabel = document.createElement("label");
      radiolabel.innerText = choice;
      choiceContainer.appendChild(radiolabel);

      const br = document.createElement("br");
      choiceContainer.appendChild(br);
    });
  }

  function nextButtonHandler() {
    let selectedAnswer;

    // Get all the choice elements.
    const choices = document.querySelectorAll("input[name=choice]");

    // Loop through all the choice elements and check which one is selected
    choices.forEach((choice) => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    });

    // If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    }
  }

  function showResults() {
    // Hide the quiz view
    quizView.style.display = "none";

    // Show the end view
    endView.style.display = "flex";

    // Update the result container inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }

  // Reset Button Handler
  const resetButton = document.querySelector("#restartButton");
  resetButton.addEventListener("click", () => {
    endView.style.display = "none";
    quizView.style.display = "block";
    clearInterval(timer); // Stop the timer
    quiz.timeRemaining = quizDuration; // Reset the time remaining
    startTimer(); // Start the timer again
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    showQuestion();
  });
});
