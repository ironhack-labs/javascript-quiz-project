document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView"); // div en index.html
  const endView = document.querySelector("#endView"); // div en index.html

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar"); // div en index.html
  const questionCount = document.querySelector("#questionCount"); // div en index.html
  const questionContainer = document.querySelector("#question"); // div en index.html
  const choiceContainer = document.querySelector("#choices"); // div en index.html
  const nextButton = document.querySelector("#nextButton"); // div en index.html

  // End view elements
  const resultContainer = document.querySelector("#result"); // div en index.html


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block"; // aparece quizView como elemento de bloque en index.html
  endView.style.display = "none"; // desaparece el elemento endView en index.html


  /************  QUIZ DATA  ************/
  
  // Array with the quiz questions
  const questions = [
    // new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1), //agrega preguntas al array questions
    // new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1), // agrega preguntas al array questions
    // new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2), // agrega preguntas al array questions
    // new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3), // agrega preguntas al array questions
    // Add more questions here
    new Question("Rayo-mcQueen, ¿tiene seguro de vida o seguro de coche?", ["Seguro de vida", "Seguro de coche", "No tiene seguro", "¡Ka-chow!"], "¡Ka-chow!", 3),

    new Question("Si el veneno caduca, ¿envenena más o menos?", ["Más", "Menos", "Soy Imortal bb", "Depende, si soy YO el veneno: mata"], "Depende, si soy YO el veneno: mata", 1),

    new Question("¿Es posible respirar y tragar al mismo tiempo?", ["Si", "No lo se", "Lo acabo de intentar", "No lo se y me da rabia quien lo sabe"], "Lo acabo de intentar", 3),

    new Question("¿Si el sol emite luz y está en el espacio, ¿Por que hay luz aqui en la tierra y en el espacio no?", ["Paso de responder, estoy saturado por el bootcamp", "El que hizo está pregunta es un genio incomprendido", "En realidad soy yo el que brilla", "Hoy está lloviendo"], "Paso de responder, estoy saturado por el bootcamp", 1),

    new Question("¿Si Pinocho dice que su nariz va a crecer, será verdad o mentira?", ["Verdad", "Mentira", "Quien fue el tarado que inventó está pregunta?", "Cari, es una paradoja y no se puede solucionar. Me he quedao tiesa..."], "Cari, es una paradoja y no se puede solucionar. Me he quedao tiesa...", 2)
  ];
  const quizDuration = 120; // 120 seconds (2 minutes) //duración del quiz


  /************  QUIZ INSTANCE  ************/
  
  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration); //crea una nueva variable que almacenará nuevos parametros

  // Shuffle the quiz questions
  quiz.shuffleQuestions(); //función que ordenará aleatoriamente las preguntas del quiz


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();
  let intervalId;
  startCountdown();


  /************  TIMER  ************/

  function startCountdown() {
    intervalId = setInterval(() => {
      quiz.timeRemaining--;
      // console.log("time remaining")
      const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      const timeRemainingContainer = document.getElementById("timeRemaining");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      if(quiz.timeRemaining === 0) {
        clearInterval(intervalId);
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
    
    questionContainer.innerText = question.text;
    
    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    const progressPercent = (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`; 



    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions
    
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`; 


    
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

      // limpiamos el contenedor (en el caso que no venga vacio)
      choiceContainer.innerHTML = "";

      //seleccionamos las cuestiones e iteramos sobre ellas con un forEach, indicando cada Choice y su index correspondiente
      question.choices.forEach((eachChoice, index) => {
      const choicesOptions = document.createElement('li'); // creamos un nuevo elemento 'li'

      const input = document.createElement('input'); // creamos un nuevo elemento 'input' y le agregamos sus propiedades
      input.type = 'radio';
      input.id = `choice${index}`;
      input.name = 'choice';
      input.value = eachChoice;

      const label = document.createElement('label'); // creamos un nuevo elemento 'label' y le agregamos sus propiedades
      label.for = `choice${index}`;
      label.textContent = eachChoice;

      // añadimos "input" y "label" a nuestro "li"
      choicesOptions.appendChild(input);
      choicesOptions.appendChild(label);

      //añadimos todo esto al choiceContainer que es nuestro <ul>#choices en index.html, donde se van a crear nuestros 'li'
      choiceContainer.appendChild(choicesOptions);
    });
  }


  
  function nextButtonHandler () {
    let selectedAnswer; // A variable to store the selected answer value



    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    const choicesElements = document.querySelectorAll("input[name = 'choice']");

    // 2. Loop through all the choice elements and check which one is selected
      // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
      //  When a radio input gets selected the `.checked` property will be set to true.
      //  You can use check which choice was selected by checking if the `.checked` property is true.
    choicesElements.forEach((eachElem) => {
      if(eachElem.checked) {
        selectedAnswer = eachElem.value; //eachChoice from questions.choices, but the selected one
      }
    });
      
    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
      // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
      // Move to the next question by calling the quiz method `moveToNextQuestion()`.
      // Show the next question by calling the function `showQuestion()`.
    if(selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
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
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;

    clearInterval(intervalId)

  }



  function restartQuizHandler() {
    const endViewHidden = document.getElementById('endView');
    const quizViewDisplay = document.getElementById('quizView');

    endViewHidden.style.display = "none"
    quizViewDisplay.style.display = "flex"

    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.questions.forEach(question => question.shuffleChoices());

    quiz.timeRemaining = quizDuration;

    startCountdown();
    showQuestion();
    


  }
  
  document.getElementById('restartButton').addEventListener('click', () => {
    restartQuizHandler();
  });
});