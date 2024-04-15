
    // YOUR CODE HERE:
    //
class Question {

    constructor(text,choices,answer,difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.difficulty = difficulty
}
shuffleChoices() {
    /* for (let i = 0;i<this.choices.length;i++) {
        const temp = this.choices[i]
        
        let random = Math.floor(Math.random() * (i + 1))
        this.choices[i] = this.choices[random]
        this.choices[random] = temp                  
    } */
    this.choices.sort(() => Math.random() - 0.5);                         
    console.log(this.choices) 
}

}

const question1 = new Question("aaa",[0,1,2,3],"ccc","ddd")
console.log(question1.shuffleChoices());

    // 1. constructor (text, choices, answer, difficulty)

    // 2. shuffleChoices()
