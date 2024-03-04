class Question {
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty;
  }

  shuffleChoices() {
    let i = 0;
    let temp = "";

    while (i < this.choices.length) {
      let random = Math.floor(Math.random() * this.choices.length);
      let randomNum = this.choices[random];
      temp = this.choices[i];
      this.choices[i] = randomNum;
      this.choices[random] = temp;
      i++;
    }
    return this.choices;
  }

  //     for (let i = 0; i < this.choices.length; i++) {
  //       let random = Math.floor(Math.random() * this.choices.length);
  //       let randomNum = this.choices[random];
  //       temp = this.choices[i];
  //       this.choices[i] = randomNum;
  //       this.choices[random] = temp;
  //     }
  //     return this.choices;
  //   }

  //     let i = 0;
  //     let newArr = [];

  // //     while (i < this.choices.length) {
  //       let random = Math.floor(Math.random() * this.choices.length);
  //       let randomNum = this.choices[random];
  //       if (newArr.includes(this.choices[random])) {
  //         continue;
  //       } else {
  //         newArr.push(randomNum);
  //       }
  //       i++;
  //     }
  //     this.choices = structuredClone(newArr);
  //     return this.choices;
  //   }

  test() {
    return this.choices;
  }
}

const a = new Question("hello", ["a", "b", "c", "d", "e", "f"], "a", 100);
const b = new Question("hellb", ["d", "e", "f"], "d", 53);
const c = new Question("hellc", ["g", "h", "i"], "h", 92);

console.log(a.shuffleChoices());
