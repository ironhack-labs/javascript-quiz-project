// ==============================
// CONFIGURACIÓN Y VARIABLES
// ==============================

// Tiempo inicial del quiz (ejemplo 60 segundos)
const INITIAL_TIME = 60;

// Variables globales
let quiz = null;
let timer = null;

// ==============================
// DOM ELEMENTS — EXACTOS A TU HTML
// ==============================
const quizView = document.getElementById("quizView");
const endView = document.getElementById("endView");

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextButton = document.getElementById("nextButton");
const questionCountEl = document.getElementById("questionCount");

const timeRemainingBox = document.getElementById("timeRemaining").querySelector("span");

const resultBox = document.getElementById("result");


// ==============================
// PREGUNTAS DE EJEMPLO
// ==============================
const questions = [
  new Question("¿Capital de Francia?", ["Roma", "Madrid", "París"], "París", 1),
  new Question("2 + 2 =", ["3", "4", "5"], "4", 1),
  new Question("¿Quién pintó La Última Cena?", ["Picasso", "Van Gogh", "Da Vinci"], "Da Vinci", 2),
  new Question("¿Año llegada a la Luna?", ["1955", "1969", "1975"], "1969", 3)
];


// ==============================
// TEMPORIZADOR (Día 4)
// ==============================
function startTimer() {
  timeRemainingBox.textContent = formatTime(quiz.timeRemaining);

  timer = setInterval(() => {
    quiz.timeRemaining--;
    timeRemainingBox.textContent = formatTime(quiz.timeRemaining);

    if (quiz.timeRemaining <= 0) {
      clearInterval(timer);
      showResults();
    }
  }, 1000);
}

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function resetTimer() {
  clearInterval(timer);
  quiz.timeRemaining = INITIAL_TIME;
  timeRemainingBox.textContent = formatTime(INITIAL_TIME);
  startTimer();
}


// ==============================
// MOSTRAR PREGUNTA
// ==============================
function showQuestion() {
  if (quiz.hasEnded()) {
    showResults();
    return;
  }

  const current = quiz.getQuestion();

  questionEl.textContent = current.text;

  questionCountEl.textContent =
    `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;

  choicesEl.innerHTML = "";

 current.choices.forEach(choice => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.classList.add("choice");

    li.addEventListener("click", () => {
      document.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
      li.classList.add("selected");
      nextButton.disabled = false;
    });

    choicesEl.appendChild(li);
});

nextButton.disabled = true;
}

// ==============================
// BOTÓN "NEXT"
// ==============================
function nextButtonHandler() {
  const selected = document.querySelector(".choice.selected");

  if (selected) {
    quiz.checkAnswer(selected.textContent);
  }

  quiz.moveToNextQuestion();
  showQuestion();
}


// ==============================
// MOSTRAR RESULTADOS
// ==============================
function showResults() {
  clearInterval(timer);

  quizView.style.display = "none";
  endView.style.display = "block";

  resultBox.innerHTML = `
      <p>Correct Answers: ${quiz.correctAnswers}</p>
      <p>Average Difficulty: ${quiz.averageDifficulty().toFixed(2)}</p>
      <button id="restartButton" class="button-secondary">Restart Quiz</button>
    `;

  // Botón de reinicio
  document.getElementById("restartButton").addEventListener("click", restartQuiz);
}


// ==============================
// REINICIAR QUIZ
// ==============================
function restartQuiz() {
  quiz = new Quiz([...questions], INITIAL_TIME, INITIAL_TIME);

  quizView.style.display = "block";
  endView.style.display = "none";

  resetTimer();
  showQuestion();
}


// ==============================
// INICIALIZACIÓN
// ==============================
function startQuiz() {
  quiz = new Quiz([...questions], INITIAL_TIME, INITIAL_TIME);

  quiz.shuffleQuestions();
  showQuestion();
  startTimer();
}

nextButton.addEventListener("click", nextButtonHandler);

// Iniciar al cargar
startQuiz();
