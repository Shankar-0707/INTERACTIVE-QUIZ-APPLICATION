const questions = [
  {
    Question: " Which is the best way to style CSS ",
    Answers: [
      { text: "Inline", correct: false },
      { text: "Internal", correct: false },
      { text: "External", correct: true },
      { text: "All", correct: false }
    ],
  },

    {
        Question: " Which gives functions to the websites ",
        Answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
      { text: "JAVASCRIPT", correct: true },
      { text: "REACT", correct: false }]
    },

    {
        Question: " What is react ",
        Answers: [
      { text: "Framework", correct: false },
      { text: "Library", correct: false },
      { text: "None", correct: false },
      { text: "Both", correct: true }]
    },

    {
        Question: " Which is the best code editor for students",
        Answers: [
      { text: "VS Code", correct: true },
      { text: "CodeBlocks", correct: false },
      { text: "Replit", correct: false },
      { text: "Online compiler", correct: false }]
    }


];


const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-buttons");
const nextElement = document.getElementById("next-btn");

let currentQuesIdx = 0;
let score = 0;

function startQuiz() {
    currentQuesIdx = 0;
    score=0;
    nextElement.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

        resetState() ;

        let currentQuestion = questions[currentQuesIdx];
        let questionNo = currentQuesIdx + 1;
        questionElement.innerHTML = questionNo + "." + currentQuestion.Question;

        currentQuestion.Answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerElement.appendChild(button);
            if(answer.correct){
                button.dataset.correct = answer.correct ;
            }
            button.addEventListener("click", selectAnswer);
        });


}

function resetState() {
    nextElement.style.display = "none";
    while(answerElement.firstChild){
        answerElement.removeChild(answerElement.firstChild);
    }
}

function selectAnswer(e) {
        const selectBtn = e.target;
        const isCorrect = selectBtn.dataset.correct === "true";
        if(isCorrect){
            selectBtn.classList.add("correct");
            score++;
        } else {
            selectBtn.classList.add("incorrect");
        }
        Array.from(answerElement.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextElement.style.display = "block";
}


function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextElement.innerHTML = "Play again";
    nextElement.style.display = "block";
}


function handleNextButton() {
    currentQuesIdx++;
    if(currentQuesIdx < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextElement.addEventListener("click", () => {
    if(currentQuesIdx < questions.length){
        handleNextButton();
    } else {
        startQuiz();
        }
})

startQuiz();
