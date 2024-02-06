const canvas = document.querySelector("#board");
const ctx = canvas.getContext("2d");
const gridSize = 10;
const rows = 50;
const cols = 50;
const fps = 30;
const currentFrame = 0;
 
let score = 0;
let now;
let then = Date.now();
let interval = 1000 / fps;
let delta;

let dirX = 0;
let dirY = 0;
let isThisFirstStart = true;
const food = {
    pos: {
        x: 0,
        y: 0
    },
    color: "red",
    getNewFood() {
        this.pos.x = Math.floor(Math.random() * cols) * gridSize;
        this.pos.y = Math.floor(Math.random() * rows) * gridSize;
    },
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, gridSize, gridSize);
        ctx.fill();
        ctx.closePath();
    }
}
food.getNewFood();
const snakeBody = [{x:10,y:20},{x:30,y:40}];
const snake = {
    pos: {
        x: 0,
        y: 0
    },
    color: "white",
    update() {
        this.pos.x += dirX * gridSize;
        this.pos.y += dirY * gridSize;
    },
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, gridSize, gridSize);
        ctx.fill();
        ctx.closePath();
    },

    handleKeyEvent(e) {
        if (isThisFirstStart) {
            dirX = 1;
            isThisFirstStart = false;
        }
        switch (e.key) {
            case "ArrowUp": if (dirY != 1) {
                dirX = 0;
                dirY = -1;
            }
                break;
            case "ArrowDown": if (dirY != -1) {
                dirX = 0;
                dirY = 1;
            }
                break;
            case "ArrowLeft": if (dirX != 1) {
                dirY = 0;
                dirX = -1;
            }
                break;
            case "ArrowRight": if (dirX != -1) {
                dirY = 0;
                dirX = 1;
            }
                break;
        }
    }
}

function isCollide(food, snake) {
    let dx = snake.pos.x - food.pos.x;
    let dy = snake.pos.y - food.pos.y;
    let dis = Math.sqrt(dx * dx + dy * dy);
    return dis < gridSize;
}

function drawBody(ctx, pos, color, size) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, size, size);
    ctx.fill();
    ctx.closePath();
}


window.addEventListener("keydown", snake.handleKeyEvent);
canvas.width = gridSize * cols;
canvas.height = gridSize * rows;

function draw() {
    requestAnimationFrame(draw);

    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        then = now - (delta % interval);

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        snake.update();  // Move this line here

        if (isCollide(food, snake)) {
            let pos = { x: food.pos.x, y: food.pos.y };
            snakeBody.push(pos);
            food.getNewFood();
        }

        for (let i = snakeBody.length - 1; i > 0; i--) {
            if (i === 1) {
                snakeBody[i] = { x: snake.pos.x, y: snake.pos.y };  // Update the head position first
            } else {
                snakeBody[i] = snakeBody[i - 1];
            }
            drawBody(ctx, snakeBody[i], "green", gridSize);
        }

        snake.draw(ctx);
        food.draw(ctx);
    }
}

draw();



