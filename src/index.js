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

  //here
  let questionCounter = 0; // Start at 0, increment before use to reflect current question number
  let questionNum = 1; // Same as above, ensures first question shows "Question 1 of X"

  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
@@ -34,15 +37,14 @@ document.addEventListener("DOMContentLoaded", () => {
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions

  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
@@ -56,26 +58,31 @@ document.addEventListener("DOMContentLoaded", () => {
  // Show first question
  showQuestion();


  /************  TIMER  ************/

  let timer;

  //countdown starts:


// Ensure to start the timer when the quiz starts
  startQuizTimer();



  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);


  //this was added:
  restartButton.addEventListener("click", restartButtonHandler);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results



  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
@@ -92,28 +99,24 @@ document.addEventListener("DOMContentLoaded", () => {
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();



    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text

    questionContainer.innerText = question.text;

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    progressBar.style.width = `65%`; // This value is hardcoded as a placeholder


    let questionCountPercentage = (questionCounter/questions.length) * 100;
    progressBar.style.width = `${questionCountPercentage}%`; // This value is hardcoded as a placeholder


    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions

    questionCount.innerText = `Question 1 of 10`; //  This value is hardcoded as a placeholder

    questionCount.innerText = `Question ${questionNum} of ${questions.length}`; //  This value is hardcoded as a placeholder


    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
      // For each choice create a new radio input with a label, and append it to the choice container.
@@ -128,37 +131,74 @@ document.addEventListener("DOMContentLoaded", () => {
      // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
      // Hint 4: You can use the `element.innerText` property to set the inner text of an element.

  }
    // Loop through the choices of the current question
    question.choices.forEach((choice, index) => {
    // Create the radio input element
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'choice';
    radioInput.value = choice;
    radioInput.id = 'choice' + index; // Ensure a unique ID for each choice

    // Create the label element
    const label = document.createElement('label');
    label.htmlFor = 'choice' + index; // Associate the label with the corresponding input
    label.innerText = choice;


  function nextButtonHandler () {
    let selectedAnswer; // A variable to store the selected answer value
    // Append the radio input and label to the choice container
    choiceContainer.appendChild(radioInput);
    choiceContainer.appendChild(label);

    //for better readability
    const lineBreak = document.createElement('br');
    choiceContainer.appendChild(lineBreak);
    });


  }
  function nextButtonHandler () {
    let selectedAnswer = null; // A variable to store the selected answer value
    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.


    const choices = document.querySelectorAll('input[name="choice"]');
    // 2. Loop through all the choice elements and check which one is selected
      // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
      //  When a radio input gets selected the `.checked` property will be set to true.
      //  You can use check which choice was selected by checking if the `.checked` property is true.


    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    // When a radio input gets selected the `.checked` property will be set to true.
    // You can use check which choice was selected by checking if the `.checked` property is true.

    choices.forEach(choice => {
          if (choice.checked) {
              selectedAnswer = choice.value;
          }
      });
    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
      // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
      // Move to the next question by calling the quiz method `moveToNextQuestion()`.
      // Show the next question by calling the function `showQuestion()`.
  }  
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.

    if (selectedAnswer !== null) {
        const currentQuestion = quiz.getQuestion();
        const isCorrect = (selectedAnswer === currentQuestion.answer);
        if(isCorrect){
          quiz.checkAnswer(selectedAnswer);
        } else {
        //this is for validation purposes.
          alert("INCORRECT")
        }
        questionNum++;
        questionCounter++;

        quiz.moveToNextQuestion();

        showQuestion();
      }  }


  function showResults() {

    clearInterval(timer); // Clear the timer if the quiz has ended
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
@@ -168,7 +208,60 @@ document.addEventListener("DOMContentLoaded", () => {
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored 1 out of 1 correct answers!`; // This value is hardcoded as a placeholder
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${questions.length} correct answers!`; // This value is hardcoded as a placeholder



  }

});

  //buttonHandler function:
  function restartButtonHandler() {

    // Restart the timer


    // Show the first question again
    showQuestion();

      quiz.currentQuestionIndex = 0; 
      quiz.correctAnswers = 0;

      //reseting timer
      clearInterval(timer);
      quiz.timeRemaining = quizDuration;
      const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      quiz.shuffleQuestions(); 
      startQuizTimer();

      questionCounter = 0;
      questionNum = 1; 

      quizView.style.display = "block";
      endView.style.display = "none";

      showQuestion();
  }


  function startQuizTimer() {
    timer = setInterval(function () {
        if (quiz.timeRemaining > 0) {
            quiz.timeRemaining--;


            const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
            const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
            timeRemainingContainer.innerText = `${minutes}:${seconds}`;

        } else {
          // Time's up, end the quiz
            learInterval(timer);
            showResults();
        }
    }, 1000);
  }
  });
