// ...existing code...
// ...existing code...
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
    },
    {
        question: `What is the slope of the line shown in the third graph above?`,
        choices: ["Positive", "Negative", "Zero", "Undefined"],
        answer: "Positive",
        solution: "The line shown is y = 5x - 3, which has a positive slope of 5."
    },
    {
        question: `Given the equation y = -3x - 2, what is the value of y when x = 5?`,
        choices: ["-17", "-13", "13", "17"],
        answer: "-17",
        solution: "Substitute x = 5: y = -3*5 - 2 = -15 - 2 = -17."
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
        let graphHtml = '';
        // For question 4 (idx === 3), insert the y=5x-3 graph above the question
        if (idx === 3) {
            graphHtml = `<div style="text-align:center; margin-bottom:1em;">
                <svg width=\"300\" height=\"300\" viewBox=\"0 0 300 300\" xmlns=\"http://www.w3.org/2000/svg\">
                    <line x1=\"0\" y1=\"150\" x2=\"300\" y2=\"150\" stroke=\"#888\" stroke-width=\"2\" />
                    <line x1=\"150\" y1=\"0\" x2=\"150\" y2=\"300\" stroke=\"#888\" stroke-width=\"2\" />
                    <line x1=\"30\" y1=\"145\" x2=\"30\" y2=\"155\" stroke=\"#888\" stroke-width=\"2\" />
                    <text x=\"20\" y=\"140\" font-size=\"12\" fill=\"black\">-10</text>
                    <line x1=\"150\" y1=\"145\" x2=\"150\" y2=\"155\" stroke=\"#888\" stroke-width=\"2\" />
                    <text x=\"140\" y=\"140\" font-size=\"12\" fill=\"black\">0</text>
                    <line x1=\"270\" y1=\"145\" x2=\"270\" y2=\"155\" stroke=\"#888\" stroke-width=\"2\" />
                    <text x=\"260\" y=\"140\" font-size=\"12\" fill=\"black\">10</text>
                    <line x1=\"145\" y1=\"30\" x2=\"155\" y2=\"30\" stroke=\"#888\" stroke-width=\"2\" />
                    <text x=\"160\" y=\"35\" font-size=\"12\" fill=\"black\">10</text>
                    <line x1=\"145\" y1=\"150\" x2=\"155\" y2=\"150\" stroke=\"#888\" stroke-width=\"2\" />
                    <text x=\"160\" y=\"155\" font-size=\"12\" fill=\"black\">0</text>
                    <line x1=\"145\" y1=\"270\" x2=\"155\" y2=\"270\" stroke=\"#888\" stroke-width=\"2\" />
                    <text x=\"160\" y=\"275\" font-size=\"12\" fill=\"black\">-10</text>
                    <polyline fill=\"none\" stroke=\"blue\" stroke-width=\"3\" points=\"30,213 90,153 150,93 210,33 270,-27\" />
                    <text x=\"285\" y=\"165\" font-size=\"14\" fill=\"black\">x</text>
                    <text x=\"160\" y=\"20\" font-size=\"14\" fill=\"black\">y</text>
                </svg>
            </div>`;
        }
        html += `${graphHtml}<div class="question">
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
