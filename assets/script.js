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

var highScoreBtn = document.getElementById('score-display');

// Hideable cards for introduction, the quiz itself, and high scores
let introContainer=document.getElementById('intro-container');
let quizContainer= document.getElementById('quiz-container');
let scoreEntry = document.getElementById('form');
let highScores = document.getElementById('scores');

function hideCards(){
    introContainer.style.display='none';
    quizContainer.style.display='none';
    scoreEntry.style.display='none';
    highScores.style.display='none';
}

loadIntro();
function loadIntro(){
    hideCards();
    introContainer.style.display='flex';
}


// Link to timer and start button
var liveTime= document.getElementById('time-left');
let startButton = document.getElementById('start');

// Establish global variables for timer and questions
var timeLeft;
var time;
var activeQ;

// Begin quiz on button click
startButton.addEventListener('click', startQuiz);

//Set up sequence of events and event listeners for the button click
function startQuiz(){
    hideCards();
    quizContainer.style.display='block';
    activeQ = 0;
    displayQuestions();
    time = 80;
    answerA.addEventListener('click', function() {checkAnswer(questions[activeQ].answers[0])});
    answerB.addEventListener('click', function() {checkAnswer(questions[activeQ].answers[1])});
    answerC.addEventListener('click', function() {checkAnswer(questions[activeQ].answers[2])});
    answerD.addEventListener('click', function() {checkAnswer(questions[activeQ].answers[3])});
    timeLeft = setInterval(timer,1000);
    showTime();
};

function timer(){
    if (time<=0 || activeQ===6){
        nameEntry();
        clearInterval(timeLeft);
        return;   
    }
    time--;
    showTime();
};

function showTime() {
    liveTime.innerHTML = time;
};


// Show active question
function displayQuestions() {
    if (activeQ === 6){
        nameEntry();
        return;
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
        time -= 10;
        showTime();
    }
    activeQ++;
    displayQuestions();
    return;
}


// Variables for name entry form and score
var latestScore = document.getElementById('latest-score');
var nameForm = document.querySelector('#form');
var nameInput = document.getElementById('name-input');

// Display name entry form and captu
function nameEntry() {
    hideCards();
    scoreEntry.style.display='block';
    latestScore.textContent = time;
    liveTime.innerHTML = 0;
    scoreEntry.addEventListener('submit', storeScore);
};

function storeScore(){
    hideCards();
    highScores.style.display='block';
}