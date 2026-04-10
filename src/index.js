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
    new Question("Which Hogwarts house does Harry Potter belong to?", ["Slytherin", "Ravenclaw", "Hufflepuff", "Gryffindor"], "Gryffindor", 1),
    new Question(
      "What is the platform number for the Hogwarts Express?",
      ["7¾", "8½", "9¾", "10½"],
      "9¾",
      1,
    ),
    new Question(
      "What is the name of Harry’s pet owl?",
      ["Errol", "Scabbers", "Hedwig", "Crookshanks"],
      "Hedwig",
      2,
    ),
    new Question(
      "Which spell is used to disarm an opponent?",
      ["Expelliarmus", "Lumos", "Alohomora", "Avada Kedavra"],
      "Expelliarmus",
      3,
    ),
    // Add more questions here
  ];

  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  console.log(quiz);
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

  let timer = setInterval(() => {
    quiz.timeRemaining--;

    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;

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
    console.log(question);
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    // YOUR CODE HERE:
    //
    // 1. Show the question
    questionContainer.innerText = question.text;

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    // This value is hardcoded as a placeholder
    progressBar.style.width = `${(quiz.currentQuestionIndex / questions.length) * 100}%`;
    console.log(progressBar);

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    //questionCount.innerText = quiz.currentQuestionIndex ; //  This value is hardcoded as a placeholder
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${questions.length}`;

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

    const radioButton = document.createElement(`div`);
    radioButton.innerHTML = `  <input type="radio" name="choice" value="${question.choices[0]}">
          <label>${question.choices[0]}</label>`;
    choiceContainer.appendChild(radioButton);

    const radioButton2 = document.createElement(`div`);
    radioButton2.innerHTML = `  <input type="radio" name="choice" value="${question.choices[1]}">
          <label>${question.choices[1]}</label>`;
    choiceContainer.appendChild(radioButton2);

    const radioButton3 = document.createElement(`div`);
    radioButton3.innerHTML = `  <input type="radio" name="choice" value="${question.choices[2]}">
          <label>${question.choices[2]}</label>`;
    choiceContainer.appendChild(radioButton3);

    const radioButton4 = document.createElement(`div`);
    radioButton4.innerHTML = `  <input type="radio" name="choice" value="${question.choices[3]}">
          <label>${question.choices[3]}</label>`;
    choiceContainer.appendChild(radioButton4);
  }

  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value

    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.

    const allChoices = document.querySelectorAll("input[name='choice']");

    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.

    allChoices.forEach((input) => {
      if (input.checked) {
        selectedAnswer = input.value;
      }
    });

    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.

    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
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
    resultContainer.innerText = `You scored ${quiz.score} out of ${questions.length} correct answers!`;
  }
});
