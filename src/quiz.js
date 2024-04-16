class Quiz {
    // YOUR CODE HERE:
    constructor(questions, timeLimit,timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;

        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }
    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }

    moveToNextQuestion() {
        this.currentQuestionIndex ++;
    }

    shuffleQuestions() {
        this.questions.sort(() => Math.random() - 0.5)
    }

    checkAnswer(answer) {
        this.correctAnswers ++;
    }

    hasEnded() {
        if(this.currentQuestionIndex < this.questions.length) {
            return false
        }
        if(this.currentQuestionIndex === this.questions.length) {
            return true
        }



    }
    filterQuestionsByDifficulty(difficulty){
        if(difficulty>=1 || difficulty<=3) {
            this.questions = this.questions.filter(question => question.difficulty === difficulty);
        }
        
       
    }

    averageDifficulty() {
        const sum = this.questions.reduce((total,
        question) => {
            const newTotal = total + question.difficulty
            return newTotal
        },0)
        return sum / this.questions.length;
    }

    // 1. constructor (questions, timeLimit, timeRemaining)

    // 2. getQuestion()
    
    // 3. moveToNextQuestion()

    // 4. shuffleQuestions()

    // 5. checkAnswer(answer)

    // 6. hasEnded()
}