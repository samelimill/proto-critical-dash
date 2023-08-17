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
    answers: ["Placing text into an HTML container","Providing pop-up alerts to the user","Store a raw Boolean value to local storage","None of the above"],
    correct:"Store a raw Boolean value to local storage",},
    {questionText:"The **= operator performs what function?",
    answers: ["Performs exponentiation on the left operand by the right operand","Provides the remainder from an operand and a divisor","Multiplies a number by the same number","Returns the square root of an operand"],
    correct:"Performs exponentiation on the left operand by the right operand",},
    {questionText:"// allows for which of the following?",
    answers: ["Multiplication of an operand by another","Commenting in the JavaScript form","Verification via a true Boolean value if two operands are divisible","Termination of a function"], 
    correct:"Commenting in the JavaScript form",},
];

// Variables for quiz button and text elements
const liveQuestion= document.getElementById('question');
const answerA= document.getElementById('A');
const answerB= document.getElementById('B');
const answerC= document.getElementById('C');
const answerD= document.getElementById('D');
const answerContainer= document.getElementById('answers');
const highScoreBtn = document.getElementById('score-display');

// Hideable cards for introduction, the quiz itself, and high scores
const introContainer=document.getElementById('intro-container');
const quizContainer= document.getElementById('quiz-container');
const scoreEntry = document.getElementById('form');
const highScores = document.getElementById('scores');

// Link to timer and start button
let liveTime= document.getElementById('time-left');
let startButton = document.getElementById('start');

// Establish global variables for timer and questions
var timeLeft;
var time;
var activeQ;

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


highScoreBtn.addEventListener('click', showHighScores);

// Show active question
function displayQuestions() {
    console.log(activeQ);
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

const resultBox = document.getElementById('correct');

function hideResult(){
    resultBox.style.display = 'none';
}

// Check chosen answer and display result
function checkAnswer(liveChoice){
    resultBox.style.display = 'block';
    if (liveChoice === questions[activeQ].correct){
        resultBox.innerHTML = "Correct!";
        resultBox.style.color = 'green';
        setTimeout(hideResult, 1500);
    } else {
        resultBox.innerHTML = "Wrong!";
        resultBox.style.color = 'red';
        time -= 10;
        showTime();
        setTimeout(hideResult, 1500);
    }
    activeQ++;
    displayQuestions();
    return;
}


// Variables for name entry form and score
var latestScore = document.getElementById('latest-score');
var nameForm = document.getElementById('form');
var nameInput = document.getElementById('name-input');

// Display name entry form and captu
function nameEntry() {
    hideCards();
    scoreEntry.style.display='flex';
    latestScore.textContent = time;
    liveTime.innerHTML = 0;
};
scoreEntry.addEventListener('submit', storeScore);

function storeScore(event){    
    event.preventDefault();
    if(!nameInput.value){
        alert('Please enter your initials before submitting.');
        nameEntry();
        return;
    }
    let newScore = {
        name: nameInput.value,
        timeScore: latestScore.textContent
    };
    addToScores(newScore);
    showHighScores();
};

function addToScores(newScore){
    var storedHighScores = pullHighScores();
    console.log(storedHighScores);
    storedHighScores.push(newScore);
    localStorage.setItem('storedHighScores', JSON.stringify(storedHighScores));
};

var storedHighScores = [];

function pullHighScores(){
    let highScores = localStorage.getItem('storedHighScores');
    if (highScores === '') {
        storedHighScores = [];
    } else {
        storedHighScores = JSON.parse(highScores);
        
    // sorts high scores from high to low 
        storedHighScores.sort(function(a,b){
            return b.score - a.score;
        });
    }
    return storedHighScores;
}; 


const backToStart = document.getElementById('back-to-start');
const getRidOfIt = document.getElementById('clear-scores')
getRidOfIt.addEventListener('click', clearScores)
backToStart.addEventListener('click', function() {window.location.reload(true)});

function showHighScores(){
    hideCards();
    highScores.style.display='flex';
    var totalScore = sortScores();
    let scoresBody = document.getElementById('scores-body');
    scoresBody.innerHTML = "";
    for (var i = 0; i < totalScore.length; i++){
        let score = totalScore[i];
        let appendScores = document.createElement('li');
        appendScores.textContent = score.name + ' === ' + score.timeScore;
        scoresBody.append(appendScores);
    }
 //   
    liveTime.innerHTML = "";
    clearInterval(timeLeft);
};

function sortScores(){
    var scoreFunk = pullHighScores();
    scoreFunk.sort(function (a, b){
        return b.timeScore - a.timeScore;
    });
    return scoreFunk;
};

 function clearScores(){
    localStorage.setItem('storedHighScores', "")
    showHighScores();
};