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

  const restartBtn = document.querySelector("#restartButton")

  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/
  
  // Array with the quiz questions
  const questions = [
    new Question("¿Cuál es el emoji que mejor describe cómo nos sentimos después de una larga jornada de codificación?", ["😅 (aliviado después de solucionar un bug)", "🤯 (cuando el código parece no funcionar)", "🚀 (cuando finalmente logramos que funcione)", "😴 (necesitando una siesta después de tanto pensar)"], "😴 (necesitando una siesta después de tanto pensar)", 1),
    new Question("¿En qué planeta nació Luke Skywalker?", ["Naboo", " Tatooine ", "Alderaan", "Gallifrey"], "Tatooine", 2),
    new Question("¿Cuál de estos personajes no pertenece al universo de Marvel?", ["Iron Man", "Thor", "Batman", "Black Widow"], "Batman", 2),
    new Question("¿Qué animal representa mejor la personalidad de nuestro profesor de bootcamp?", ["León (líder fuerte y motivador)", "Búho (sabio y con respuestas para todo)", "Tortuga (paciente y meticuloso)", "Mono (activo y lleno de energía)"], "Búho (sabio y con respuestas para todo)", 2),
    new Question("¿Qué casa de Hogwarts tiene un león?", ["Slytherin", "Ravenclaw", "Hufflepuff", "Gryffindor"], "Gryffindor", 1),
    new Question("¿Cuál es el nombre del dragón en El Hobbit?", ["Smaug", "Drogon", "Falkor", "Toothless"], "Smaug", 1),
    new Question("¿Cuál es la palabra o frase más usada por nuestro grupo durante el bootcamp?", ["¿A ti te funciona?", "¡Ya lo tengo!", "¡No se que hice!", "¿Qué pasó aquí?"], "¡No se que hice!", 1),
    new Question("¿Cuál es el país más largo del mundo de norte a sur?", ["Brasil", "Rusia", "Chile", "Canadá"], "Chile", 1),

    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/
  
  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();
  console.log (quiz)


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

  const intervalId = setInterval(() => {
    // remainingTime--;
    // timeRemainingContainer.innerText = remainingTime;
    // if (remainingTime === 0) {
    // clearInterval(intervalId);
    // }

    //restar al timeRemaining de Quiz
    quiz.timeRemaining--
    // console.log(quiz.timeRemaining)
    // convertir el valor en segundos de timeRemaining a Min y Seg
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    // console.log(minutes, seconds) 
    // convertimos a minutos y segundos
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    // cuando el timer llegue a 0, se detiene el temporizador
    if (quiz.timeRemaining === 0){
      clearInterval(intervalId)
      showResults()
    }

  }, 1000);





  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartBtn.addEventListener("click", () => { 
    quiz.timeRemaining = 120;
    quiz.correctAnswers = 0;
    quiz.currentQuestionIndex = 0;

    quizView.style.display = "flex";
    endView.style.display = "none";
    showQuestion()

  })



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
    console.log (question)
    
    

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text
    console.log (questionContainer.innerText)

    
    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    let numeroDePreguntaActual = quiz.currentQuestionIndex
    let totalDePreguntas = quiz.questions.length

    let barraProgreso = (numeroDePreguntaActual / totalDePreguntas) * 100
    let porcentaje = `${barraProgreso}%`

     console.log (porcentaje)

    progressBar.style.width = porcentaje


    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions
    
    questionCount.innerText = `Question 1 of 10`; //  This value is hardcoded as a placeholder
    questionCount.innerText = `Question ${numeroDePreguntaActual + 1} of ${totalDePreguntas}`


    
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

    // choiceContainer.innerHTML = question.choices
    // console.log (choiceContainer.innerText)
    // console.log (choiceContainer.innerHTML)

    question.choices.forEach((eachChoice) => {
      // console.log (eachChoice)
      const radioButton = document.createElement("input");
      radioButton.type = "radio";
      radioButton.name = "choice";
      radioButton.value = eachChoice;

      
      const labelButton = document.createElement("label");
      labelButton.innerText = eachChoice

      const br = document.createElement("br")

      choiceContainer.appendChild(radioButton);
      choiceContainer.appendChild(labelButton);
      choiceContainer.appendChild(br);
    })
  }


  
  function nextButtonHandler () {
    let selectedAnswer; // A variable to store the selected answer value



    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    let allChoices = document.querySelectorAll("#choices input")
    console.log(allChoices) 
    
    

    // 2. Loop through all the choice elements and check which one is selected
      // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
      //  When a radio input gets selected the `.checked` property will be set to true.
      //  You can use check which choice was selected by checking if the `.checked` property is true.
    allChoices.forEach((cadaElem) => {
      if (cadaElem.checked === true){
        // console.log(cadaElem)
        // console.log(cadaElem.checked)
        selectedAnswer = cadaElem.value
      }
    })
      quiz.checkAnswer(selectedAnswer)
      quiz.moveToNextQuestion()
      showQuestion()
    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
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
  
});