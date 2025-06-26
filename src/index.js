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
  const restartButton = document.querySelector("#restartButton");

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
      "Who created JavaScript?",
      ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"],
      "Brendan Eich",
      2
    ),
    // Add more questions here
    new Question(
      "Which of the following is a JavaScript data type?",
      ["Boolean", "Integer", "Float", "Character"],
      "Boolean",
      0
    ),
    new Question(
      "What keyword is used to declare a constant in JavaScript?",
      ["var", "const", "let", "define"],
      "const",
      1
    ),
    new Question(
      "Which method converts a JSON string into a JavaScript object?",
      ["JSON.parse()", "JSON.stringify()", "parseJSON()", "toObject()"],
      "JSON.parse()",
      0
    ),
    new Question(
      "Which of the following is NOT a looping structure in JavaScript?",
      ["for", "foreach", "while", "do-while"],
      "foreach",
      1
    ),
    new Question(
      "What is the output of typeof null in JavaScript?",
      ["'object'", "'null'", "'undefined'", "'boolean'"],
      "'object'",
      0
    ),
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  /*const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;*/

  /************  TIMER  ************/
  let timer;

  timer = setInterval(function () {
    quiz.timeRemaining--;
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    // Display the time remaining in the time remaining container
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }, 1000);

  setTimeout(function () {
    clearInterval(timer);
    showResults();
  }, 120000);

  // Show first question
  showQuestion();

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function showQuestion() {
    clearInterval(timer);
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    timer = setInterval(function () {
      quiz.timeRemaining--;
      const minutes = Math.floor(quiz.timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

      // Display the time remaining in the time remaining container
      const timeRemainingContainer = document.getElementById("timeRemaining");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    }, 1000);

    setTimeout(function () {
      clearInterval(timer);
      showResults();
    }, 120000);

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text

    questionContainer.innerText = question.text;
    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    //progressBar.style.width = `65%`; // This value is hardcoded as a placeholder
    progressBar.style.width = `${
      (quiz.currentQuestionIndex / quiz.questions.length) * 100
    }%`;

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`; //  This value is hardcoded as a placeholder

    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    /* 
          <input type="radio" name="choice" value="CHOICE TEXT HERE">
          <label>CHOICE TEXT HERE</label>
        <br>
      */
    //console.log(question.choices);
    question.choices.forEach((element, index) => {
      const newRadio = document.createElement("input");
      //const uniqueId = `choice-${index}`;

      newRadio.setAttribute("type", "radio");
      newRadio.setAttribute("name", "choice");
      //newRadio.setAttribute("id", uniqueId);
      newRadio.setAttribute("value", element);

      const newLabel = document.createElement("label");
      //newLabel.setAttribute("for", uniqueId);
      newLabel.innerText = element.toString();

      const newBr = document.createElement("br");
      choiceContainer.appendChild(newRadio);
      choiceContainer.appendChild(newLabel);
      choiceContainer.appendChild(newBr);
      //console.log(element);
    });
  }

  // Hint 1: You can use the `document.createElement()` method to create a new element.
  // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
  // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
  // Hint 4: You can use the `element.innerText` property to set the inner text of an element.

  nextButton.addEventListener("click", nextButtonHandler);
  function nextButtonHandler() {
    //let selectedAnswer; // A variable to store the selected answer value
    let selectedAnswer = null;

    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.

    const inputs = document.querySelectorAll('input[name="choice"]');
    //console.log(inputs);

    inputs.forEach((input) => {
      if (input.checked) {
        selectedAnswer = input.value;
      }
    });
    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.
    console.log("Final answer", selectedAnswer);
    quiz.checkAnswer(selectedAnswer);
    quiz.moveToNextQuestion();
    showQuestion();
  }

  function showResults() {
    // YOUR CODE HERE:
    clearInterval(timer);

    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }

  restartButton.addEventListener("click", () => {
    endView.style.display = "none";
    quizView.style.display = "block";
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.timeRemaining = quizDuration;
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    // Display the time remaining in the time remaining container
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    showQuestion();
  });
});
