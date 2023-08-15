// Establish array of questions
let questions = [
    {questionText:"What types of data can be stored to local storage?",
    answers: ["Numbers and strings","Strings","Booleans","All of the Above"],
    correct:"Strings",},
    {questionText:"stopPropagation(), addEventListener(), and querySelector() are all examples of what?",
    answers: ["Arrow functions","Constructors","Methods","Variables"],
    correct:"Methods",},
    {questionText:"The JavaScript form is typically linked where in HTML?",
    answers: ["In the head, alongside the CSS link","Between the body and the closing HTML tag","Directly above the closing body tag","Directly beneath the site header"],
    correct:"Between the body and the closing HTML tag",},
    {questionText:"What can not be achieved through JavaScript?",
    answers: ["Placing text into an HTML <div> container","Providing pop-up alerts to the user","Store a raw Boolean value to local storage","None of the above"],
    correct:"Store a raw Boolean value to local storage",},
    {questionText:"The **= operator performs what function?",
    answers: ["Performs exponentiation on the left operand by the right operand","Provides the remainder from an operand and a divisor","Multiplies a number by the same number","Returns the square root of an operand"],
    correct:"Performs exponentiation on the left operand by the right operand",},
    {questionText:"// allows for which of the following?",
    answers: ["Multiplication of an operand by another","Commenting in the JavaScript form","Verification via a true Boolean value if two operands are divisible","Termination of a function"], 
    correct:"Commenting in the JavaScript form",},
];

// Variables for quiz button and text elements
var liveQuestion= document.getElementById('question');
var answerA= document.getElementById('A');
var answerB= document.getElementById('B');
var answerC= document.getElementById('C');
var answerD= document.getElementById('D');
var answerContainer= document.getElementById('answers');

// Hideable cards for introduction, the quiz itself, and high scores
let introContainer=document.getElementById('intro-container');
let quizContainer= document.getElementById('quiz-container');
let scoreEntry = document.getElementById('name-entry');
let highScores = document.getElementById('high-scores');

// Link to timer and start button
var liveTime= document.getElementById('time-left');
let startButton = document.getElementById('start');

// Establish global variables for timer and questions
var timeLeft;
var time;
var activeQ;

// Begin quiz on button click
startButton.addEventListener('click', startQuiz);
function startQuiz(){
    introContainer.style.visibility = 'hidden';
    quizContainer.style.visibility = 'visible';
    activeQ = 0;
    displayQuestions();
    time = 20;
    answerA.addEventListener('click', function() {checkAnswer(questions[activeQ].answers[0])});
    answerB.addEventListener('click', function() {checkAnswer(questions[activeQ].answers[1])});
    answerC.addEventListener('click', function() {checkAnswer(questions[activeQ].answers[2])});
    answerD.addEventListener('click', function() {checkAnswer(questions[activeQ].answers[3])});
    timeLeft = setInterval(timer,1000);
    showTime();
};

function timer(){
    time--;
    if (time<=0){
        gameOver();
        clearInterval(timeLeft);
    }
    showTime();
};

function gameOver(){
    nameEntry();
};

function showTime() {
    liveTime.innerHTML = time;
};

function storeScore(){
    localStorage.setItem('name', nameForm.textContent);
    localStorage.setItem('score', latestScore.textContent);
}

// Show active question
function displayQuestions() {
    if (activeQ === 6){
        nameEntry();
    }
    liveQuestion.textContent = questions[activeQ].questionText;
    answerA.innerHTML = questions[activeQ].answers[0];
    answerB.innerHTML = questions[activeQ].answers[1];
    answerC.innerHTML = questions[activeQ].answers[2];
    answerD.innerHTML = questions[activeQ].answers[3];
};

// Check chosen answer 
function checkAnswer(liveChoice){
    if (liveChoice === questions[activeQ].correct){
        document.getElementById('correct').innerHTML = "Correct!";
    } else {
        document.getElementById('correct').innerHTML = "Wrong!";
        time-10;
    }
    activeQ++;
    displayQuestions();
    return;
}


// name entry for high scores
var latestScore = document.getElementById('latest-score');
var nameForm = document.querySelector('#form.input')

function nameEntry() {
    quizContainer.style.visibility = 'hidden';
    scoreEntry.style.visibility = 'visible';
    latestScore.textContent = time;
    nameForm.addEventListener('submit', storeScore());
};



