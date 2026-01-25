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

  // Array with the quiz questions
  const questions = [
    // new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    // new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    // new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    // new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Add more questions here
    new Question(
      "Why don’t scientists trust atoms?",
      [
        "Because they explode",
        "Because they are radioactive",
        "Because they make up everything",
        "Because they are too small",
      ],
      "Because they make up everything",
      1,
    ),
    new Question(
      "What planet is known as the Red Planet?",
      ["Venus", "Jupiter", "Mars", "Saturn"],
      "Mars",
      1,
    ),
    new Question(
      "What gas do plants absorb from the atmosphere?",
      ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      "Carbon Dioxide",
      1,
    ),
    new Question(
      "What is the powerhouse of the cell?",
      ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
      "Mitochondria",
      1,
    ),
    new Question(
      "Why can’t you hear sound in space?",
      [
        "Space is too cold",
        "There is no air to carry sound",
        "Sound moves too slow",
        "Your ears stop working",
      ],
      "There is no air to carry sound",
      2,
    ),
    new Question(
      "What force keeps planets in orbit around the sun?",
      ["Magnetism", "Friction", "Gravity", "Electricity"],
      "Gravity",
      2,
    ),

    new Question(
      "Which scientist developed the theory of relativity?",
      ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Nikola Tesla"],
      "Albert Einstein",
      2,
    ),

    new Question(
      "What is the chemical symbol for water?",
      ["O2", "CO2", "H2O", "HO2"],
      "H2O",
      1,
    ),

    new Question(
      "If you could fold a piece of paper 42 times, how tall would it be?",
      [
        "As tall as a house",
        "As tall as Mount Everest",
        "As tall as the Moon",
        "Taller than the distance to the Moon",
      ],
      "Taller than the distance to the Moon",
      3,
    ),

    new Question(
      "What happens to time as you approach the speed of light?",
      [
        "It speeds up",
        "It stops completely",
        "It slows down",
        "Nothing happens",
      ],
      "It slows down",
      3,
    ),
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/
// learn this properly!!!!
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
  startTimer();

  function startTimer() {
    clearInterval(timer);

    timer = setInterval(() => {
      quiz.timeRemaining--;

      const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
        showResults();
      }
    }, 1000);
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
    // questionContainer.innerText = question.Text;
    questionContainer.innerText = question.text;
    //console.log(questionContainer.innerText);

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    const progressPercentage =
      (quiz.currentQuestionIndex / quiz.questions.length) * 100;

    progressBar.style.width = `${progressPercentage}%`; // This value is hardcoded as a placeholder

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    questionCount.innerText = `Question: ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder

    // 4. Create and display new radio input element with a label for each choice.
    question.choices.forEach((choice) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "choice";
      input.value = choice;

      const label = document.createElement("label");
      label.innerText = choice;

      const br = document.createElement("br");

      choiceContainer.appendChild(input);
      choiceContainer.appendChild(label);
      choiceContainer.appendChild(br);
    });

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
  }

  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value

    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    const choices = document.querySelectorAll(`input[name="choice"]`);

    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.
    choices.forEach((choice) => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    });

    // console.log(selectedAnswer);

    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    }
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.
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

  restartButton.addEventListener("click", restartQuiz);
  function restartQuiz() {
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.timeRemaining = quiz.timeLimit;

    quiz.shuffleQuestions();

    endView.style.display = "none";
    quizView.style.display = "block";

    progressBar.style.width = "0%";
    questionCount.innerText = "";

    showQuestion();
    startTimer();
  }
});
