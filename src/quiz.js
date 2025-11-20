class Quiz {

    /* ============================================================
       Día 1 – 17/11/2025
       CONSTRUCTOR  
       - Recibe: array de preguntas, tiempo total y tiempo restante  
       - Inicializa contadores y el índice de preguntas  
       ============================================================ */
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;            // Lista de preguntas
        this.timeLimit = timeLimit;            // Tiempo total del quiz
        this.timeRemaining = timeRemaining;    // Tiempo restante
        this.correctAnswers = 0;               // Contador de aciertos
        this.currentQuestionIndex = 0;         // Índice de la pregunta actual
    }


    /* ============================================================
       Día 1  
       getQuestion()  
       - Devuelve la pregunta actual según el índice  
       ============================================================ */
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }


    /* ============================================================
       Día 1  
       moveToNextQuestion()  
       - Avanza el índice en +1 para pasar a la siguiente pregunta  
       ============================================================ */
    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }


    /* ============================================================
       Día 1  
       shuffleQuestions()  
       - Baraja las preguntas usando Fisher–Yates Shuffle  
       ============================================================ */
    shuffleQuestions() {
        let array = this.questions;
        let randomIndex;

        for (let i = array.length - 1; i > 0; i--) {
            randomIndex = Math.floor(Math.random() * (i + 1));

            // Intercambia posiciones
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
    }


    /* ============================================================
       Día 1  
       checkAnswer(answer)  
       - Comprueba si la respuesta del usuario coincide
         con la respuesta correcta de la pregunta actual  
       - Si es correcta, suma +1 al contador  
       ============================================================ */
    checkAnswer(answer) {
        const currentQuestion = this.getQuestion();

        if (currentQuestion.answer === answer) {
            this.correctAnswers++;
        }
    }


    /* ============================================================
       Día 1  
       hasEnded()  
       - Retorna true si ya se han respondido todas las preguntas  
       ============================================================ */
    hasEnded() {
        return this.currentQuestionIndex === this.questions.length;
    }


    /* ============================================================
       Día 2 – 18/11/2025  
       filterQuestionsByDifficulty(difficulty)
       - Filtra preguntas por nivel 1, 2 o 3  
       - Reemplaza el array questions con solo las preguntas filtradas  
       - Reinicia el índice a 0  
       ============================================================ */
    filterQuestionsByDifficulty(difficulty) {

        // Validación
        if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 3) {
            return; // No modifica nada si el valor no es válido
        }

        // Filtra preguntas que coinciden con el nivel elegido
        this.questions = this.questions.filter(question => {
            return question.difficulty === difficulty;
        });

        // Reiniciar el índice después de filtrar
        this.currentQuestionIndex = 0;
    }


    /* ============================================================
       Día 2 – 18/11/2025  
       averageDifficulty()  
       - Calcula el promedio de dificultad de las preguntas  
       - Usa reduce para sumar todas y divide por la longitud  
       ============================================================ */
    averageDifficulty() {

        // Evitar división entre cero
        if (this.questions.length === 0) return 0;

        const totalDifficulty = this.questions.reduce((accumulator, question) => {
            return accumulator + question.difficulty;
        }, 0);

        // Promedio
        return totalDifficulty / this.questions.length;
    }

}// ← Fin de la clase Quiz

