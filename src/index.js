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
      "Which hand ranks highest in Texas Hold'em?",
      ["Flush", "Full House", "Straight", "Four of a Kind"],
      "Four of a Kind",
      1
    ),
    new Question(
      "What is the weakest starting hand in NLH?",
      ["7-2 offsuit", "9-4 suited", "Q-3 offsuit", "10-2 suited"],
      "7-2 offsuit",
      1
    ),
    new Question(
      "Which position is considered the most profitable in NLH?",
      ["Hijack", "Cutoff", "Button", "Big Blind"],
      "Button",
      2
    ),
    new Question(
      "What does it mean to have 'the nuts'?",
      ["A strong draw", "The best possible hand", "Middle pair", "Top pair with kicker"],
      "The best possible hand",
      1
    ),
    new Question(
      "What are 'hole cards' in NLH?",
      ["Community cards", "Face-up cards", "Your private cards", "Folded cards"],
      "Your private cards",
      1
    ),
    new Question(
      "What is a C-bet in NLH?",
      ["A bet on the river", "A continuation bet after raising preflop", "A check-raise", "A bluff with air"],
      "A continuation bet after raising preflop",
      2
    ),
    new Question(
      "What do we call the last community card dealt?",
      ["Flop", "Turn", "River", "Board"],
      "River",
      1
    ),
    new Question(
      "If you have A♥ K♥ and the flop is Q♥ 9♥ 2♥, what do you have?",
      ["Top pair", "Flush", "Backdoor flush draw", "Straight draw"],
      "Flush",
      2
    ),
    new Question(
      "What does it mean to '3-bet' preflop?",
      ["Call a raise", "Make the third bet (a re-raise)", "Go all-in", "Limp in"],
      "Make the third bet (a re-raise)",
      3
    ),
    new Question(
      "You're in the Big Blind with 2♣ 7♦. Action folds to the Button who raises. What's your hand called?",
      ["Premium", "Trash", "Suited connectors", "Middle pair"],
      "Trash",
      1
    )
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



  // start timer
  let timer;
  startTimer();

  /************  TIMER  ************/

  const countDownElm = document.getElementById("timeRemaining");
  function startTimer() {
    timer = setInterval(() => {
      quiz.timeRemaining = quiz.timeRemaining -1;
      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
      } 
      
      const minutes = Math.floor(quiz.timeRemaining / 60);
      const seconds = quiz.timeRemaining % 60;
      countDownElm.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

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

    // 1. Show the question
    const currentQuestion = quiz.getQuestion();
    questionContainer.innerText = currentQuestion.text;

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    const percentage = 10;
    progressBar.style.width = `${percentage}%`; // This value is hardcoded as a placeholder

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    const currentQuestionNumber = quiz.currentQuestionIndex + 1; 
    const totalQuestions = quiz.questions.length;

    // Update the question count dynamically
    questionCount.innerText = `Question ${currentQuestionNumber} of ${totalQuestions}`; //  This value is hardcoded as a placeholder

    // 4. Create and display new radio input element with a label for each choice.

    currentQuestion.choices.forEach((choice) => {
      // step 1: create dom element
      const newInput = document.createElement("input");
      const newLabel = document.createElement("label");
      const newBr = document.createElement("br");

      // step 2: modify
      newInput.type = "radio";
      newInput.name = "answer";
      newInput.value = choice;

      newLabel.innerText = choice;

      // step 3: append
      choiceContainer.appendChild(newInput);
      choiceContainer.appendChild(newLabel);
      choiceContainer.appendChild(newBr);
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
 // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
   // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.
  function nextButtonHandler() {
    let selectedAnswer = null; // A variable to store the selected answer value
    const choices = document.querySelectorAll('input[name="answer"]');
    choices.forEach((choice) => {
      if (choice.checked) {
        // Check if the current choice is selected
        selectedAnswer = choice.value; // Store the value of the selected choice
     
      
      }

    });


    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.
    if (selectedAnswer !== null) {
      // Check if the selected answer is correct by calling the quiz method `checkAnswer()`
      quiz.checkAnswer(selectedAnswer);

      // Move to the next question using the quiz method `moveToNextQuestion()`
      quiz.moveToNextQuestion();
      

      // Clear previous choices to prepare for displaying the next question
      choiceContainer.innerHTML = "";

      // Show the next question by calling the function `showQuestion()`
      showQuestion();
    } else {
      // Alert the user to select an answer if no answer is selected
      alert("Please select an answer before proceeding.");
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
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.correctAnswers} correct answers!`; // This value is hardcoded as a placeholder
  }
});