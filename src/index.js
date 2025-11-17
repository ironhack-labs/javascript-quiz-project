// Esperamos a que toda la página HTML se cargue antes de ejecutar el código
// DOMContentLoaded se dispara cuando el HTML está listo
document.addEventListener("DOMContentLoaded", () => {
  
  /************  ELEMENTOS HTML  ************/
  // Aquí seleccionamos todos los elementos HTML que vamos a usar
  
  // Vistas principales (divs grandes que muestran diferentes pantallas)
  const quizView = document.querySelector("#quizView"); // Pantalla del quiz
  const endView = document.querySelector("#endView"); // Pantalla de resultados

  // Elementos de la vista del quiz
  const progressBar = document.querySelector("#progressBar"); // Barra verde de progreso
  const questionCount = document.querySelector("#questionCount"); // Contador "Pregunta X de Y"
  const questionContainer = document.querySelector("#question"); // Contenedor del texto de la pregunta
  const choiceContainer = document.querySelector("#choices"); // Contenedor de las opciones de respuesta
  const nextButton = document.querySelector("#nextButton"); // Botón "Answer"

  // Elementos de la vista de resultados
  const resultContainer = document.querySelector("#result"); // Contenedor del texto de resultados
  const restartButton = document.querySelector("#restartButton"); // Botón "Restart Quiz"


  /************  CONFIGURAR VISIBILIDAD DE VISTAS  ************/

  // Al inicio, mostramos la vista del quiz y ocultamos la vista de resultados
  quizView.style.display = "block"; // block = visible
  endView.style.display = "none"; // none = oculto


  /************  DATOS DEL QUIZ  ************/
  
  // Array con todas las preguntas del quiz
  // Cada pregunta es un objeto de la clase Question
  // Parámetros: (texto, [opciones], respuesta_correcta, dificultad)
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Puedes agregar más preguntas aquí
  ];
  
  // Duración del quiz en segundos (120 segundos = 2 minutos)
  const quizDuration = 120;


  /************  CREAR INSTANCIA DEL QUIZ  ************/
  
  // Creamos un nuevo objeto Quiz con nuestras preguntas y tiempo
  // Parámetros: (preguntas, tiempo_limite, tiempo_restante)
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  
  // Mezclamos las preguntas para que aparezcan en orden aleatorio
  quiz.shuffleQuestions();


  /************  MOSTRAR CONTENIDO INICIAL  ************/

  // Convertimos el tiempo restante de segundos a formato "minutos:segundos"
  // Math.floor() redondea hacia abajo (ej: 7.9 → 7)
  // Dividimos entre 60 para obtener los minutos
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  
  // El operador % (módulo) nos da el resto de la división
  // Ej: 125 % 60 = 5 (nos da los segundos sobrantes)
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
  // .padStart(2, "0") añade un 0 al inicio si el número es menor que 10
  // Ej: "5" → "05"

  // Mostramos el tiempo en el contenedor HTML
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`; // Template literal: ${} inserta variables

  // Mostramos la primera pregunta
  showQuestion();


  /************  TEMPORIZADOR  ************/

  // Variable para guardar el intervalo del timer
  let timer;

  // Función que inicia el temporizador
  function startTimer() {
    // setInterval() ejecuta código cada X milisegundos
    // 1000 milisegundos = 1 segundo
    timer = setInterval(() => {
      // Restamos 1 segundo al tiempo restante
      quiz.timeRemaining--;

      // Convertimos el tiempo a formato "minutos:segundos"
      const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      
      // Actualizamos el texto en la pantalla
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      // Si el tiempo llegó a 0, paramos el timer y mostramos resultados
      if (quiz.timeRemaining === 0) {
        clearInterval(timer); // clearInterval() detiene el setInterval
        showResults(); // Mostramos la pantalla de resultados
      }
    }, 1000); // 1000 = ejecutar cada 1 segundo
  }

  // Iniciamos el temporizador al cargar la página
  startTimer();


  /************  EVENT LISTENERS (ESCUCHADORES DE EVENTOS)  ************/

  // addEventListener() espera a que ocurra un evento (como un click)
  // Cuando el usuario hace click en el botón "Answer", ejecuta nextButtonHandler
  nextButton.addEventListener("click", nextButtonHandler);
  
  // Cuando el usuario hace click en el botón "Restart Quiz", ejecuta restartQuiz
  restartButton.addEventListener("click", restartQuiz);



  /************  FUNCIONES  ************/

  // showQuestion() - Muestra la pregunta actual y sus opciones
  // nextButtonHandler() - Maneja el click en el botón "Answer"
  // showResults() - Muestra la pantalla de resultados finales



  // FUNCIÓN: Mostrar la pregunta actual
  function showQuestion() {
    // Primero verificamos si el quiz ya terminó
    if (quiz.hasEnded()) {
      showResults(); // Si terminó, mostramos resultados
      return; // return sale de la función (no ejecuta el resto del código)
    }

    // Limpiamos el texto de la pregunta anterior
    questionContainer.innerText = "";
    
    // Limpiamos las opciones de respuesta anteriores
    // innerHTML borra todo el contenido HTML interno
    choiceContainer.innerHTML = "";

    // Obtenemos la pregunta actual del quiz
    const question = quiz.getQuestion();
    
    // Mezclamos las opciones de respuesta para que aparezcan en orden aleatorio
    question.shuffleChoices();
    
    
    // 1. MOSTRAR EL TEXTO DE LA PREGUNTA
    // Ponemos el texto de la pregunta en el contenedor HTML
    questionContainer.innerText = question.text;

    
    // 2. ACTUALIZAR LA BARRA DE PROGRESO VERDE
    // Calculamos el porcentaje de preguntas contestadas
    // Ejemplo: si estamos en pregunta 2 de 4 → 2/4 = 0.5 → 0.5 * 100 = 50%
    const percentage = (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    
    // Cambiamos el ancho de la barra verde con CSS
    progressBar.style.width = `${percentage}%`;
    

    // 3. ACTUALIZAR EL CONTADOR DE PREGUNTAS
    // Mostramos "Pregunta X de Y"
    // Sumamos +1 al índice porque los arrays empiezan en 0
    // Ejemplo: índice 0 → pregunta 1
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;

    
    // 4. CREAR LOS BOTONES DE RADIO PARA CADA OPCIÓN DE RESPUESTA
    // forEach() ejecuta código para cada elemento del array
    question.choices.forEach((choice) => {
      // Creamos un input de tipo radio (círculo seleccionable)
      const input = document.createElement("input");
      input.type = "radio"; // tipo radio = solo se puede seleccionar uno
      input.name = "choice"; // name igual para que solo uno pueda estar seleccionado
      input.value = choice; // value guarda el texto de la opción

      // Creamos una etiqueta (label) con el texto de la opción
      const label = document.createElement("label");
      label.innerText = choice;

      // Creamos un salto de línea <br> para separar las opciones
      const br = document.createElement("br");

      // Añadimos los elementos al contenedor de opciones
      // appendChild() agrega un elemento HTML dentro de otro
      choiceContainer.appendChild(input); // Añadimos el radio button
      choiceContainer.appendChild(label); // Añadimos la etiqueta
      choiceContainer.appendChild(br); // Añadimos el salto de línea
    });
  }


  
  // FUNCIÓN: Maneja el click en el botón "Answer"
  function nextButtonHandler () {
    // Variable para guardar la respuesta que el usuario seleccionó
    let selectedAnswer;


    // 1. OBTENER TODAS LAS OPCIONES DE RESPUESTA
    // querySelectorAll() busca TODOS los elementos que coincidan con el selector
    // 'input[name="choice"]' = todos los inputs con name="choice"
    const choices = document.querySelectorAll('input[name="choice"]');

    
    // 2. BUSCAR CUÁL OPCIÓN ESTÁ SELECCIONADA
    // Recorremos todas las opciones con forEach
    choices.forEach((choice) => {
      // .checked es una propiedad que es true si el radio button está seleccionado
      if (choice.checked) {
        // Si está seleccionado, guardamos su valor en selectedAnswer
        selectedAnswer = choice.value;
      }
    });
      
    
    // 3. SI HAY UNA RESPUESTA SELECCIONADA, VERIFICARLA Y AVANZAR
    // Solo ejecutamos este código si selectedAnswer tiene un valor
    if (selectedAnswer) {
      // Verificamos si la respuesta es correcta
      // Si es correcta, checkAnswer() suma 1 a correctAnswers
      quiz.checkAnswer(selectedAnswer);
      
      // Avanzamos a la siguiente pregunta (suma 1 al índice)
      quiz.moveToNextQuestion();
      
      // Mostramos la siguiente pregunta en la pantalla
      showQuestion();
    }
  }  




  // FUNCIÓN: Mostrar los resultados finales del quiz
  function showResults() {
    // Paramos el temporizador cuando el quiz termina
    // clearInterval() detiene el setInterval que creamos en startTimer()
    clearInterval(timer);

    
    // 1. OCULTAR LA VISTA DEL QUIZ
    // Cambiamos el display a "none" = invisible
    quizView.style.display = "none";

    
    // 2. MOSTRAR LA VISTA DE RESULTADOS
    // Cambiamos el display a "flex" = visible
    endView.style.display = "flex";
    
    
    // 3. MOSTRAR EL PUNTAJE FINAL
    // Usamos template literals ${} para insertar las variables en el texto
    // Ejemplo: "You scored 3 out of 4 correct answers!"
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }

  // FUNCIÓN: Reiniciar el quiz desde el principio
  function restartQuiz() {
    // Paramos el temporizador anterior
    clearInterval(timer);
    
    
    // REINICIAR LAS PROPIEDADES DEL QUIZ
    // Volvemos al índice 0 (primera pregunta)
    quiz.currentQuestionIndex = 0;
    
    // Reiniciamos el contador de respuestas correctas a 0
    quiz.correctAnswers = 0;
    
    // Reiniciamos el tiempo al valor inicial
    quiz.timeRemaining = quizDuration;
    
    
    // Mezclamos las preguntas de nuevo para un orden diferente
    quiz.shuffleQuestions();
    
    
    // CAMBIAR LAS VISTAS
    // Ocultamos la pantalla de resultados
    endView.style.display = "none";
    
    // Mostramos la pantalla del quiz
    quizView.style.display = "block";
    
    
    // REINICIAR EL DISPLAY DEL TIEMPO
    // Convertimos el tiempo a formato "minutos:segundos"
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    
    // Actualizamos el texto del tiempo en la pantalla
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    
    
    // Iniciamos el temporizador de nuevo
    startTimer();
    
    
    // Mostramos la primera pregunta
    showQuestion();
  }
  
}); 