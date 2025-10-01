class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)
    constructor(text, choices, answer, difficulty){
        this.text=text;
        this.choices=choices;
        this.answer=answer;
        this.difficulty=difficulty;
    }
    // 2. shuffleChoices()
    shuffleChoices(){
        const oldArray = [...this.choices];
        const newArray=[];
        while (oldArray.length>0){
            const randomArrayIndex = Math.floor(Math.random()*(oldArray.length));
            if(oldArray[randomArrayIndex]!==undefined){
                newArray.push(oldArray[randomArrayIndex]);
                oldArray.splice(randomArrayIndex, 1);
            }
        }
        this.choices = newArray;
        return this.choices;
    
    // shuffleChoices(){
    //     let i = 10;
    //     while (i>0){
    //         const randomArrayIndex = Math.floor(Math.random()*(this.choices.length));
    //         const pichOneAnswer = this.choices[randomArrayIndex];
    //         this.choices.splice(randomArrayIndex, 1);
    //         this.choices.push(pichOneAnswer);
    //         i --;
    //     }
    // }
    
    }
}



// ------------------First Try-------------------------------


// ------------------Testing-------------------------------
// const testArray=["a","b","c","d"];
// const newArray=[];
// // const randomArrayIndex = Math.floor(Math.random()*(testArray.length));
// // console.log(Math.floor(Math.random()*(testArray.length)));
// // console.log(testArray[randomArrayIndex]);


// ------------------First Try-------------------------------
// while (testArray.length>0){
//     const randomArrayIndex = Math.floor(Math.random()*(testArray.length));
//     if(testArray[randomArrayIndex]!==undefined){
//         newArray.push(testArray[randomArrayIndex]);
//         testArray.splice(randomArrayIndex, 1);
//     }
// }

// console.log(testArray);
// console.log(newArray);


// ------------------Second Try-------------------------------
// const testArray2=["a","b","c","d"];
// let i = 10;
// while (i>0){
//     const randomArrayIndex = Math.floor(Math.random()*(testArray2.length));
//     const string = testArray2[randomArrayIndex];
//     testArray2.splice(randomArrayIndex, 1);
//     testArray2.push(string);
//     i --;
// }

// console.log(testArray2);
