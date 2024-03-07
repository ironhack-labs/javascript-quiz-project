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
  startTimer();

  /************  TIMER  ************/

  function startTimer() {
    let timer = setInterval(() => {
      quiz.timeRemaining--;
      const minutes = Math.floor(quiz.timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
      console.log(quiz.timeRemaining);
      if (quiz.timeRemaining === 0) {
        clearInterval(timer);
        showResults();
      } else if (quiz.hasEnded()) {
        clearInterval(timer);
      }
    }, 1000);

    if (quiz.hasEnded()) {
      clearInterval(timer);
    }
  }

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      quiz.timeRemaining = quizDuration + 1;
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

    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text;

    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    let percentage = (quiz.currentQuestionIndex / questions.length) * 100;

    progressBar.style.width = `${percentage}%`; // This value is hardcoded as a placeholder

    // Update the question count (div#questionCount) show the current question out of total questions
    let current = quiz.currentQuestionIndex;
    let sum = questions.length;

    questionCount.innerText = `Question ${current} of ${sum}`; //  This value is hardcoded as a placeholder

    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    for (let i = 0; i < questions.length; i++) {
      const input = document.createElement("input");
      const label = document.createElement("label");
      // input.setAttribute("type", "radio");
      input.type = "radio";
      input.name = "choice";
      input.value = question.choices[i];
      label.innerText = question.choices[i];
      choiceContainer.appendChild(input);
      choiceContainer.appendChild(label);
    }
  }

  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value

    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    const choicesButtons = document.querySelectorAll("input");

    // 2. Loop through all the choice elements and check which one is selected
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.
    for (const element of choicesButtons) {
      if (element.checked === true) {
        selectedAnswer = element.value;
      }
    }

    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.
    quiz.checkAnswer(selectedAnswer);
    quiz.moveToNextQuestion();
    showQuestion();
  }

  function showResults() {
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }

  function resetQuiz() {
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    showQuestion();
    quizView.style.display = "block";
    endView.style.display = "none";
  }

  const restartButton = document.querySelector("#restartButton");
  restartButton.addEventListener("click", (e) => {
    resetQuiz();
    startTimer();
  });
});
