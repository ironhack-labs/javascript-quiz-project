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
  //restartButton.addEventListener("click", restartQuiz);
  //document.querySelector("#timeRemaining span").innerText =
  //`${minutes}:${seconds}`;*/
  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  restartButton.style.display = "flex";
  quizView.style.display = "block";
  endView.style.display = "none";
  //restartButton.style.display = "none";

  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    /*new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question(
      "What is the capital of France?",
      ["Miami", "Paris", "Oslo", "Rome"],
      "Paris",
      1,
    ),
    new Question(
      "Who created JavaScript?",
      ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"],
      "Brendan Eich",
      2,
    ),
    new Question(
      "What is the mass–energy equivalence equation?",
      ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"],
      "E = mc^2",
      3,
    ),*/
    // Add more questions here
    new Question(
      "Which country does Sara Faltas come from?",
      ["Germany", "Egypt", "Netherlands", "Algeria"],
      "Egypt",
      1,
    ),
    new Question(
      "What is Dante Besong's country of origin?",
      ["Nigeria", "Germany", "Benin", "Cameroon"],
      "Cameroon",
      2,
    ),
    new Question(
      "What is Rachel Akodo's country of origin?",
      ["Nigeria", "France", "Benin", "Cameroon"],
      "Benin",
      3,
    ),
    new Question(
      "What is the country of origin of Jordi Font?",
      ["Italy", "Spain", "Costa Rica", "Venezuela"],
      "Spain",
      2,
    ),
    new Question(
      "What other language can Jorge Berrizbeitia speak?",
      ["Swahili", "Deutsch", "French", "Spanish"],
      "Spanish",
      2,
    ),
    new Question(
      "What is the country of origin of Chukwudi Okolo?",
      ["Nigeria", "Germany", "Benin", "Cameroon"],
      "Nigeria",
      2,
    ),
    new Question(
      "Jorge Berrizbeitia is a native of which country?",
      ["Italy", "Spain", "Costa Rica", "Venezuela"],
      "Venezuela",
      2,
    ),
    new Question(
      "Which country is Aybike Celebi Visser originally from?",
      ["Netherlands", "Germany", "Turkey", "Georgia"],
      "Turkey",
      3,
    ),
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);

  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  let timer;
  /************  SHOW INITIAL CONTENT  ************/
  function startTimer() {
    timer = setInterval(function () {
      // decrease time
      quiz.timeRemaining--;
      const minutes = Math.floor(quiz.timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

      // Display the time remaining in the time remaining container
      //const timeRemainingContainer = document.getElementById("timeRemaining");
      //timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      /*// convert to minutes and seconds
      const minutes = Math.floor(quiz.timeRemaining / 60)
        .toString()
        .padStart(2, "0");

      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

      // update UI*/
      const timeRemainingContainer = document.getElementById("timeRemaining");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      // stop when time is up
      if (quiz.timeRemaining <= 0) {
        quiz.timeRemaining = 0;
        clearInterval(timer);
        showResults();
      }
    }, 1000); // runs every 1 second
  }

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed

  // Show first question
  showQuestion();

  startTimer();

  /************  TIMER  ************/

  //let timer;

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  restartButton.addEventListener("click", restartQuiz);

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

    // Get the current question from the quiz by calling the Qui0

    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    const question = quiz.getQuestion();
    question.shuffleChoices();

    // YOUR CODE HERE:
    // console.log(quiz);
    //console.log(question);
    // 1. Show the question
    const questionElement = document.getElementById("question");
    questionElement.style.display = "block";
    questionElement.innerText = question.text;

    //console.log(questionDisplay);

    // Update the inner text of the question container element and show the question text

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    const progressBar = document.getElementById("progressBar");
    const progressingPercent =
      ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;
    progressBar.style.width = progressingPercent + "%";
    //progressBar.style.width = progressPercent + "%";
    //progressPercent + "%";
    //progressBar.style.width = `65%`; // This value is hardcoded as a placeholder

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions
    const progressText = document.getElementById("questionCount");
    progressText.innerText =
      "Question-" +
      (quiz.currentQuestionIndex + 1) +
      "-of-" +
      quiz.questions.length;

    //questionCount.innerText = `Question 1 of 10`; //  This value is hardcoded as a placeholder
    //Display choices
    // const choicesList = document.getElementById("choices");

    /// clear old choices
    // choicesList.innerHTML = "";

    /// create <li>

    // create radio input

    // 4. Create and display new radio input element with a label for each choice.
    // create radio input

    question.choices.forEach((choice, index) => {
      const li = document.createElement("li");

      const element = document.createElement("input"); //li element and radio input
      element.type = "radio";
      element.name = "choice";
      element.value = choice; // This value is hardcoded as a placeholder
      element.id = "choice" + index;

      const label = document.createElement("label");
      label.setAttribute("for", element.id);
      label.innerText = choice; // This value is hardcoded as a placeholder

      li.appendChild(element);
      li.appendChild(label);

      // Append the radio input and label to the choice container
      choiceContainer.appendChild(li);
    });

    // const element = document.createElement("element");
    /// loop through choices
    // question.choices.forEach((eachChoice) => {

    //const li = document.createElement("li");

    // label = document.createElement("label");
    //label.setAttribute("for", element.id);
    //label.textContent = choice;
    //console.log(eachChoice);

    //     element.type = "radio";
    //    element.name = "choice";
    //    element.value = CHOICE TEXT HERE;
    //element.id = "choice" + index;
    //  });

    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    /* 
          <input type="radio" name="choice" value="CHOICE TEXT HERE">
          <label>CHOICE TEXT HERE</label>
        <br>
      */
    //const label = document.createElement("label");
    //label.setAttribute("for", element.id);
    //label.textContent = choice;

    //li.appendChild(element);
    //li.appendChild(label);

    //choicesList.appendChild(li);
    //});
  }
  // Hint 1: You can use the `document.createElement()` method to create a new element.
  // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
  // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
  // Hint 4: You can use the `element.innerText` property to set the inner text of an element.
  //}
  //startTimer();

  function nextButtonHandler() {
    const choices = document.querySelectorAll(`input[name="choice"]`); // A variable to store the selected answer value

    // YOUR CODE HERE:
    let selectedAnswer = null; //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.

    // 2. Loop through all the choice elements and check which one is selected
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

  /*if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      showQuestion();
    } else {
      quiz.moveToNextQuestion();
      showQuestion();
    }*/
  // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
  //  When a radio input gets selected the `.checked` property will be set to true.
  //  You can use check which choice was selected by checking if the `.checked` property is true.

  // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
  // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
  // Move to the next question by calling the quiz method `moveToNextQuestion()`.
  // Show the next question by calling the function `showQuestion()`.
  // restartButton.addEventListener("click", restartQuiz);
  function showResults() {
    // YOUR CODE HERE:
    // stop timer
    clearInterval(timer);
    /*quizView.style.display = "none";
  endView.style.display = "flex";*/

    //resultContainer.innerText =
    //`You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;*/
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    //restartButton.style.display = "block";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
    //resultContainer.innerText = `You scored 1 out of 1 correct answers!`; // This value is hardcoded as a placeholder
    //restartButton();
  }
  function restartQuiz() {
    // 1. Reset quiz data
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;

    // 2. Reset time
    quiz.timeRemaining = quiz.timeLimit;

    // 3. Update timer display
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");

    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    document.getElementById("timeRemaining").innerText =
      `${minutes}:${seconds}`;

    // 4. Reset views
    endView.style.display = "none";
    quizView.style.display = "block";
    restartButton.style.display = "block";

    // 5. Restart timer
    clearInterval(timer);
    startTimer();
    /*if (restartButton) {
      restartButton.addEventListener("click", restartQuiz);
    }*/
    //restartButton();

    // 6. Show first question again
    showQuestion();
  }

  //restartQuiz();

  //restartButton.addEventListener("click", restartQuiz);
});
