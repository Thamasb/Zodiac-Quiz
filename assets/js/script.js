let startArea = document.getElementById("welcome");
let quizArea = document.getElementById("quiz-area");
let questionText = document.getElementById("question-text");
let answerButtons = document.getElementByClassName("btn-answer");
let nextButton = document.getElementById("btn-next");
let quizResult = document.getElementById("quiz-result");
let scoreEl = document.getElementById("score");
let incorrectEl = document.getElementById("incorrect");

let score;
let incorrect;
let currentQuestion;
let questionSet;

startArea.classList.add("active");

function startQuiz(questions) {
    score = 0;
    incore = 0;
    questionSet = questions;
    score.ElinnerHTML = score;
    incorrectEl.innerHTML = incorrect;
    currentQuestion = 0;
    hideAllSections();
    displayQuestion();
    quizArea.classList.add("active");
}

function displayQuestion(){
    if (currentQuestion + 1 > questionSet.length){
        gameOver();
        return;
    }
    questionText.innerHTML = questionSet[currentQuestion].question;
    for (let i = 0; i + 1  <= answerButtons.length; i++){
        answerButtons[i].classList.remove("correct");
        ans
            innerHTML = questionSet[currentQuestion].choices[i];
    }
}

function checkAnswer(btn){
    
}

function incrementScore(){

}

function incrementWrongAnswer(){

}
