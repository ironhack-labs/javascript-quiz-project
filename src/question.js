class Question {
  constructor(text, choices, answer, difficulty){
    this.text = text; 
    this.choices = choices;
    this.answer = answer; 
    this.difficulty = difficulty; 
}
 //we need to mix up the order of choices randomly, and pick choices from the array and Place them in a different order 
//Math.floor(Math.random()) ...floor rounds down the number to the nearest integer 
//Math.random() generates a random decimal number between 0 and 1


 shuffleChoices(){
    for (let i = 0; i < this.choices.length; i++){
        const shuffleMethod = Math.floor(Math.random() * this.choices.length); 
        [this.choices[i], this.choices[shuffleMethod]] =  [this.choices[shuffleMethod], this.choices[i]];
    }
}
}
    /*code explanation
    The loop starts with i = 0 and goes until the end of choices.
    In each iteration, it generates a random index shuffleMethod within the length of choices.
    Then it swaps the element at index i with the element at index shuffleMethod.
    For example, if this.choices.length is 4 and Math.random() returns 0.7 => 0.7 * 4 = 2.8. floor returns 2
    Without multiplication, Math.random() only returns values between 0 and 1, which wouldn’t allow us to access all indixe values of an array with more than one element.
    By scaling up to this.choices.length, the range is expanded to cover the entire array.
    this.choices[i] accesses the element at index i.
    this.choices[shuffleMethod] accesses the element at the randomly generated index
 */




    /*  Fisher-Yates algorithm... another method works well !!
    https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
    
    Start from the last element and swap 
    // one by one. We don't need to run for 
    // the first element that's why i > 0 
    for (let i = arr.length - 1; i > 0; i--)
        {
            // Pick a random index from 0 to i inclusive
            let j = Math.floor(Math.random() * (i + 1)); 
            // Swap arr[i] with the element 
            // at random index 
            [arr[i], arr[j]] = [arr[j], arr[i]];
        } 
    } 
        
      shuffleChoices() {
    for (let i = this.choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Pick a random index
      [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]]; // Swap elements
    }
  }
}*/

//:::::::::::::::::::::::::::::::::::::::::::::::::::::: test 1

function testShuffleChoices() {
    const question = new Question(
      "What is your snack?", 
      ["Chips", "Chocolate", "Fruit", "Cookies"], 
    );
  
    console.log("my choices:", question.choices);
  
    for (let i = 0; i < 3; i++) {
      question.shuffleChoices(); 
      console.log(`Shuffle ${i + 1}:`, question.choices); 
    }
  }
  
  testShuffleChoices();

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: test 2
  
  function testShuffleSample() {
    const question = new Question("What is your snack?", ["Chips", "Chocolate", "Fruit", "Cookies"]);

    question.shuffleChoices();
    const sample = question.choices.slice(0, 2); // Take a sample of the first two choices
  
    console.log("Sample from shuffled choices:", sample);
  }
  
  testShuffleSample();
  