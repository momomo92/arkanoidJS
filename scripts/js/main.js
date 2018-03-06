const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const brickRowCount = 3;
const brickColumnsCount = 5;
const brickWidth = 75;
const brickHeight = 10;
const brickPadding = 5;
let brick = [];
let ballPositionX = canvasWidth/2;
let ballPositionY = canvasHeight-30;
let ballRadius = 10;
let numberToChangeBallPositionX = 1;
let numberToChangeBallPositionY;
const paddleHeight = 10;
const paddleWidth = 75;
let paddlePositionX = (canvasWidth - paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;
let points = 0;
const startWay = Math.floor((Math.random() * 2) + 1);

if (startWay == 1) {
    numberToChangeBallPositionY = startWay;
} else {
    numberToChangeBallPositionY = -startWay;
}

for (let column = 0; column < brickColumnsCount; column++) {
    brick[column] = [];
    for (let row = 0; row < brickRowCount; row++) {
        let brickX = column * (brickWidth + brickPadding) + 30;
        let brickY = row * (brickHeight + brickPadding) + 30;
        brick[column][row] = {'positionX': brickX, 'positionY': brickY, 'visible': true};
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPoints();
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    changeBallPositionX();
    changeBallPositionY();
    changePaddlePosition();
}

function drawPoints() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Score: "+points, 8, 20);
}

function drawBricks() {
    for (let column = 0; column < brickColumnsCount; column++) {
        for (let row = 0; row < brickRowCount; row++) {
            if (brick[column][row].visible === true) {
                drawBrick(brick[column][row].positionX, brick[column][row].positionY);
            }
        }
    }
}

function drawBrick(brickX, brickY) {
    context.beginPath();
    context.rect(brickX, brickY, brickWidth, brickHeight);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function drawBall() {
    context.beginPath();
    context.arc(ballPositionX, ballPositionY, ballRadius, 0, Math.PI*2);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddlePositionX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function collisionDetection() {
    for (let column = 0; column < brickColumnsCount; column++) {
        for (let row = 0; row < brickRowCount; row++) {
            let brickData = brick[column][row];

            if (brickData.visible === true) {
                let isPositionY = ballPositionY > brickData.positionY && ballPositionY < brickData.positionY + brickHeight + ballRadius;
                let isPositionX = ballPositionX > brickData.positionX && ballPositionX < brickData.positionX + brickWidth;

                if (isPositionY && isPositionX) {
                    numberToChangeBallPositionY = -numberToChangeBallPositionY;
                    brickData.visible = false;
                    points++;
                }
            }
        }
    }
}

function changeBallPositionX() {
    const position = ballPositionX + numberToChangeBallPositionX;

    if (position < ballRadius || position + ballRadius > canvasWidth) {
        numberToChangeBallPositionX = -numberToChangeBallPositionX;
    }

    ballPositionX += numberToChangeBallPositionX;
}

function changeBallPositionY() {
    const position = ballPositionY + numberToChangeBallPositionY;

    if (position < ballRadius) {
        numberToChangeBallPositionY = -numberToChangeBallPositionY;
    } else if(position > canvasHeight - ballRadius) {
        if (ballPositionX > paddlePositionX && ballPositionX < paddlePositionX + paddleWidth) {
            numberToChangeBallPositionY = -numberToChangeBallPositionY;
        } else {
            alert('game over');
            numberToChangeBallPositionY = -numberToChangeBallPositionY;
        }
    }

    ballPositionY += numberToChangeBallPositionY;
}

function changePaddlePosition() {
    if (rightPressed && paddlePositionX < canvasWidth - paddleWidth) {
        paddlePositionX += 7;
    }

    if(leftPressed && paddlePositionX > 0) {
        paddlePositionX -= 7;
    }
}

setInterval(draw, 10);