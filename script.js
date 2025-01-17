const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers:[
            {text:"shark", correct:"false"},
            {text:"Blue Whale", correct:"true"},
            {text:"Elephant", correct:"false"},
            {text:"Giraffe", correct:"false"},
        ]
    },
    {
        question: "Which animal is known as the 'Ship of the Desert?",
        answers:[
            {text:"Horse", correct:"false"},
            {text:"Dog", correct:"false"},
            {text:"spider", correct:"false"},
            {text:"Camel", correct:"true"},
        ]
    },
    {
        question: "How many consonants are there in the English alphabet?",
        answers:[
            {text:"21 Consonants", correct:"true"},
            {text:"23 Consonants", correct:"false"},
            {text:"26 Consonants", correct:"false"},
            {text:"20 Consonants", correct:"false"},
        ]
    },
    {
        question: "Name the National bird of India?",
        answers:[
            {text:"Duck", correct:"false"},
            {text:"Crow", correct:"false"},
            {text:"Sparrow", correct:"false"},
            {text:"Peacock", correct:"true"},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("btn-next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
 
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = `Play Again!`;
    nextButton.style.display = "block";
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();