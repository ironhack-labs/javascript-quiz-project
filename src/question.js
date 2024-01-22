class Question {
    constructor(text, choices, answer, difficulty){

        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;


    }

    shuffleChoices(){
        function shuffle (array){
            let currentIndex = array.length;

            while (currentIndex > 0) {

                const randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                [array[currentIndex], array[randomIndex]] =  [array[randomIndex], array[currentIndex]];
            }
        }

        return array;    
    }

   
}