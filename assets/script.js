const main = document.querySelector("#main");
const h1 = document.createElement("h1");
const p = document.createElement("p");
const button = document.createElement("button");
let secondsleft = 30;
let score = 0;
let timerInterval;
//stores my quiz questions as objects in an array
const questions = [
    {
        question: "JavaScript is the programming language of the _____",
        answers: {
            a: "Web",
            b: "Mobile",
            c: "Desktop",
            d: "Server"
        },
        correctAnswer: "a"
    },
    {
        question: "Which is not a correct data type in JavaScript?",
        answers: {
            a: "Number",
            b: "String",
            c: "Boolean",
            d: "Image"
        },
        correctAnswer: "d"
    },
    {
        question: "Which is the correct syntax for creating a function in JavaScript?",
        answers: {
            a: "function myFunction()",
            b: "myFunction()",
            c: "function:myFunction",
            d: "newFunction myFunction"
        },
        correctAnswer: "a"
    },
    {
        question: "Which is the correct syntax for creating an array in JavaScript?",
        answers: {
            a: "var myArray = []",
            b: "var myArray = new Array()",
            c: "var myArray = Array[]",
            d: "var myArray = new array()"
        },
        correctAnswer: "a"
    },
    {
        question: "Which is the correct operator for checking equality in JavaScript?",
        answers: {
            a: "==",
            b: "===",
            c: "=",
            d: "is equal to"
        },
        correctAnswer: "b"
    },
    {
        question: "Which is the correct syntax for a for loop in JavaScript?",
        answers: {
            a: "for (var i = 0; i < 5; i++)",
            b: "for i = 1 to 5",
            c: "for (i in 1..5)",
            d: "for i = 1, i <= 5, i++"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the keyword used to create a variable in JavaScript?",
        answers: {
            a: "new",
            b: "var",
            c: "let",
            d: "const"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the use of the 'this' keyword in JavaScript?",
        answers: {
            a: "It refers to the current object",
            b: "It refers to the parent object",
            c: "It refers to the global object",
            d: "It refers to the next object"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the correct syntax for an if-else statement in JavaScript?",
        answers: {
            a: "if (condition) { do something } else { do something else }",
            b: "if {condition} do something else do something else",
            c: "if (condition) => do something else => do something else",
            d: "if condition then do something else do something else"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the correct syntax for a while loop in JavaScript?",
        answers: {
            a: "while (condition) { do something }",
            b: "while {condition} do something",
            c: "while (condition) => do something",
            d: "while condition do something"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the correct syntax for a do-while loop in JavaScript?",
        answers: {
            a: "do { do something } while (condition)",
            b: "do { do something } while {condition}",
            c: "do { do something } while (condition) =>",
            d: "do do something while condition"
        },
        correctAnswer: "a"
    }
    
];
// sets the current question the quiz is on
let currentQuestionIndex = 0;

//creates the opening page of game on init
function init() {
    main.appendChild(h1);
    main.appendChild(p);
    main.appendChild(button);
    h1.textContent = "Coding Quiz Challenge";
    p.textContent = "Press start and try and answer as many questions as you can before the time runs out. You have 15 seconds. Be careful though, every wrong answer removes time left!";
    button.textContent = "Begin";
    button.addEventListener("click", start);
}
//removes the opening page elements and sets a game timer
function start() {
    currentQuestionIndex = 0;
    main.removeChild(h1);
    main.removeChild(p);
    main.removeChild(button);

    timerInterval = setInterval(function() {
        secondsleft--;
        timer = main.appendChild(p);
        timer.textContent = `${secondsleft} seconds left`;

        if (secondsleft === 0) {
            clearInterval(timerInterval);
            clearQuestionElements()
            showResult();
        }
    }, 1000);

    generateQuestion();
}
//creates the question
function generateQuestion() {
    main.appendChild(h1);
    const currentQuestion = questions[currentQuestionIndex];

    h1.textContent = currentQuestion.question;
    // iterates through the question object and renders each answer as a button with event listeners
    Object.keys(currentQuestion.answers).forEach(function(key) {
        const button = document.createElement("button");
        button.textContent = currentQuestion.answers[key];
        button.setAttribute("class", "select");
        button.addEventListener("click", function(event) {
            if (key === currentQuestion.correctAnswer) {
                score++;
            } else {
                secondsleft--;
            }
            clearQuestionElements();
        });
        main.appendChild(button);
    });
}
//clears the current question and updates the question index. checks if quiz is over before generating next question
function clearQuestionElements() {
    const questionElements = document.querySelectorAll(".select");
    questionElements.forEach(function(element) {
        main.removeChild(element);
    });
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        generateQuestion();
    } else {
        secondsleft = 1
    }
}
// prompt the user for their initials to potentially add their score to the highscore list
function showResult() {
    clearQuestionElements();
    main.removeChild(timer);
    h1.textContent = "High Scores"
    let input = prompt("Enter your initials (2 characters max)");
    //checks if initial input is valid
    while (input.length !== 2) {
        alert("Invalid input. Please enter 2 characters only.");
        input = prompt("Enter your initials (2 characters max)");
    }
    // Get the current high scores from local storage
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];


    // Add the new high score with initials to the high scores array
    highScores.push({initials: input, score: score});

    // Sort the scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Keep only the top 10 scores
    highScores = highScores.slice(0, 8);
    // Renders highscores on screen
    for (let i = 0; i < highScores.length; i++) {
        let score = highScores[i];
        let scoreElement = document.createElement("p");
        scoreElement.textContent = `${score.initials} - ${score.score}`;
        main.appendChild(scoreElement);
    }

    localStorage.setItem("highScores", JSON.stringify(highScores)); 
   
}

init()