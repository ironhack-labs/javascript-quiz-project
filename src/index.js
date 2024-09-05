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
  const restartQuizButton = document.querySelector("#restartButton")

  let timer;

  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/
  
  // Array with the quiz questions
  const questions = [
    new Question("¿Cuál es la causa más común de muerte súbita?", ["Paro cardíaco", "Beber alcohol", "Apuntarte a un Bootcamp de Ironhack :)", "Comer solo McDonald's"], "Apuntarte a un Bootcamp de Ironhack", 1),
    new Question("Sobre Record Guiness. ¿Cuál es el record de retretes rotos a cabezazos?", ["58", "37", "46", "222"], "46", 1),
    new Question("¿Cómo se añade un elemento al principio de un array en JavaScript?", [".push()", ".pop()", ".shift()", ".unshift()"], ".unshift()", 2),
    new Question("¿Cuál es el hueso más pequeño del cuerpo humano?", ["Estribo", "Escafoides", "Uno de los huesos del dedo meñique", "Rótula"], "Estribo", 3),
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


  restartTimer();
  // Show first question
  showQuestion();


  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results
  function restartTimer() {
    clearInterval(timer);  // Detenemos el temporizador actual antes de reiniciar
    quiz.timeRemaining = quizDuration;
  
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  
    timer = setInterval(() => {  // Reiniciamos el temporizador
      quiz.timeRemaining--;
  
      const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  
      if (quiz.timeRemaining === 0) {
        showResults();
      }
  
    }, 1000);
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
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();
    
    

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text
    
    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    
    const currentQuestionIndex = quiz.currentQuestionIndex + 1
    const totalQuestions = quiz.questions.length
    const progressPercentage = (currentQuestionIndex/totalQuestions)*100
    progressBar.style.width = `${progressPercentage}%`; // El % es necesario para el width



    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions
    
    questionCount.innerText = `Question ${currentQuestionIndex} of ${totalQuestions}`; //  This value is hardcoded as a placeholder


    
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
        question.choices.forEach((eachChoice)=>{
          const inputBtn = document.createElement("input")
          inputBtn.type = "radio"
          inputBtn.name = "Choice"
          inputBtn.value= eachChoice
          const label = document.createElement("label")
          label.innerText = eachChoice
          choiceContainer.appendChild(inputBtn) 
          choiceContainer.appendChild(label)
          choiceContainer.appendChild(document.createElement("br"))// para que los botones se pongan en vertical
        })
  }


  
  function nextButtonHandler () {
    let selectedAnswer; // A variable to store the selected answer value

    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.


    // 2. Loop through all the choice elements and check which one is selected
      // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
      //  When a radio input gets selected the `.checked` property will be set to true.
      //  You can use check which choice was selected by checking if the `.checked` property is true.

      
    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
      // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
      // Move to the next question by calling the quiz method `moveToNextQuestion()`.
      // Show the next question by calling the function `showQuestion()`.
        const choiceNode = document.querySelectorAll("#choices input")
        choiceNode.forEach((eachInput)=>{
          if (eachInput.checked === true){
            selectedAnswer = eachInput.value
            quiz.checkAnswer(selectedAnswer)
            quiz.moveToNextQuestion()
            showQuestion()
          }
        })
            
  }  
  
  function showResults() {
    clearInterval(timer);
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";
    
    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }
  
  restartQuizButton.addEventListener("click", () => {
    clearInterval(timer);  // Detenemos el temporizador actual antes de reiniciar
    endView.style.display = "none";
    quizView.style.display = "flex";
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    restartTimer();
    
    // quiz.timeRemaining = quizDuration;
  
    // const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    // const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    // timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  
    // timer = setInterval(() => {  // Reiniciamos el temporizador
    //   quiz.timeRemaining--;
  
    //   const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    //   const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      
    //   timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  
    //   if (quiz.timeRemaining === 0) {
    //     showResults();
    //   }
  
    // }, 1000);
  
    showQuestion();
  });
  

});