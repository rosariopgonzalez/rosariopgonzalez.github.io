// Define the quiz questions and answers
const quizData = [
    {
        question: "Cuál es mi bebida alcohólica preferida?",
        options: ["Cerveza", "Vino", "Fernet", "Vodka"],
        correctAnswer: "Vino"
    },
    {
        question: "Qué prefiero entrenar?",
        options: ["Piernas", "Glúteos", "Espalda", "Brazos"],
        correctAnswer: "Espalda"
    },
    {
        question: "Cuál es mi color preferido actualmente?",
        options: ["Turquesa", "Azul", "Verde esmeralda"],
        correctAnswer: "Verde esmeralda"
    }
];

// Variables to keep track of answers and the quiz progress
let userAnswers = [];

// Function to display the quiz questions
function displayQuiz() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";

    quizData.forEach((item, index) => {
        // Create a div for each question
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        // Question text
        const questionText = document.createElement("p");
        questionText.textContent = item.question;
        questionDiv.appendChild(questionText);

        // Options
        item.options.forEach(option => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question-${index}`;
            input.value = option;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement("br"));
        });

        questionContainer.appendChild(questionDiv);
    });
}

// Function to capture the user's answers
// Function to submit the quiz results
function submitQuiz() {
    const results = [];
    quizData.forEach((item, index) => {
        const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedOption) {
            userAnswers.push(selectedOption.value);
        } else {
            userAnswers.push(null); // If no answer is selected
        }
    });

    // Calculate the score
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correctAnswer) {
            score++;
        }
    });

    // Get the user's name (you can also add a prompt or input field for this)
    const userName = prompt("Please enter your name:");

    // Send data to backend (MongoDB)
    fetch('http://localhost:3000/submit-quiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userName,
            answers: userAnswers,
            score: score
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Thank you for taking the quiz! Your result has been saved.');
        console.log('Response from server:', data);
    })
    .catch(error => {
        console.error('Error submitting quiz:', error);
        alert('Error submitting your result.');
    });

    // Display the result on the page
    displayResult(score);
}

    // Calculate the result (simple example: count correct answers)
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correctAnswer) {
            score++;
        }
    });

    displayResult(score);


// Function to display the result
function displayResult(score) {
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = `You got ${score} out of ${quizData.length} correct!`;

    let resultMessage = "";
    if (score === quizData.length) {
        resultMessage = "You and your friends are true besties!";
    } else if (score > quizData.length / 2) {
        resultMessage = "You're good friends, but there’s room for more bonding!";
    } else {
        resultMessage = "Looks like you need to spend more time with your friends!";
    }

    resultContainer.innerHTML += `<p>${resultMessage}</p>`;
}

// Initialize the quiz
displayQuiz();
