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
      new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
      new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
      new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
      new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
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
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
  
    // Display the time remaining in the time remaining container
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  
    // Show first question
    showQuestion();
  
  
    /************  TIMER  ************/

    let timer;

    // Start the timer
    function startTimer() {
      timer = setInterval(() => {
        quiz.timeRemaining--;
        
        // Update the time display
        const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
        const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
        timeRemainingContainer.innerText = `Remaining Time: ${minutes}:${seconds}`;
        
        // Check if time has run out
        if (quiz.timeRemaining <= 0) {
          clearInterval(timer);
          showResults();
        }
      }, 1000);
    }

    // Start the timer when the page loads
    startTimer();
  
  
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
  
      // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
      const question = quiz.getQuestion();
      // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
      question.shuffleChoices();
      
      
  
      // 1. Show the question
      // Update the inner text of the question container element and show the question text
      questionContainer.innerText = question.text;

      // 2. Update the green progress bar
      // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
      const progressPercentage = (quiz.currentQuestionIndex / quiz.questions.length) * 100;
      progressBar.style.width = `${progressPercentage}%`;

      // 3. Update the question count text 
      // Update the question count (div#questionCount) show the current question out of total questions
      questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;

      // 4. Create and display new radio input element with a label for each choice.
      // Loop through the current question `choices`.
      question.choices.forEach(choice => {
        // Create radio input element
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "choice";
        radioInput.value = choice;
        
        // Create label element
        const label = document.createElement("label");
        label.innerText = choice;
        
        // Create line break element
        const lineBreak = document.createElement("br");
        
        // Append elements to choice container
        choiceContainer.appendChild(radioInput);
        choiceContainer.appendChild(label);
        choiceContainer.appendChild(lineBreak);
      });
  
    }
  
  
    
    function nextButtonHandler () {
      let selectedAnswer; // A variable to store the selected answer value

      // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
      const choiceElements = document.querySelectorAll('input[name="choice"]');

      // 2. Loop through all the choice elements and check which one is selected
      // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
      //  When a radio input gets selected the `.checked` property will be set to true.
      //  You can use check which choice was selected by checking if the `.checked` property is true.
      choiceElements.forEach(element => {
        if (element.checked) {
          selectedAnswer = element.value;
        }
      });

      // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
      if (selectedAnswer) {
        // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
        quiz.checkAnswer(selectedAnswer);
        // Move to the next question by calling the quiz method `moveToNextQuestion()`.
        quiz.moveToNextQuestion();
        // Show the next question by calling the function `showQuestion()`.
        showQuestion();
      } else {
        // If no answer is selected, show an alert
        alert("Please select an answer before proceeding!");
      }
    }
  
  
  
  
    function showResults() {
      // Clear the timer
      clearInterval(timer);
      
      // 1. Hide the quiz view (div#quizView)
      quizView.style.display = "none";

      // 2. Show the end view (div#endView)
      endView.style.display = "flex";
      
      // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
      resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
      
      // 4. Update the result progress bar to show the percentage of correct answers
      const resultProgressBar = document.querySelector("#resultProgressBar");
      const resultPercentage = (quiz.correctAnswers / quiz.questions.length) * 100;
      resultProgressBar.style.width = `${resultPercentage}%`;
    }

    function restartQuiz() {
      // Clear the existing timer
      clearInterval(timer);
      
      // Reset the quiz object
      quiz.currentQuestionIndex = 0;
      quiz.correctAnswers = 0;
      quiz.timeRemaining = quizDuration;
      
      // Shuffle questions again for variety
      quiz.shuffleQuestions();
      
      // Reset the views
      quizView.style.display = "block";
      endView.style.display = "none";
      
      // Reset the progress bar
      progressBar.style.width = "0%";
      
      // Reset the time display
      const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      timeRemainingContainer.innerText = `Remaining Time: ${minutes}:${seconds}`;
      
      // Show the first question
      showQuestion();
      
      // Start the timer again
      startTimer();
    }
    
  });