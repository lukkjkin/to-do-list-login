// Acessando o canvas e o contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Tamanho do bloco
const box = 20;

// Inicializando a cobrinha
let snake = [{x: 9 * box, y: 9 * box}]; // Posição inicial da cobrinha

// Inicializando o coração
let heart = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};

// Direção inicial
let direction = 'RIGHT';
let score = 0;

// Controle da direção com as teclas de seta
document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

// Função para desenhar a cobrinha
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen'; // A cabeça é verde, o corpo é claro
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Função para desenhar o coração
function drawHeart() {
    ctx.fillStyle = 'red';
    ctx.fillRect(heart.x, heart.y, box, box);
}

// Função para atualizar a pontuação
function updateScore() {
    document.getElementById('score').textContent = score;
}

// Função de movimento da cobrinha
function moveSnake() {
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Adicionando o novo "segmento" da cobrinha na frente
    const newHead = {x: snakeX, y: snakeY};

    // Se a cobrinha comer o coração
    if (snakeX === heart.x && snakeY === heart.y) {
        score++;
        updateScore();
        heart = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    } else {
        snake.pop(); // Remove o último segmento se não comer o coração
    }

    // Adiciona o novo segmento à frente
    snake.unshift(newHead);
}

// Função para verificar se a cobrinha colidiu com ela mesma ou com a parede
function collision() {
    // Verifica se a cabeça da cobrinha colidiu com o corpo
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // Verifica se a cobrinha bateu na parede
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        return true;
    }

    return false;
}

// Função principal que atualiza o jogo
function gameLoop() {
    if (collision()) {
        return alert('Game Over! Pontuação final: ' + score); // Se ocorrer colisão, jogo acaba
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas para o próximo quadro
    drawSnake();
    drawHeart();
    moveSnake();
}

// Chama a função de atualização a cada 100ms
setInterval(gameLoop, 100);
