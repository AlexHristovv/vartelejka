const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const updateButton = document.getElementById('update-button');
const nameInput = document.getElementById('name-input');
let player;

let names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'];
let numSegments = names.length;
let segmentAngle = 2 * Math.PI / numSegments;
let currentAngle = 0;
let spinAngle = 0;
let isSpinning = false;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numSegments; i++) {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, currentAngle + i * segmentAngle, currentAngle + (i + 1) * segmentAngle);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(currentAngle + (i + 0.5) * segmentAngle);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '20px Arial';
        ctx.fillText(names[i], canvas.width / 2 - 10, 10);
        ctx.restore();
    }
}

function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    spinAngle = Math.random() * 10 + 20;
    const spinInterval = setInterval(() => {
        currentAngle += spinAngle;
        spinAngle *= 0.97;
        if (spinAngle < 0.1) {
            clearInterval(spinInterval);
            isSpinning = false;
        }
        drawWheel();
    }, 30);
}

function updateNames() {
    const input = nameInput.value.trim();
    if (input) {
        names = input.split(',').map(name => name.trim());
        numSegments = names.length;
        segmentAngle = 2 * Math.PI / numSegments;
        drawWheel();
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-video', {
        height: '100%',
        width: '100%',
        videoId: '7BS71hiWBiY',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': '7BS71hiWBiY'
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Video is ready to be played
}

spinButton.addEventListener('click', () => {
    spinWheel();
    player.seekTo(45); // Start the video from 0:45
    player.playVideo();
});

updateButton.addEventListener('click', updateNames);
drawWheel();