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
      "¿Cuál fue el primer Pokemon diseñado?",
      ["Mew", "Rhydon", "Bulbasaur", "Arceus"],
      "Rhydon",
      1
    ),
    new Question(
      "Cuál es el plato tipico de Euskadi",
      ["Cachopos", "Pintxos", "Gazpacho", "Tortilla con Cebolla"],
      "Pintxos",
      1
    ),
    new Question(
      "Quien es el autor de One Piece",
      ["Hideo Kojima", "Eiichiro Oda", "Akira Toriyama", "Bill Gates"],
      "Eiichiro Oda",
      2
    ),
    new Question(
      "Como se llama el portador del Anillo Unico en El Señor de los Anillos",
      ["Frodo Baggins", "Smeagol", "Gandalf", "Bilbo Baggins"],
      "Frodo Baggins",
      3
    ),
    // Add more que

    new Question(
      "Cual es el numero maximo de estrellas que puede tener una bola de dragon?",
      ["7", "4", "10", "5"],
      "7",
      3
    ),
    new Question(
      "Quien lleva la trifuerza de la Sabiduria?",
      ["Princesa Zelda", "Link", "Ganondorf", "Midna"],
      "Princesa Zelda",
      3
    ),
    new Question(
      "Como se llama el robot que acompaña a Wall-E?",
      ["E-VA", "Doraemon", "R2D2", "ClapTrap"],
      "E-VA",
      3
    ),
    new Question(
      "Como se llama el amigo rico e insportable de Nobita?",
      ["Tsuneo", "Masao", "Krilin", "Shizuka"],
      "Tsuneo",
      3
    ),
    new Question(
      "Cuantas veces tienes que repetir su nombre para invocar a BeetleJuice?",
      ["3", "2", "50", "13"],
      "3",
      3
    ),
    new Question(
      "De que serie de televisión es Rick Sanchez?",
      ["Rick and Morty", "Los Soprano", "Family Guy", "Hora de Aventuras"],
      "Rick and Morty",
      3
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
  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();

  //*************    TIMER   *****************/
  function startTimer() {
    let timer = setInterval(() => {
      quiz.timeRemaining--;

      const minutes = Math.floor(quiz.timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

      // Display the time remaining in the time remaining container
      const timeRemainingContainer = document.getElementById("timeRemaining");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      if (quiz.timeRemaining === 0) {
        clearInterval(timer);
        showResults();
      }
    }, 1000);
  }
  startTimer();
  let reStartBtn = document.querySelector(".button-secondary");

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  reStartBtn.addEventListener("click", reStartQuiz);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function reStartQuiz() {
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.timeRemaining = quizDuration;
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    progressBar.style.width = `${
      (quiz.currentQuestionIndex / quiz.questions.length) * 100
    }%`;
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;
    quiz.shuffleQuestions();
    quiz.getQuestion();
    showQuestion();
    
    

    quizView.style.display = "block";
    endView.style.display = "none";
  }

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
    console.log(quiz);
    console.log(question);
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    // YOUR CODE HERE:
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    console.log(question.choices);
    questionContainer.innerText = question.text;

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    // progressBar.style.width = `80%`; // This value is hardcoded as a placeholder

    progressBar.style.width = `${
      ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100
    }%`;

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    //  questionCount.innerText = `Question 1 of 10`; //  This value is hardcoded as a placeholder

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;

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
    question.choices.forEach((eachElement) => {
      let radioContainer = document.createElement("div");

      let inputElement = document.createElement("input");
      inputElement.type = "radio";
      inputElement.name = "elecciones";
      inputElement.value = eachElement;

      let labelElement = document.createElement("label");
      labelElement.textContent = eachElement;

      radioContainer.appendChild(inputElement);
      radioContainer.appendChild(labelElement);

      let parentElement = document.getElementById("choices");
      parentElement.appendChild(radioContainer);
    });
  }

  function nextButtonHandler() {
    let selectedAnswer = ""; // A variable to store the selected answer value

    // YOUR CODE HERE:

    let choiceElements = document.getElementsByName("elecciones");
    console.log(choiceElements);

    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.

    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.
    choiceElements.forEach((element) => {
      if (element.checked) {
        quiz.checkAnswer(element.value);
        quiz.moveToNextQuestion();
        showQuestion();
      }
    });

    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.
  }

  function showResults() {
    // YOUR CODE HERE:

    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }
});
