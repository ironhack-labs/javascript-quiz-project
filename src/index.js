// Espera a que el documento esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
  
  /************  ELEMENTOS HTML  ************/
  // Divs para las vistas del cuestionario
  const quizView = document.querySelector("#quizView"); // Vista del cuestionario
  const endView = document.querySelector("#endView");   // Vista del final del cuestionario

  // Elementos de la vista del cuestionario
  const progressBar = document.querySelector("#progressBar"); // Barra de progreso
  const questionCount = document.querySelector("#questionCount"); // Conteo de preguntas
  const questionContainer = document.querySelector("#question"); // Contenedor de la pregunta
  const choiceContainer = document.querySelector("#choices"); // Contenedor de las opciones
  const nextButton = document.querySelector("#nextButton"); // Botón para pasar a la siguiente pregunta
  
  // Elemento para mostrar el temporizador
  const timeRemainingContainer = document.getElementById("timeRemaining");

  // Elementos de la vista final
  const resultContainer = document.querySelector("#result"); // Contenedor para mostrar resultados

  /************  VISIBILIDAD DE LAS VISTAS  ************/

  // Muestra la vista del cuestionario y oculta la vista final
  quizView.style.display = "block"; // Muestra la vista del cuestionario
  endView.style.display = "none";    // Oculta la vista final

  /************  DATOS DEL CUESTIONARIO  ************/
  
  // Array con las preguntas del cuestionario
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Puedes añadir más preguntas aquí
    new Question("What is the largest planet in our solar system?", ["Earth", "Jupiter", "Mars", "Saturn"], "Jupiter", 2),
    new Question("Which element has the chemical symbol 'O'?", ["Gold", "Oxygen", "Osmium", "Hydrogen"], "Oxygen", 1),
    new Question("What is the smallest prime number?", ["0", "1", "2", "3"], "2", 1),
    new Question("In which year did the Titanic sink?", ["1912", "1905", "1915", "1920"], "1912", 2),
    new Question("Which programming language is known as the backbone of web development?", ["Python", "C++", "JavaScript", "Java"], "JavaScript", 1),
    new Question("Who wrote 'To Kill a Mockingbird'?", ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"], "Harper Lee", 2),
    new Question("What is the capital city of Japan?", ["Tokyo", "Seoul", "Beijing", "Bangkok"], "Tokyo", 1),
    new Question("What is the boiling point of water?", ["100°C", "90°C", "120°C", "80°C"], "100°C", 1),
    new Question("Which organ is responsible for pumping blood throughout the body?", ["Liver", "Lungs", "Heart", "Kidney"], "Heart", 1),
    new Question("What is the main ingredient in guacamole?", ["Tomato", "Avocado", "Pepper", "Onion"], "Avocado", 1),
    new Question("Who painted the Mona Lisa?", ["Vincent Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], "Leonardo da Vinci", 2),
    new Question("What is the hardest natural substance on Earth?", ["Gold", "Iron", "Diamond", "Quartz"], "Diamond", 3),
    new Question("Which planet is known as the Red Planet?", ["Earth", "Mars", "Venus", "Jupiter"], "Mars", 2),
    new Question("In which continent is Egypt located?", ["Asia", "Africa", "Europe", "Australia"], "Africa", 1),
    new Question("What is the square root of 16?", ["2", "4", "8", "3"], "4", 1),
    new Question("Which gas do plants absorb from the atmosphere?", ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], "Carbon Dioxide", 2),
    new Question("Who was the first person to walk on the moon?", ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"], "Neil Armstrong", 3),
    new Question("What is the capital of Italy?", ["Milan", "Rome", "Venice", "Florence"], "Rome", 1),
    new Question("How many continents are there on Earth?", ["5", "6", "7", "8"], "7", 2),
    new Question("Which vitamin is primarily obtained from sunlight?", ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"], "Vitamin D", 1)
  ];
  
  const quizDuration = 120; // Duración del cuestionario en segundos (120 segundos = 2 minutos)

  /************  INSTANCIA DEL CUESTIONARIO  ************/
  
  // Crea un nuevo objeto Quiz con las preguntas y la duración del cuestionario
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Mezcla las preguntas del cuestionario
  quiz.shuffleQuestions();

  /************  MOSTRAR CONTENIDO INICIAL  ************/

  // Convierte el tiempo restante de segundos a minutos y segundos, y rellena los números con ceros si es necesario
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0"); // Calcula los minutos
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0"); // Calcula los segundos

  // Muestra el tiempo restante en el contenedor de tiempo restante
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Muestra la primera pregunta
  showQuestion();

  /************  TEMPORIZADOR  ************/

  let timer; // Variable para almacenar el identificador del temporizador

  // Función para iniciar el temporizador
  function startTimer() {
    timer = setInterval(() => {
      quiz.timeRemaining--; // Disminuye el tiempo restante en 1 segundo
      const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0"); // Calcula los minutos restantes
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0"); // Calcula los segundos restantes
      timeRemainingContainer.innerText = `${minutes}:${seconds}`; // Actualiza la visualización del temporizador

      // Verifica si el tiempo se ha agotado
      if (quiz.timeRemaining <= 0) {
        clearInterval(timer); // Detiene el temporizador
        showResults(); // Muestra los resultados cuando el tiempo se acaba
      }
    }, 1000); // Actualiza cada segundo
  }

  /************  ESCUCHAR EVENTOS  ************/

  nextButton.addEventListener("click", nextButtonHandler); // Escucha el evento de clic en el botón "Siguiente"

  // Inicia el temporizador cuando comienza el cuestionario
  startTimer();

  /************  FUNCIONES  ************/

  // showQuestion() - Muestra la pregunta actual y sus opciones
  function showQuestion() {
    // Si el cuestionario ha terminado, muestra los resultados
    if (quiz.hasEnded()) {
        showResults(); // Llama a la función que muestra los resultados
        return; // Sale de la función si el cuestionario ha terminado
    }

    // Limpia el texto de la pregunta anterior y las opciones
    questionContainer.innerText = ""; // Limpia el contenedor de la pregunta
    choiceContainer.innerHTML = ""; // Limpia el contenedor de las opciones

    // Obtiene la pregunta actual del cuestionario
    const question = quiz.getQuestion(); // Llama al método `getQuestion()` de la clase Quiz
    // Mezcla las opciones de la pregunta actual
    question.shuffleChoices(); // Llama al método `shuffleChoices()` de la clase Question

    // 1. Muestra la pregunta
    questionContainer.innerText = question.text; // Actualiza el contenedor de la pregunta con el texto de la pregunta

    // 2. Actualiza la barra de progreso
    const percentage = ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100; // Calcula el porcentaje de preguntas respondidas
    progressBar.style.width = `${percentage}%`; // Actualiza el ancho de la barra de progreso

    // 3. Muestra el número de la pregunta actual
    questionCount.innerText = `Pregunta ${quiz.currentQuestionIndex + 1} de ${quiz.questions.length}`; // Actualiza el texto del contador de preguntas

    // 4. Muestra las opciones de respuesta
    question.choices.forEach((choice) => { // Itera sobre cada opción de respuesta
        const choiceElement = document.createElement("div"); // Crea un nuevo elemento div para cada opción
        choiceElement.innerHTML = `
          <label>
            <input type="radio" name="choice" value="${choice}"> ${choice}
          </label>
        `; // Asigna el valor de la opción al input y añade el texto de la opción
        choiceContainer.appendChild(choiceElement); // Añade la opción al contenedor de opciones
    });
  }

  // nextButtonHandler() - Maneja el evento de clic en el botón "Siguiente"
  function nextButtonHandler() {
    let selectedAnswer; // Variable para almacenar el valor de la respuesta seleccionada

    // 1. Obtiene todos los elementos de opción (inputs de tipo radio)
    const choiceElements = document.querySelectorAll('input[name="choice"]'); // Selecciona todos los inputs de tipo radio con el nombre "choice"

    // 2. Recorre todos los elementos de opción y verifica cuál está seleccionado
    choiceElements.forEach((choice) => { // Itera sobre cada opción
        if (choice.checked) { // Verifica si el input de radio está seleccionado
            selectedAnswer = choice.value; // Asigna el valor de la opción seleccionada
        }
    });

    // 3. Si se ha seleccionado una respuesta, verifica si es correcta y pasa a la siguiente pregunta
    if (selectedAnswer) { // Si se ha seleccionado una respuesta
        quiz.checkAnswer(selectedAnswer); // Verifica si la respuesta seleccionada es correcta
        quiz.moveToNextQuestion(); // Mueve al siguiente índice de pregunta
        showQuestion(); // Muestra la siguiente pregunta
    } else {
        alert("Please, select an option to continue"); // Alerta al usuario si no seleccionó ninguna opción
    }
  }

  // showResults() - Muestra los resultados finales del cuestionario
  function showResults() {
    clearInterval(timer); // Detiene el temporizador cuando se muestran los resultados

    // 1. Oculta la vista del cuestionario (div#quizView)
    quizView.style.display = "none"; // Oculta la vista del cuestionario

    // 2. Muestra la vista final (div#endView)
    endView.style.display = "flex"; // Muestra la vista final del cuestionario
    
    // 3. Actualiza el contenedor de resultados (div#result) para mostrar el número de respuestas correctas
    resultContainer.innerText = `You got  ${quiz.correctAnswers} of ${quiz.questions.length} correct answers`; // Muestra el resultado final
  }
});
