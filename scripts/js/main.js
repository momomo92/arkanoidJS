const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let ballPositionX = canvasWidth/2;
let ballPositionY = canvasHeight-30;
let ballRadius = 10;
let numberToChangeBallPositionX = 1;
let numberToChangeBallPositionY = -1;
const paddleHeight = 10;
const paddleWidth = 75;
let paddlePositionX = (canvasWidth - paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;

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
    drawBall();
    drawPaddle();
    changeBallPositionX();
    changeBallPositionY();
    changePaddlePosition();
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