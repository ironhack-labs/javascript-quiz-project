/*In the src/Question.js file, implement a class Question with the properties and methods listed in the sections below.



Unit Tests

The unit tests for the Question class are located in the tests/question.spec.js file.

To run the tests and check your progress, open the SpecRunner.html file in the browser using the Live Server extension.



class Question

should receive 4 arguments in the constructor (text, choices, answer, difficulty).
should have 4 properties: text, choices, answer, difficulty.
should receive text (string) as its 1st argument and assign it to text property.
should receive choices (array of strings) as its 2nd argument and assign it to choices property.
should receive answer (string) as its 3rd argument and assign it to answer property.
should receive difficulty (number) as its 3rd argument and assign it to difficulty property.

Note: The difficulty will be a number between 1 and 3, with 1 being the easiest and 3 being the hardest.



shuffleChoices() method

Shuffles the elements stored in the choices array of the Question.

should be defined.

should be a function.

should receive no arguments.

should shuffle the elements stored in the choices array property.*/
class Question {
    
    // 1. constructor (text, choices, answer, difficulty)
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    // 2. shuffleChoices()
    shuffleChoices() {
        this.choices.sort(() => Math.random() - 0.5);
    }
}