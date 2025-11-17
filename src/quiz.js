// Clase Quiz - representa el cuestionario completo
class Quiz {
    // Constructor: se ejecuta cuando creamos un nuevo quiz
    // Recibe 3 parámetros: array de preguntas, tiempo límite, tiempo restante
    constructor(questions, timeLimit, timeRemaining) {
        // this.questions = array que contiene todas las preguntas del quiz
        this.questions = questions;
        
        // this.timeLimit = tiempo total del quiz en segundos
        this.timeLimit = timeLimit;
        
        // this.timeRemaining = tiempo que queda en segundos
        this.timeRemaining = timeRemaining;

        // this.correctAnswers = contador de respuestas correctas, empieza en 0
        this.correctAnswers = 0;
        
        // this.currentQuestionIndex = posición de la pregunta actual, empieza en 0 (primera pregunta)
        this.currentQuestionIndex = 0;
    }
    
    // Método que devuelve la pregunta actual
    getQuestion() {
        // Usamos el índice actual para buscar la pregunta en el array
        // Ejemplo: si currentQuestionIndex es 0, devuelve la primera pregunta
        return this.questions[this.currentQuestionIndex];
    }
    
    // Método que avanza a la siguiente pregunta
    moveToNextQuestion() {
        // ++ aumenta el índice en 1
        // Si estábamos en la pregunta 0, ahora pasamos a la 1
        this.currentQuestionIndex++;
    }
   
    // Método que mezcla las preguntas aleatoriamente
    shuffleQuestions() {
        // sort() ordena el array
        // Math.random() - 0.5 crea un orden aleatorio
        this.questions.sort(() => Math.random() - 0.5);
    }
     
    // Método que verifica si la respuesta es correcta
    checkAnswer(answer) {
        // Obtenemos la pregunta actual con getQuestion()
        // Comparamos la respuesta del usuario con la respuesta correcta
        if (this.getQuestion().answer === answer) {
            // Si es correcta, sumamos 1 al contador de respuestas correctas
            this.correctAnswers++;
            return true;
        } else {
            // Si es incorrecta, solo devolvemos false
            return false;
        }
    }
      
    // Método que verifica si el quiz ha terminado
    hasEnded() {
        // Comparamos el índice actual con la cantidad total de preguntas
        if (this.currentQuestionIndex < this.questions.length) {
            // Si aún quedan preguntas, devolvemos false (no ha terminado)
            return false;
        } else if (this.currentQuestionIndex >= this.questions.length) {
            // Si ya no hay más preguntas, devolvemos true (ha terminado)
            return true;
        }
    }

    // Método que filtra las preguntas por nivel de dificultad
    filterQuestionsByDifficulty(difficulty) {
        // Verificamos que difficulty sea un número entre 1 y 3
        // typeof comprueba el tipo de dato
        if (typeof difficulty !== 'number' || difficulty < 1 || difficulty > 3) {
            // Si no es válido, salimos de la función sin hacer nada
            return;
        }

        // filter() crea un nuevo array solo con las preguntas que cumplan la condición
        this.questions = this.questions.filter((question) => {
            // Devolvemos true si la dificultad coincide, false si no
            // Solo las preguntas que devuelvan true se quedan en el array
            return question.difficulty === difficulty;
        });
    }

    // Método que calcula el promedio de dificultad de todas las preguntas
    averageDifficulty() {
        // reduce() suma todos los valores de dificultad
        // sum es el acumulador (la suma total hasta ahora)
        // question es cada pregunta del array
        const average = this.questions.reduce((sum, question) => {
            // Sumamos la dificultad de cada pregunta al total
            return sum + question.difficulty;
        }, 0) / this.questions.length; // Empezamos en 0 y dividimos por el total de preguntas
        
        // Devolvemos el promedio
        return average;
    }
}

