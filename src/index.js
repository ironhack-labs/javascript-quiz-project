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
    new Question(
      "Which country has the highest life expectancy?",
      ["Singapore", "Hong Kong", "Japan", "Switzerland"],
      "Hong Kong",
      3
    ),
    new Question(
      "Who was the Ancient Greek God of the Sun?",
      ["Ares", "Athena", "Poseidon", "Apollo"],
      "Apollo",
      2
    ),
    new Question("How many dots appear on a pair of dice?", ["42", "36", "32", "30"], "42", 1),
    new Question(
      "What is the world’s largest retailer?",
      ["Amazon.com", "Costco", "Walmart", "Schwarz Group"],
      "Walmart",
      3
    ),
    new Question(
      "What is the world’s largest retailer?",
      ["Amazon.com", "Costco", "Walmart", "Schwarz Group"],
      "Walmart",
      2
    ),
    new Question(
      "What is the 4th letter of the Greek alphabet?",
      ["Omega", "Gamma", "Delta", "Beta"],
      "Delta",
      2
    ),
    new Question(
      "What company was initially known as 'Blue Ribbon Sports'?",
      ["Adidas", "Puma", "Asics", "Nike"],
      "Nike",
      2
    ),
    new Question(
      "Which country has the most islands?",
      ["United States", "Indonesia", "Sweden", "Philippines"],
      "Sweden",
      3
    ),
    new Question(
      "What is the capital of Ireland?",
      ["Dublin", "Waterford", "Cork", "Limerick"],
      "Dublin",
      1
    ),
    new Question(
      "Who was the last Tsar of Russia?",
      ["Alexander III", "Peter III", "Catherine II", "Nicholas II"],
      "Nicholas II",
      3
    ),
    new Question(
      "In what decade was the internet created?",
      ["1950s", "1960s", "1970s", "1980s"],
      "1960s",
      2
    ),
    new Question("Where did sushi originate?", ["Japan", "Norway", "China", "Finland"], "Japan", 1),
    // Add more questions here
  ];
  const quizDuration = 60; // 120 seconds (2 minutes)

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
  function stopTimer() {
    if (quiz.timeRemaining <= 0) {
      showResults();
      clearInterval(timer);
    }
    if (endView.style.display == "flex") clearInterval(timer);
  }

  function ticks() {
    quiz.timeRemaining--;
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    console.log(quiz.timeRemaining);
    stopTimer();
  }

  let timer = setInterval(ticks, 1000);

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
      clearInterval(timer);
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
    // quiz.currentQuestionIndex = 0;
    let progressBarPercentage = ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;
    progressBar.style.width = `${progressBarPercentage}%`; // This value is hardcoded as a placeholder

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`; //  This value is hardcoded as a placeholder

    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:

    for (item of question.choices) {
      let radioInput = document.createElement("li");
      radioInput.innerHTML = `<input type="radio" name="choice" value="${item}">
          <label>${item}</label>
        <br>`;

      document.getElementById("choices").appendChild(radioInput);
    }

    // Hint 1: You can use the `document.createElement()` method to create a new element.
    // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
    // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
    // Hint 4: You can use the `element.innerText` property to set the inner text of an element.
    nextButton.classList.add("button-disabled");
    nextButton.disabled = true;
    addEventListenerToInputs();
  }

  //Adding evenlisterner function to input radios to enable the Answer button
  function checkIfSelected() {
    let choiceElements = document.querySelectorAll("li>input");
    for (item of choiceElements) {
      if (item.checked) {
        nextButton.classList.remove("button-disabled");
        nextButton.disabled = false;
      }
    }
  }

  function addEventListenerToInputs() {
    let choiceElements = document.querySelectorAll("li>input");
    for (item of choiceElements) {
      item.addEventListener("click", () => {
        checkIfSelected();
      });
    }
  }

  function nextButtonHandler() {
    let selectedAnswer = null; // A variable to store the selected answer value

    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    let choiceElements = document.querySelectorAll("li>input");
    // nextButton.classList.add('button-disabled')
    // nextButton.disabled = true;

    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.
    for (item of choiceElements) {
      if (item.checked) {
        selectedAnswer = item.value;
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

    // Slow down on restart
    let reBtn = document.getElementById("restartButton");
    reBtn.disabled = true;
    reBtn.classList.add("button-disabled");
    setTimeout(() => {
      reBtn.disabled = false;
      reBtn.classList.remove("button-disabled");
    }, 1000);
  }

  document.getElementById("restartButton").addEventListener("click", () => {
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "flex";
    // 2. Show the end view (div#endView)
    endView.style.display = "none";
    // Reset the currentQuestionIndex to 0
    quiz.currentQuestionIndex = 0;
    // Reset the correctAnswers to 0
    quiz.correctAnswers = 0;
    // Shuffle the questions
    quiz.shuffleQuestions();
    // Show the first question
    showQuestion();

    // Timer
    quiz.timeRemaining = quizDuration;
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;

    function stopTimer2() {
      if (quiz.timeRemaining <= 0) {
        showResults();
        clearInterval(timer2);
      }
      if (endView.style.display == "flex") clearInterval(timer2);
    }

    function ticks2() {
      quiz.timeRemaining--;
      const minutes = Math.floor(quiz.timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
      console.log(quiz.timeRemaining);
      stopTimer2();
    }

    let timer2 = setInterval(ticks2, 1000);
  });
});
