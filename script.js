let points = 0;
let streak = 0;
let currentQuestion = null;

const drawnNumberEl = document.getElementById('drawnNumber');
const pointsEl = document.getElementById('points');
const streakEl = document.getElementById('streak');
const messageBox = document.getElementById('messageBox');
const musketeerOverlay = document.getElementById('musketeerOverlay');
const quizQuestionEl = document.getElementById('quizQuestion');
const quizOptionsEl = document.getElementById('quizOptions');

const biologyQuestions = [
    {
        q: "Qual organela é responsável pela síntese e produção de ATP?",
        options: ["Complexo de Golgi", "Mitocôndria", "Ribossomo"],
        answer: 1
    },
    {
        q: "Onde o Genoma de uma célula eucarionte fica armazenado?",
        options: ["Núcleo", "Citoplasma", "Membrana"],
        answer: 0
    },
    {
        q: "Qual processo converte luz em energia química nas plantas?",
        options: ["Fermentação", "Fotossíntese", "Transcrição"],
        answer: 1
    },
    {
        q: "Qual das bases nitrogenadas NÃO faz parte do DNA?",
        options: ["Adenina", "Uracila", "Guanina"],
        answer: 1
    },
    {
        q: "Qual pigmento confere a cor verde pastel às folhas?",
        options: ["Caroteno", "Clorofila", "Melanina"],
        answer: 1
    }
];

// Evento nos botões numerados (1 a 10)
document.querySelectorAll('.num-btn').forEach(button => {
    button.addEventListener('click', () => {
        const guess = parseInt(button.getAttribute('data-val'));
        handleGuess(guess);
    });
});

function handleGuess(guess) {
    const drawn = Math.floor(Math.random() * 10) + 1;

    drawnNumberEl.classList.remove('draw-anim');
    void drawnNumberEl.offsetWidth;
    drawnNumberEl.classList.add('draw-anim');
    drawnNumberEl.innerText = drawn;

    if (guess === drawn) {
        showQuiz();
    } else {
        streak = 0;
        setMessage(`❌ Sorteio: ${drawn}. Você escolheu ${guess}. Sequência zerada.`, 'lose');
        updateScoreboard();
        updateDots();
    }
}

function showQuiz() {
    const randomIndex = Math.floor(Math.random() * biologyQuestions.length);
    currentQuestion = biologyQuestions[randomIndex];

    quizQuestionEl.innerText = currentQuestion.q;
    quizOptionsEl.innerHTML = '';

    currentQuestion.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.innerText = opt;
        btn.onclick = () => answerQuiz(idx);
        quizOptionsEl.appendChild(btn);
    });

    musketeerOverlay.classList.add('active');
}

function answerQuiz(selectedIndex) {
    musketeerOverlay.classList.remove('active');

    if (selectedIndex === currentQuestion.answer) {
        streak++;
        if (streak === 5) {
            points += 10;
            streak = 0;
            setMessage("🏆 Excelente! 5 acertos seguidos! Você ganhou +10 pontos!", 'win');
        } else {
            setMessage(`🎯 Resposta Correta! Sequência atual: ${streak}/5.`, 'hit');
        }
    } else {
        streak = 0;
        setMessage("❌ Resposta incorreta no Quiz! Sua sequência foi zerada.", 'lose');
    }

    updateScoreboard();
    updateDots();
}

function setMessage(text, type) {
    messageBox.innerText = text;
    messageBox.className = 'message-banner ' + type;
}

function updateScoreboard() {
    pointsEl.innerText = points;
    streakEl.innerText = `${streak} / 5`;
}

function updateDots() {
    for (let i = 1; i <= 5; i++) {
        const dot = document.getElementById(`dot${i}`);
        if (dot) {
            if (i <= streak) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        }
    }
}