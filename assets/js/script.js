let startArea = document.getElementById("welcome");
let quizArea = document.getElementById("quiz-area");
let questionText = document.getElementById("question-text");
let answerButtons = document.getElementById("btn-answer");

let score;
let currentQuestion;
let questionSet;


function startQuiz(questions) {
    score = 0;
    currentQuestion = 0;
    questionSet = questions;
    displayQuestion();
}

function displayQuestion(){
    if (currentQuestion + 1 > questionSet.length){
        gameOver();
    }
    questionText.innerHTML = questionSet[currentQuestion].question;
    for (let i = 0; i+1  <= answerButtons.length; i++){
        console.log(answerButtons[i].innerHTML);
        answerButtons[i].innerHTML = questionSet[currentQuestion].choices[i];
    }
}

function incrementScore(){

}

function incrementWrongAnswer(){

}
