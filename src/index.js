document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/
  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/
  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/
  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/
  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();


  /************  TIMER  ************/
  let timer;


  /************  EVENT LISTENERS  ************/
  nextButton.addEventListener("click", nextButtonHandler);


  /************  FUNCTIONS  ************/
  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text;

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    progressBar.style.width = `${((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100}%`;

    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;

    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    quiz.questions[quiz.currentQuestionIndex].choices.forEach((choice) => {
      // Create label element
      const label = document.createElement("label");
      label.innerText = choice;
      
      // Create radio input element
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "choice";
      radioInput.value = choice;
      
      // Append radio input and label to choice container
      choiceContainer.appendChild(radioInput);
      choiceContainer.appendChild(label);
      
      // Add line break
      choiceContainer.appendChild(document.createElement("br"));
    });
  }

  function nextButtonHandler () {
    let selectedAnswer;
    let correctAnswer; // A variable to store the selected answer value

    // Get all the choice elements
    const collectAnswer = document.querySelectorAll(`input[name="choice"]`);

    for (let i = 0; i < collectAnswer.length; i++) {
      if (collectAnswer[i].checked) {
        selectedAnswer = collectAnswer[i].value;
        break;
      }
    }

    if (selectedAnswer !== undefined) {
      correctAnswer = quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    }
  }

  function showResults() {
    // Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // Show the end view (div#endView)
    endView.style.display = "flex"
    
    const correctAnswers = quiz.correctAnswers;
    
    // Exibir a pontuação final
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }  
  
    quiz.timeRemaining = 120;
    let timeRem = document.getElementById("timeRemaining");
  
    const countDown = setInterval(() => {
      timeRem.innerHTML = `${quiz.timeRemaining}`;
      if (quiz.timeRemaining === 0) {
        clearInterval(countDown);
        showResults();
      }
      quiz.timeRemaining--;
      let minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      let seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

      // Display the time remaining in the time remaining container
      const timeRemainingContainer = document.getElementById("timeRemaining");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    }, 1000);

    let restarButton = document.getElementById('restartButton');
    restarButton.addEventListener('click', () => {
      window.location.reload();
    });
  });
