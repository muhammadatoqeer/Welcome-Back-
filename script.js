// Theme switcher logic
const themeBtn = document.getElementById('theme-btn');
const card = document.querySelector('.card');
let currentTheme = 1;
function setTheme(theme) {
    document.body.classList.remove('theme-1', 'theme-2');
    card.classList.remove('theme-1', 'theme-2');
    document.body.classList.add('theme-' + theme);
    card.classList.add('theme-' + theme);
}
setTheme(currentTheme);
if (themeBtn) {
    themeBtn.addEventListener('click', function() {
        currentTheme = currentTheme === 1 ? 2 : 1;
        setTheme(currentTheme);
    });
}

// Handwritten note effect
const handwrittenText = document.getElementById('handwritten-text');
const note = "I missed you very much! Hope you had an amazing time in Malaysia. Here’s to a great return!";
let i = 0;
function typeWriter() {
    if (handwrittenText && i <= note.length) {
        handwrittenText.textContent = note.slice(0, i);
        i++;
        setTimeout(typeWriter, 35);
    }
}
typeWriter();
// Simple confetti animation
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confetti = [];

function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}

function randomColor() {
    const colors = ['#f76b1c', '#fda085', '#f6d365', '#ff9a44', '#fff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createConfettiPiece() {
    return {
        x: Math.random() * canvas.width,
        y: -10,
        r: Math.random() * 6 + 4,
        d: Math.random() * 40 + 10,
        color: randomColor(),
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
        tiltAngleIncremental: (Math.random() * 0.07) + 0.05
    };
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + (c.r / 3), c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.d);
        ctx.stroke();
    });
    updateConfetti();
}

function updateConfetti() {
    for (let i = 0; i < confetti.length; i++) {
        confetti[i].y += Math.cos(0.01 + confetti[i].d) + 2 + confetti[i].r / 2;
        confetti[i].tiltAngle += confetti[i].tiltAngleIncremental;
        confetti[i].tilt = Math.sin(confetti[i].tiltAngle) * 15;
        if (confetti[i].y > canvas.height) {
            confetti[i] = createConfettiPiece();
            confetti[i].y = -10;
        }
    }
}

function startConfetti() {
    resizeCanvas();
    confetti = [];
    for (let i = 0; i < 80; i++) {
        confetti.push(createConfettiPiece());
    }
    let duration = 2000;
    let start = null;
    function animateConfetti(ts) {
        if (!start) start = ts;
        let progress = ts - start;
        drawConfetti();
        if (progress < duration) {
            requestAnimationFrame(animateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    requestAnimationFrame(animateConfetti);
}

window.addEventListener('resize', resizeCanvas);
document.getElementById('confetti-btn').addEventListener('click', startConfetti);
resizeCanvas();

// Modal reveal logic
const revealBtn = document.getElementById('reveal-btn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
if (revealBtn && modal && closeModal) {
    revealBtn.addEventListener('click', function() {
        modal.classList.add('show');
        revealBtn.disabled = true;
        revealBtn.textContent = '💖 Revealed!';
    });
    function closeModalFunc() {
        modal.classList.remove('show');
        revealBtn.disabled = false;
        revealBtn.textContent = 'Tap to Reveal 💖';
    }
    closeModal.addEventListener('click', closeModalFunc);
    // Close modal if clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
}
