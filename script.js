const mario = document.getElementById('mario');
let isJumping = false;
let position = 0;
let isGameOver = false;

// Função para mover Mario para a esquerda ou direita
function moveMario(event) {
    if (isGameOver) return;

    const key = event.key;
    if (key === 'ArrowRight') {
        position += 10;
        mario.style.left = `${position}px`;
    } else if (key === 'ArrowLeft') {
        position -= 10;
        mario.style.left = `${position}px`;
    }
}

// Função para Mario saltar
function jump() {
    if (!isJumping && !isGameOver) {
        isJumping = true;
        let jumpHeight = 0;

        // Subir
        let upInterval = setInterval(() => {
            if (jumpHeight >= 150) {
                clearInterval(upInterval);

                // Descer
                let downInterval = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    }
                    jumpHeight -= 5;
                    mario.style.bottom = `${50 + jumpHeight}px`;
                }, 20);
            }
            jumpHeight += 5;
            mario.style.bottom = `${50 + jumpHeight}px`;
        }, 20);
    }
}

// Função para criar obstáculos
function createObstacle() {
    const gameContainer = document.querySelector('.game-container');
    const obstacle = document.createElement('div');
    let obstaclePosition = 600;
    let randomTime = Math.random() * 4000;

    if (isGameOver) return;

    obstacle.classList.add('obstacle');
    gameContainer.appendChild(obstacle);
    obstacle.style.left = obstaclePosition + 'px';

    let leftInterval = setInterval(() => {
        if (obstaclePosition < -30) {
            clearInterval(leftInterval);
            gameContainer.removeChild(obstacle);
        } else if (obstaclePosition > position && obstaclePosition < position + 50 && parseInt(mario.style.bottom) < 80) {
            // Colisão detectada
            clearInterval(leftInterval);
            isGameOver = true;
            document.body.innerHTML = '<h1>Fim de Jogo</h1>';
        } else {
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        }
    }, 20);

    setTimeout(createObstacle, randomTime);
}

// Detectar teclas pressionadas
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') {
        jump();
    } else {
        moveMario(event);
    }
});

// Iniciar o jogo criando obstáculos
createObstacle();
