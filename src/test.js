const q1 = {
    question: "What is the capital of France?",
    choices: ["Miami", "Paris", "Oslo", "Rome"],
    answer: "Paris",
    difficulty: 1,
    qLength() { 
        return this.choices.length;
    }
}
q1.qLength(); // 4
console.log(q1.qLength()); // 4