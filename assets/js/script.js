let startArea = document.getElementById("welcome");
let quizArea = document.getElementById("quiz-area");
let questionText = document.getElementById("question-text");
let answerButtons = document.getElementsByClassName("btn-answer");
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
    incorrect = 0;
    currentQuestion = 0;
    questionSet = questions;
    scoreEl.innerHTML = score;
    incorrectEl.innerHTML = incorrect;
    hideAllSections();
    quizArea.classList.add("active");
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestion + 1 > questionSet.length) {
        gameOver();
        return;
    }
    questionText.innerHTML = questionSet[currentQuestion].question;
    for (let i = 0; i + 1 <= answerButtons.length; i++) {
        answerButtons[i].classList.remove("correct");
        answerButtons[i].classList.remove("wrong");
        answerButtons[i].innerHTML = questionSet[currentQuestion].choices[i];
        answerButtons[i].onclick = function () {
            checkAnswer(this);
        };
        nextButton.onclick = function () {
            currentQuestion++;
            nextButton.style.display = "none";
            displayQuestion();
        };
    }
}

function checkAnswer(btn) {
    let correctAns = questionSet[currentQuestion].correct;
    if (correctAns === btn.innerHTML) {
        btn.classList.add("correct");
        incrementScore();
    } else {
        let correctIndex = questionSet[currentQuestion].choices.indexOf(correctAns);
        btn.classList.add("wrong");
        answerButtons[correctIndex].classList.add("correct");
        incrementWrongAnswer();
    }
    for (let i = 0; i + 1 <= answerButtons.length; i++) {
        answerButtons[i].onclick = null;
    }
    nextButton.style.display = "block";
}

function incrementScore() {
    score++;
    scoreEl.innerHTML = score;
}

function incrementWrongAnswer() {
    incorrect++;
    incorrectEl.innerHTML = incorrect;
}


function hideAllSections(){
    startArea.classList.remove("active");
    quizArea.classList.remove("active");
    quizResult.classList.remove("active");
}

function gameOver(){
    hideAllSections();
    quizResult.classList.add("active");
}

function restartQuiz(){
    hideAllSections();
    startArea.classList.add("active");
}