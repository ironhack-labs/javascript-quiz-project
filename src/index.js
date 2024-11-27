document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const nextButton = document.querySelector("#nextButton");
  const choiceContainer = document.querySelector("#choices");
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
    new Question("What is the name of the robot sent to Mars?", ["Yo, robot", "Perseverance rover", "Honesty rover", "ET rover"], "Perseverance rover", 1),
    new Question(
      "What is the highest mountain in Spain?",
      ["Everest", "Huascaran", "Teide", "Elbrus"],
      "Teide",
      2
    ),
    new Question(
      "What color are the black boxes on airplanes?",
      ["Red", "Black", "Orange", "Blue"],
      "Orange",
      3
    ),
    new Question(
      "What is the chemical formula of common salt?",
      ["ClNa", "NaCl", "ClSa", "SaC"],
      "NaCl",
      4
    ),
    
    new Question(
      "What is the longest day of the week?",
      ["Tuesday", "Saturday", "Thursday", "Wednesday"],
      "Wednesday",
      5
    ),
    new Question(
      "If 10 + x is 5 more than 10, what is the value of 2x?",
      ["15", "13", "10", "26"],
      "10",
      6
    ),
    new Question(
      "What color were the first cards in the soccer league?",
      ["Amarilla-Red", "Blanca-Red", "Azul-Red", "Orange-Red"],
      "Blanca-Red",
      7
    ),
    new Question(
      "The musical album Like a Prayer, belongs to...?",
      ["Lady Gaga", "Aerosmith", "Madonna", "Michael Jackson"],
      "Madonna",
      8
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
  startCountDown();

  /************  TIMER  ************/

  let timer;

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", restartButtonHandler);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

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

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text;

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    const percentage =
      ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;
    progressBar.style.width = `${percentage}%`; // Thisz value is hardcoded as a placeholder

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    const questionNumber = quiz.currentQuestionIndex + 1;
    questionCount.innerText = `Question ${questionNumber} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder

    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    for (const e of question.choices) {
      // For each choice create a new radio input with a label, and append it to the choice container.
      // Each choice should be displayed as a radio input element with a label:
      /* 
      <input type="radio" name="choice" value="CHOICE TEXT HERE">
      <label>CHOICE TEXT HERE</label>
      <br>
      */
      // Hint 1: You can use the `document.createElement()` method to create a new element.
      // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
      const answerRadio = document.createElement("input");
      answerRadio.type = "radio";
      answerRadio.name = "choice";
      answerRadio.value = e;

      const answerLabel = document.createElement("label");
      // Hint 4: You can use the `element.innerText` property to set the inner text of an element.
      answerLabel.innerText = e;

      // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
      choiceContainer.appendChild(answerRadio);
      choiceContainer.appendChild(answerLabel);
      choiceContainer.appendChild(document.createElement("br"));
    }
  }

  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value

    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    const choicesElements = document.querySelectorAll('input[name="choice"]');

    // 2. Loop through all the choice elements and check which one is selected
    for (const e of choicesElements) {
      // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
      //  When a radio input gets selected the `.checked` property will be set to true.
      //  You can use check which choice was selected by checking if the `.checked` property is true.
      if (e.checked) {
        selectedAnswer = e.value;
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
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }

  function restartButtonHandler() {
    quizView.style.display = "block";

    // 2. Show the end view (div#endView)
    endView.style.display = "none";

    quiz.correctAnswers = 0;
    quiz.currentQuestionIndex = 0;
    quiz.shuffleQuestions();

    showQuestion();
    quiz.timeRemaining = quiz.timeLimit;
    startCountDown();
  }

  function startCountDown() {
    window.countDownId = setInterval(countDown, 1000);
  }

  function countDown() {
    --quiz.timeRemaining;

    if (quiz.timeRemaining > 0) {
      const minutes = Math.floor(quiz.timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

      // Display the time remaining in the time remaining container
      const timeRemainingContainer = document.getElementById("timeRemaining");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    } else {
      clearInterval(window.countDownId);
      const timeRemainingContainer = document.getElementById("timeRemaining");
      timeRemainingContainer.innerText = `00:00`;

      quiz.timeRemaining = quiz.timeLimit;
      showResults();
    }
  }
});
