let attemptsLeft = 3;
let currentScreen = 1;

// Перехід між екранами
function showScreen(screenNum) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen${screenNum}`).classList.add('active');
    currentScreen = screenNum;
    
    if (screenNum === 4) {
        startFinalAnimation();
    }
}

function goBack(screenNum) {
    showScreen(screenNum);
}

// ЕКРАН 1
function checkAnswer1() {
    const answer = document.getElementById('answer1').value.toLowerCase().trim();
    const correctAnswers = ['привіт', 'ку', 'дарова', 'здарова', 'пр', 'саб', 'прив'];
    
    if (correctAnswers.includes(answer)) {
        showScreen(2);
    } else {
        document.querySelector('#screen1 .question-text').textContent = 'Спробуй ще 😉';
    }
}

// ЕКРАН 2
function checkAnswer2() {
    const answer = document.getElementById('answer2').value.toLowerCase().trim();
    const correctAnswers = ['ти, тільки ти, артур', 'артур', 'ти', 'ну ти'];
    
    if (correctAnswers.includes(answer)) {
        showScreen(3);
    } else {
        attemptsLeft--;
        const hint = document.getElementById('hint2');
        if (attemptsLeft > 0) {
            hint.textContent = `Неправильно, залишилось спроб: ${attemptsLeft}`;
        } else {
            hint.textContent = 'Підказка: Т..., А..., Н...';
        }
    }
}

// ЕКРАН 3
function checkAnswer3() {
    const answer = document.getElementById('answer3').value.toLowerCase().trim();
    const correctAnswers = ['хто?', 'хто', 'ну і хто?', 'ну хто?', 'ну хто', 'who?', 'who', 'who is it?', 'who is it'];
    
    if (correctAnswers.includes(answer)) {
        showScreen(4);
    } else {
        document.querySelector('#screen3 .hint').textContent = 'Спробуй ще: почни з питального слова 😉';
    }
}

// ФІНАЛЬНА АНІМАЦІЯ
function startFinalAnimation() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const colors = ["#FF0000", "#FF4500", "#FF6347", "#FF7F50", "#FFA500", "#FFD700", "#FFFF00", "#ADFF2F", "#00FF00", "#00FF7F", "#00FFFF", "#00BFFF", "#1E90FF", "#0000FF", "#8A2BE2", "#9400D3", "#9932CC", "#8B008B", "#FF00FF", "#FF1493", "#FF69B4"];
    
    let colorIndex = 0;
    
    function drawHeart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = Math.min(canvas.width, canvas.height) / 55;
        
        for (let i = 0; i < 360; i += 5) {
            const t = (i * Math.PI) / 180;
            const x = 22 * Math.pow(Math.sin(t), 3);
            const y = 19 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
            
            const px = centerX + x * scale;
            const py = centerY - y * scale;
            
            const color = colors[(i + colorIndex) % colors.length];
            
            ctx.font = 'bold 18px Monotype Corsiva';
            ctx.fillStyle = 'black';
            ctx.fillText('You <3', px + 1, py + 1);
            ctx.fillStyle = color;
            ctx.fillText('You <3', px, py);
        }
        
        colorIndex = (colorIndex + 1) % colors.length;
    }
    
    // Анімація серця
    setInterval(drawHeart, 100);
    drawHeart();
    
    // Показ обертового фото
    setTimeout(() => {
        document.getElementById('rotatingPhoto').style.display = 'block';
    }, 500);
}

// Запуск музики при першій взаємодії
let musicStarted = false;

function startMusic() {
    if (musicStarted) return;
    
    const music = document.getElementById('bgMusic');
    music.volume = 0.2;
    
    const playPromise = music.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            musicStarted = true;
            console.log('✅ Музика грає!');
        }).catch(error => {
            console.log('⚠️ Музика заблокована браузером. Натисни кнопку для запуску.');
            // Створюємо кнопку для ручного запуску
            showMusicButton();
        });
    }
}

function showMusicButton() {
    const btn = document.createElement('button');
    btn.textContent = '🎵 Увімкнути музику';
    btn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: #FF69B4;
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    `;
    btn.onclick = () => {
        const music = document.getElementById('bgMusic');
        music.play().then(() => {
            musicStarted = true;
            btn.remove();
        });
    };
    document.body.appendChild(btn);
}

// Запускаємо при першому кліку будь-де
document.addEventListener('click', startMusic, { once: true });
document.addEventListener('touchstart', startMusic, { once: true });

// Enter для відправки
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const screen = input.closest('.screen').id;
            if (screen === 'screen1') checkAnswer1();
            else if (screen === 'screen2') checkAnswer2();
            else if (screen === 'screen3') checkAnswer3();
        }
    });
});