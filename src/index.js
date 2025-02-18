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
  console.log(questions[0]);
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/
  //Review the starter code provided in the index.js and index.html files.
  /*Implement the DOM logic - function showQuestion().
Implement the DOM logic - function nextButtonHandler().
Implement the DOM logic - function showResults().
Implement a “Restart Quiz” button and the logic to restart the quiz.
Commit your changes and push them to GitHub.*/
  {
  }
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

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

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

    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;

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
    const questionTag = document.createElement("p");
    questionTag.innerText = question.text;
    questionContainer.appendChild(questionTag);

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    progressBar.style.width = `${
      (quiz.currentQuestionIndex / quiz.questions.length) * 100
    }%`; // This value is hardcoded as a placeholder

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    function updateQuestionCount() {
      // Display 1-based index for user (questions are typically 1-based from a user perspective)
      questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
        quiz.questions.length
      }`;
    }
    updateQuestionCount();

    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    /* 
          <input type="radio" name="choice" value="CHOICE TEXT HERE">
          <label>CHOICE TEXT HERE</label>
        <br>
      */
    // Hint 1: You can use the `document.createElement()` method to create a new element.
    // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
    // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
    // Hint 4: You can use the `element.innerText` property to set the inner text of an element.
    question.choices.forEach((choice) => {
      if (typeof choice !== "undefined") {
        const inputElement = document.createElement("input");
        inputElement.type = "radio";
        inputElement.name = "choice";
        inputElement.value = choice;

        const labelElement = document.createElement("label");
        labelElement.innerText = choice;

        choiceContainer.appendChild(inputElement);
        choiceContainer.appendChild(labelElement);
        choiceContainer.appendChild(document.createElement("br"));
      }
    });
  }

  function nextButtonHandler() {
    // Get the selected choice
    const selectedChoiceElement = document.querySelector(
      'input[name="choice"]:checked'
    );

    if (selectedChoiceElement) {
      // Retrieve the user's selected answer
      const selectedAnswer = selectedChoiceElement.value;

      // Check if the selected answer is correct
      quiz.checkAnswer(selectedAnswer);

      // Move to the next question in the quiz
      quiz.moveToNextQuestion();

      // Show the next question or results if the quiz is over
      showQuestion();

      console.log("quiz.correctAnswers", quiz.correctAnswers);
    } else {
      // If no choice is selected, alert the user to select an answer
      alert("Please select an answer before proceeding to the next question!");
    }
  }

  function showResults() {
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions

    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }

  const restartButton = document.getElementById("restartButton");
  function resetQuiz() {
    // Reset quiz-related variables
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.timeRemaining = quizDuration;

    // Optionally clear any selections or inputs
    const questionInputs = document.querySelectorAll('input[name="choice"]');
    questionInputs.forEach((input) => (input.checked = false));

    // Reset the views to show the first question
    showQuestion();

    // Display the quiz view and hide the end view
    quizView.style.display = "block";
    endView.style.display = "none";

    // Reset progress bar and UI updates if needed
    progressBar.style.width = "0%";

    clearInterval(timer);

    setInterval(showTimer, 1000);
  }

  // Attach event listener to the Restart button
  restartButton.addEventListener("click", resetQuiz);

  function showTimer() {
      quiz.timeRemaining--;
      const minutes = Math.floor(quiz.timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  
      if (quiz.timeRemaining < 1) {
        clearInterval(timer);
        showResults();
      }
  }

  setInterval(showTimer, 1000);
});
