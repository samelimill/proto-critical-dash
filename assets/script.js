let startQuiz= document.getElementById('start');
let quizContainer= document.getElementById('quiz-container');
let time= document.getElementById('time-left');
let answerContainer= document.getElementById('answers');
var timeLeft=0;
var question= document.getElementById('question');
var answerA= document.getElementById('A');
var answerB= document.getElementById('B');
var answerC= document.getElementById('C');
var answerD= document.getElementById('D');

let questions = [
    {question:"What types of data can be stored to local storage?",
    A:"Numbers and strings",
    B:"Strings",
    C:"Booleans",
    D:"All of the Above",
    correct:"B",},
    {question:"stopPropagation(), addEventListener(), and querySelector() are all examples of what?",
    A:"Arrow functions",
    B:"Constructors",
    C:"Methods",
    D:"Variables",
    correct:"C",},
    {question:"The JavaScript form is typically linked where in HTML?",
    A:"In the head, alongside the CSS link",
    B:"Between the body and the closing HTML tag",
    C:"Directly above the closing body tag",
    D:"Directly beneath the site header",
    correct:"C",},
    {question:"What can not be achieved through JavaScript?",
    A:"Placing text into an HTML <div> container",
    B:"Providing pop-up alerts to the user",
    C:"Store a raw Boolean value to local storage",
    D:"None of the above",
    correct:"C",},
    {question:"The **= operator performs what function?",
    A:"Performs exponentiation on the left operand by the right operand",
    B:"Provides the remainder from an operand and a divisor",
    C:"Multiplies a number by the same number",
    D:"Returns the square root of an operand",
    correct:"A",},
    {question:"// allows for which of the following?",
    A:"Multiplication of an operand by another",
    B:"Commenting in the JavaScript form",
    C:"Verification via a true Boolean value if two operands are divisible",
    D:"Termination of a function",
    correct:"b",},
];

startQuiz.addEventListener('click', function startQuiz(){
    timer();
    displayQuestions();
});

function timer(){
    var timeLeft = 60;
    var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
    time.textContent = timeLeft;
    timeLeft--;
    } else {   
    time.textContent = '';
    clearInterval(timeInterval);
    }
    }, 1000);
};

function displayQuestions(){
}