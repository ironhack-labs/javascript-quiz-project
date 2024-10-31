function shuffleChoices(choices) {
  // Fisher-Yates Shuffle
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
    console.log("i", i);
    console.log("j", j);
    console.log([choices[i], choices[j]]);
  }

  return choices;
}

let choices = [1, 2, 3, 4];
console.log(shuffleChoices(choices));
