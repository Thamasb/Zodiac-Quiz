var startArea = document.getElementById("welcome");
var quizArea = document.getElementById("quiz-area");
var questionText = document.getElementById("question-text");
var answerButtons = document.getElementsByClassName("btn-answer");
var nextButton = document.getElementById("btn-next");
var quizResult = document.getElementById("quiz-result");
var scoreEl = document.getElementById("score");
var incorrectEl = document.getElementById("incorrect");
var quizProgressEl = document.getElementById("quiz-progress");
var sectionQuizEl = document.getElementById("section-quiz");
var resultCommentEl = document.getElementById("result-comment");
var usernameInputEl = document.getElementById("username");
var usernameOutputEl = document.getElementById("username-output");
var quizFeedbackEl = document.getElementById("quiz-feedback");

const noUsername = document.getElementById('no-username');

var score;
var incorrect;
var currentQuestion;
var questionSet;
/**
 * Start quiz game, username mondatory
 */
startArea.classList.add("active");

function startQuiz(questions, name) {
    if (!questions && !name) return;
    if (usernameInputEl.value.length === 0) {
        noUsername.style.display = 'block';
        return;
    }
    /**
     * Reset points, set quiestion, shuffle questions
     */
    score = 0;
    incorrect = 0;
    currentQuestion = 0;
    questionSet = questions;
    shuffleArray(questionSet);
    scoreEl.innerHTML = score;
    incorrectEl.innerHTML = incorrect;
    /**
     * Hide all quiz screens, show the quiz area screen, add the selected quiz name to target a  specific quiz, show question
     */
    hideAllSections();
    quizArea.classList.add("active");
    sectionQuizEl.classList.add(name.toLowerCase());
    displayQuestion();
}
/**
 * Show the current quiz questions
 * 
 */
function displayQuestion() {
    if (currentQuestion + 1 > questionSet.length) {
        gameOver();
        return;
    }
    questionText.innerHTML = questionSet[currentQuestion].question;
    var questionNumber = currentQuestion + 1;
    /**
     * Show quiz progress, update answer buttons with the right text, remove previous button status, show answer button text
     */
    quizProgressEl.innerHTML = questionNumber + " of " + questionSet.length;
    Array.from(answerButtons).forEach(function (btn, i) {
        btn.classList.remove("correct");
        btn.classList.remove("wrong");
        btn.innerHTML = questionSet[currentQuestion].choices[i];
        /**
         * Add next button event, increase quiestion index, hide next button, show question
         */
        btn.onclick = function () {
            checkAnswer(this);
        };
        nextButton.onclick = function () {
            currentQuestion++;
            nextButton.style.display = "none";
            displayQuestion();
        };
    });
}
/**
 * Check answer button when clicked, shows the correct and incorrect answers, increase score
 */
function checkAnswer(btn) {
    var correctAns = questionSet[currentQuestion].correct;
    if (correctAns === btn.innerHTML) {
        btn.classList.add("correct");
        incrementScore();
    } else {
        var correctIndex = questionSet[currentQuestion].choices.indexOf(correctAns);
        btn.classList.add("wrong");
        answerButtons[correctIndex].classList.add("correct");
        incrementWrongAnswer();
    }
    for (var i = 0; i + 1 <= answerButtons.length; i++) {
        answerButtons[i].onclick = null;
    }
    nextButton.style.display = "block";
}
/**
 * Update and show the score of correct and incorrect answers
 */
function incrementScore() {
    score++;
    scoreEl.innerHTML = score;
}

function incrementWrongAnswer() {
    incorrect++;
    incorrectEl.innerHTML = incorrect;
}
/**
 * Hide all quiz screen elements
 */
function hideAllSections() {
    startArea.classList.remove("active");
    quizArea.classList.remove("active");
    quizResult.classList.remove("active");
    quizFeedbackEl.classList.remove("active");
}
/**
 * Hide all screen and show the result screen (player neme, comment, score).
 */
function gameOver() {
    hideAllSections();
    quizResult.classList.add("active");
    var comment = "";

    if (score >= 12) {
        comment = "Congratulation you are excellent in astrology.";
    } else if (score > 6) {
        comment = "You are good in astrology.";
    } else if (score > 0) {
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
    noUsername.style.display = 'none';
    usernameInputEl.value = '';
}
/**
 * Hide all screens and show start screen, remove quiz name.
 */
function restartQuiz() {
    hideAllSections();
    sectionQuizEl.classList.remove("zodiac");
    sectionQuizEl.classList.remove("stars");
    startArea.classList.add("active");
}
/**
 * randomly shuffle an array
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
/**
 * Open the feedback page.
 */
function openFeedback() {
    hideAllSections();
    quizFeedbackEl.classList.add("active");
}
/**
 * Show quiz start screen.
 */
window.addEventListener("DOMContentLoaded", function () {
    startQuiz();
    restartQuiz();
});