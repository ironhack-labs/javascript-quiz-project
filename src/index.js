document.addEventListener("DOMContentLoaded", () => {
  // Here we use DOMContentLoaded to ensure the HTML is fully loaded before running the script
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView"); // The quiz view container is the view shown during the quiz
  const endView = document.querySelector("#endView"); // The end view container is the view shown when the quiz ends

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar"); // The progress bar is the green bar that shows the progress through the quiz
  const questionCount = document.querySelector("#questionCount"); // The question count shows the current question number out of total questions
  const questionContainer = document.querySelector("#question"); // The question container is the element that shows the question text
  const choiceContainer = document.querySelector("#choices"); // The choice container is the element that holds the question choices
  const nextButton = document.querySelector("#nextButton"); // The next button is the button to move to the next question

  // End view elements
  const resultContainer = document.querySelector("#result"); // The result container is the element that shows the quiz results

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block"; // Shows the view shown during the quiz
  endView.style.display = "none"; // Hides the view shown at the end of the quiz

  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    // Create new Question objects and add them to the questions array
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1), // Question and different choices
    new Question(
      "What is the capital of France?",
      ["Miami", "Paris", "Oslo", "Rome"],
      "Paris",
      1,
    ), // Question and different choices
    new Question(
      "Who created JavaScript?",
      ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"],
      "Brendan Eich",
      2,
    ), // Question and different choices
    new Question(
      "What is the mass-energy equivalence equation?",
      ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"],
      "E = mc^2",
      3,
    ), //Question and diferent choices
    new Question(
      "What does `undefined` really mean?",
      [
        "Nothing",
        "Something mysterious",
        "JavaScript gave up",
        "You messed up",
      ],
      "JavaScript gave up",
      3,
    ),
    new Question(
      "How many bugs are there in your code?",
      ["0", "1", "Too many", "It’s a feature"],
      "It’s a feature",
      1,
    ),
    new Question(
      "What happens if you forget a semicolon in JavaScript?",
      [
        "The computer explodes",
        "Nothing",
        "JavaScript cries",
        "Sometimes chaos",
      ],
      "Sometimes chaos",
      2,
    ),
    new Question(
  "What does 'I’ll fix it later' usually mean?",
  ["Tomorrow", "Next week", "Never", "After coffee"],
  "Never",
  1
),
new Question(
  "How do you know your solution works?",
  ["It passes all tests", "It works once", "You don’t touch it again", "You understand it"],
  "You don’t touch it again",
  2
),
new Question(
  "What is the real purpose of group projects?",
  ["Learning teamwork", "Sharing knowledge", "Stress testing friendships", "Finishing faster"],
  "Stress testing friendships",
  2
),



    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes) // Total duration of the quiz in seconds that is = a 2 minutes

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration); // This is the quiz object that holds the quiz data and methods
  // Shuffle the quiz questions
  quiz.shuffleQuestions(); // Call the method `shuffleQuestions()` on the quiz object to shuffle the questions during the quiz

  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed

  //It splits the total time into minutes and seconds so it can be shown nicely in the quiz.
  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0"); // Calcula los minutos restantes
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0"); // Calcula los segundos restantes

  // Display the time remaining in the time remaining container
 const timeSpan = document.querySelector("#timeRemaining span");
  timeSpan.innerText = `${minutes}:${seconds}`;



  // Show first question
  //showQuestion();
  //startTimer(); // Start the quiz timer when the quiz starts

  /************  TIMER  ************/

  function startTimer() {
   const timeSpan = document.querySelector("#timeRemaining span");

    timer = setInterval(function () {
      // calcular minutos y segundos
      const minutes = Math.floor(quiz.timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

      // mostrar en pantalla
      timeSpan.innerText = `${minutes}:${seconds}`;


      // restar 1 segundo
      quiz.timeRemaining--;

      // si se acaba el tiempo
      if (quiz.timeRemaining <= 0) {
        quiz.timeRemaining = 0;
        clearInterval(timer);
        timesSpan.innerText = "00:00";
        showResults();
        return;
      }
    }, 1000);
  }
  showQuestion();
  startTimer();

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", restartButtonHandler);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function restartButtonHandler() {
    endView.style.display = "none";

    quizView.style.display = "block";

    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    showQuestion();
    startTimer();
  }

  function showQuestion() {
    // Displays the current question and its choices
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
    //console.log(question);

    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    // YOUR CODE HERE:

    questionContainer.innerText = question.text;

    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    //questionContainer.innerText = question.text;

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    const progress = (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`; // This value is hardcoded as a placeholder

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    // Shows the current question number out of the total number of questions
    // Starts at 0 but for the user question 0 NO, question 1 YES:

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder

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
    //console.log(question.choices);
    question.choices.forEach((choice) => {
      //console.log(choice);
      let input = document.createElement("input");
      input.type = "radio";
      input.name = "choice";
      input.value = choice;

      let label = document.createElement("label");
      label.innerText = choice;
      //console.log(input, label);

      choiceContainer.appendChild(input);
      choiceContainer.appendChild(label);

      let newLiNode = document.createElement("li");
      choiceContainer.appendChild(newLiNode);
    });
  }

  function nextButtonHandler() {
    // Handles the click on the next button
    let selectedAnswer; // A variable to store the selected answer value

    // YOUR CODE HERE:

    const choices = document.querySelectorAll('input[name="choice"]');
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

    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.

    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.

    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.
  }

  function showResults() {
    clearInterval(timer);
    quiz.timeRemaining = quizDuration;
    timeSpan.innerText = "02:00";

    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }
});
