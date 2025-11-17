// Clase Question - representa una pregunta del quiz
class Question {
    // Constructor: se ejecuta automáticamente cuando creamos una nueva pregunta
    // Recibe 4 parámetros: texto, opciones, respuesta correcta y dificultad
    constructor(text, choices, answer, difficulty) {
        // this.text = guarda el texto de la pregunta
        this.text = text;
        
        // this.choices = guarda las opciones de respuesta en un array
        this.choices = choices;
        
        // this.answer = guarda la respuesta correcta
        this.answer = answer;
        
        // this.difficulty = guarda la dificultad (1=fácil, 2=medio, 3=difícil)
        this.difficulty = difficulty;
    }

    // Método para mezclar las opciones de respuesta aleatoriamente
    shuffleChoices() { 
        // sort() ordena el array
        // Math.random() - 0.5 genera números aleatorios positivos y negativos
        // Esto hace que el orden sea aleatorio
        this.choices.sort(() => Math.random() - 0.5); 
    }
}  