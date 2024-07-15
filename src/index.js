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
  const restartQuizBtn = document.querySelector("#restartButton")

  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/
  
  // Array with the quiz questions
  const questions = [
    // Add more questions here
    new Question("¿En qué película de Disney aparece el personaje de Simba?🦁",["Aladdin","La Bella y la Bestia","El Rey León","La Sirenita"],"El Rey León",1),
    new Question(`¿Cuál es el nombre de la sirena protagonista de "La Sirenita"?🧜‍♀️`,["Bella", "Ariel","Jasmine","Elsa"],"Ariel",1),
    new Question("¿Qué objeto pierde Cenicienta en el baile?👸🏼",["Un collar", "Una tiara", "Un zapato de cristal", "Un abanico"],"Un zapato de cristal",1),
    new Question(`¿Cuál es el nombre del juguete vaquero en "Toy Story"?🤠`,["Buzz Lightyear","Woody","Jessie","Rex"],"Woody",2),
    new Question(`En "Aladdin", ¿cómo se llama el villano principal?🧞‍♂️`,["Scar","Hades","Jafar","Gastón"],"Jafar",2),
    new Question(`¿Qué tipo de animal es Baloo en "El libro de la selva"?🐒`,["Un tigre","Un lobo","Un oso","Un mono"],"Un oso",2),
    new Question(`¿Cuál es el nombre del dragón en "Mulán"?🐉`,["Mushu","Shere Khan","Smaug","Elliot"],"Mushu",3),
    new Question(`¿Cómo se llama la ciudad donde viven los protagonistas de "Zootopia"?🦊`,["Zootrópolis","Animápolis","Bestiópolis","Metropolis"],"Zootrópolis",3),
    new Question(`¿Qué tipo de pez es Dory en "Buscando a Nemo"?🐠`,["Pez payaso","Pez cirujano azul","Pez globo","Pez ángel"],"Pez cirujano azul",3),
    new Question(`En "Frozen", ¿cómo se llama el reino donde viven Elsa y Anna?❄️`,["Arendelle","Corona","Atlantica","Andalasia"],"Arendelle",3),
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/
  
  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  

  // Show first question
  showQuestion();
  


  /************  TIMER  ************/
  let timer;
  
  function updateTimer(){
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    
      // Display the time remaining in the time remaining container
      const timeRemainingContainer = document.getElementById("timeRemaining");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }

function timerFunction(){
  timer = setInterval(() =>{
    quiz.timeRemaining--

    updateTimer();

    if(quiz.timeRemaining === 0){
      clearInterval(timer);
      showResults();
    }
    
  }, 1000);
}

  
timerFunction();

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  restartQuizBtn.addEventListener("click", () => {
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quizView.style.display = "flex";
    endView.style.display = "none";
    quiz.shuffleQuestions();
    showQuestion();
    quiz.timeLimit = 120;
    quiz.timeRemaining = 120;
    timerFunction();
    updateTimer();
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
    console.log(question)
    console.log(quiz)
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();
    
    

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text
    // choiceContainer.innerHTML = question.shuffleChoices()
    
    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    
    /* console.log(quiz.questions.length)
    console.log(quiz.currentQuestionIndex) */
    const porcentaje = ((quiz.currentQuestionIndex) * 100) / quiz.questions.length
    
    progressBar.style.width = `${porcentaje}%`; // This value is hardcoded as a placeholder



    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions
    
    questionCount.innerText = `Question ${quiz.currentQuestionIndex+1} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder
    question.choices.forEach(element => {
      const inputRadio = document.createElement("div")
    inputRadio.innerHTML = `<input type="radio" name="choice" class= "option" value="${element}">
          <label>${element}</label>
        <br>`
        choiceContainer.appendChild(inputRadio)
    });
    
    /* const inputRadio = document.createElement("div")
    inputRadio.innerHTML = `<input type="radio" name="choice" value="${question.choices[0]}">
          <label>${question.choices[0]}</label>
        <br>`
        choiceContainer.appendChild(inputRadio)
       */
        
 
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

  }


  
  function nextButtonHandler () {
    let selectedAnswer; // A variable to store the selected answer value


    
    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    const allChoices = document.querySelectorAll(".option")
    
  

    // 2. Loop through all the choice elements and check which one is selected
      // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
      //  When a radio input gets selected the `.checked` property will be set to true.
      //  You can use check which choice was selected by checking if the `.checked` property is true.
      allChoices.forEach(element=> {
      if(element.checked === true){
        selectedAnswer = element.value
      }
    })
      
    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
      // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
      // Move to the next question by calling the quiz method `moveToNextQuestion()`.
      // Show the next question by calling the function `showQuestion()`.
    quiz.checkAnswer(selectedAnswer)
    
    quiz.moveToNextQuestion() 

    showQuestion()
  }  
  
 


  function showResults() {

    // YOUR CODE HERE:
/*     document.querySelector(quizView).remove()

    document.querySelector(endView) */
    // 1. Hide the quiz view (div#quizView)
    if(quiz.currentQuestionIndex.length){
      
    }
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";
    
    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `Has acertado ${quiz.correctAnswers} de ${quiz.questions.length} respuestas correctas!`; // This value is hardcoded as a placeholder

    clearInterval(timer);
  }
  
});

