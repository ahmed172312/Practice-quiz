// ...existing code...
// quiz.js
// Static quiz data (no randomness)
const questions = [
    {
        question: `What is the slope of the line shown in the graph above?`,
        choices: ["Positive", "Negative", "Zero", "Undefined"],
        answer: "Negative",
        solution: "The line shown is y = -8x + 2, which has a negative slope of -8."
    },
    {
        question: `Given the equation y = 3x + 8, what is the y-intercept?`,
        choices: ["3", "8", "-3", "-8"],
        answer: "8",
        solution: "The y-intercept is the constant term, which is 8."
    },
    {
        question: `Given the equation y = 4x - 6, is the point (4, 10) on this line?`,
        choices: ["Yes", "No"],
        answer: "Yes",
        solution: "Substitute x = 4: y = 4*4 - 6 = 16 - 6 = 10, so (4, 10) is on the line."
    }
];

const userAnswers = [];
const questionContainer = document.getElementById('question-container');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');

function showAllQuestions() {
    let html = '';
    questions.forEach((q, idx) => {
        let inputHtml = '';
        if (q.choices) {
            inputHtml = q.choices.map((choice, i) =>
                `<label><input type="radio" name="answer${idx}" value="${choice}" ${i===0?'checked':''}> ${choice}</label><br>`
            ).join('');
        } else {
            inputHtml = `<input type="text" id="answer-input-${idx}" autocomplete="off" />`;
        }
        html += `<div class="question">
            <label>${q.question}</label><br>
            ${inputHtml}
        </div>`;
    });
    questionContainer.innerHTML = html;
    resultContainer.innerHTML = '';
}

submitBtn.addEventListener('click', () => {
    questions.forEach((q, idx) => {
        let answer = '';
        if (q.choices) {
            const selected = document.querySelector(`input[name="answer${idx}"]:checked`);
            answer = selected ? selected.value : '';
        } else {
            const input = document.getElementById(`answer-input-${idx}`);
            answer = input.value;
        }
        userAnswers[idx] = answer;
    });
    gradeQuiz();
});

function gradeQuiz() {
    let score = 0;
    let output = '';
    for (let i = 0; i < questions.length; i++) {
        let correct = false;
        if (questions[i].choices) {
            correct = (userAnswers[i] === questions[i].answer);
        } else {
            correct = userAnswers[i]?.trim().toLowerCase() === questions[i].answer.toLowerCase();
        }
        if (correct) score++;
        output += `<div class="question">${questions[i].question}<br>
            <span>Your answer: ${userAnswers[i] || ''}</span><br>
            <span class="solution">Solution: ${questions[i].solution}</span><br>
            <span style="color:${correct ? 'green' : 'red'}">${correct ? 'Correct' : 'Incorrect'}</span>
        </div>`;
    }
    const percent = ((score / questions.length) * 100).toFixed(1);
    resultContainer.innerHTML = `<div class="result">Score: ${score} / ${questions.length} (${percent}%)</div>` + output;
    questionContainer.innerHTML = '';
    submitBtn.classList.add('hidden');
}

// Show all questions on load
showAllQuestions();
