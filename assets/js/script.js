let startArea = document.getElementById("welcome");
let quizArea = document.getElementById("quiz-area");
let questionText = document.getElementById("question-text");
let answerButtons = document.getElementsByClassName("btn-answer");
let nextButton = document.getElementById("btn-next");
let quizResult = document.getElementById("quiz-result");
let scoreEl = document.getElementById("score");
let incorrectEl = document.getElementById("incorrect");
let quizProgressEl = document.getElementById("quiz-progress");
let sectionQuizEl = document.getElementById("section-quiz");
let resultCommentEl = document.getElementById("result-comment");
let usernameInputEl = document.getElementById("username");
let usernameOutputEl = document.getElementById("username-output");

const noUsername = document.getElementById('no-username');

let score;
let incorrect;
let currentQuestion;
let questionSet;

startArea.classList.add("active");
//Start quiz game with questions and name provided, set the selected questons, reset the points
function startQuiz(questions, name) {
    if (usernameInputEl.value.length === 0) {
        noUsername.style.display = 'block';
        return;
    }
    score = 0;
    incorrect = 0;
    currentQuestion = 0;
    questionSet = questions;
    shuffleArray(questionSet);
    scoreEl.innerHTML = score;
    incorrectEl.innerHTML = incorrect;
    hideAllSections();
    quizArea.classList.add("active");
    sectionQuizEl.classList.add(name.toLowerCase());
    displayQuestion();
}
//Show the current quiz questions
function displayQuestion() {
    if (currentQuestion + 1 > questionSet.length) {
        gameOver();
        return;
    }
    questionText.innerHTML = questionSet[currentQuestion].question;
    let questionNumber = currentQuestion +1;
    quizProgressEl.innerHTML = questionNumber + "of" + questionSet.length;
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
//Check answer button when clicked, shows the correct and incorrect answers
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
//Show the score of correct answers
function incrementScore() {
    score++;
    scoreEl.innerHTML = score;
}
//Show the score of incorrect answers
function incrementWrongAnswer() {
    incorrect++;
    incorrectEl.innerHTML = incorrect;
}


function hideAllSections(){
    startArea.classList.remove("active");
    quizArea.classList.remove("active");
    quizResult.classList.remove("active");
}
//Hide all screen and show the result screen (player neme, comment, score)
function gameOver(){
    hideAllSections();
    quizResult.classList.add("active");
    let comment = "";

    if (score >= 12) {
        comment = "Congratulation you are excellent in astrology.";
    } else if (score > 6){
        comment = "You are good in astrology.";
    } else if ( score >0){
        comment = "You are doing well, try it again.";
    } else {
        comment = "Don’t cry, try it again.";
    }
    resultCommentEl.innerHTML = comment;

    if (usernameInputEl.value) {
        usernameOutputEl.innerHTML = usernameInputEl.value;
    } else {
        usernameOutputEl.innerHTML = "";
    }
}


function restartQuiz(){
    hideAllSections();
    sectionQuizEl.classList.remove("zodiac");
    sectionQuizEl.classList.remove("stars");
    startArea.classList.add("active");
}

//randomly shuffle an array
function shuffleArray(array){
    for (let i = array.length -1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}