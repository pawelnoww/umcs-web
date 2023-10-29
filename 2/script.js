var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 650;
canvas.height = 400;

var score1 = 0;
var score2 = 0;
var keys = {};

window.addEventListener('keydown', function (e) {
    keys[e.keyCode] = true;
    e.preventDefault();
});

window.addEventListener('keyup', function (e) {
    delete keys[e.keyCode];
});

function Box(options) {
    this.x = options.x || 10;
    this.y = options.y || 10;
    this.width = options.width || 40;
    this.height = options.height || 50;
    this.color = options.color || '#FFFFFF';
    this.speed = options.speed || 2;
    this.gravity = options.gravity || 2;
}

var player1 = new Box({
    x: 10,
    y: 200,
    width: 15,
    height: 80,
    color: '#FFFFFF',
    gravity: 2
});

var player2 = new Box({
    x: 625,
    y: 100,
    width: 15,
    height: 80,
    color: '#FFFFFF',
    gravity: 2
});

var midLine = new Box({
    x: (canvas.width / 2) - 2.5,
    y: -1,
    width: 5,
    height: canvas.height + 1,
    color: '#FFFFFF'
});

var theBall = new Box({
    x: (canvas.width / 2),
    y: (canvas.height / 2),
    width: 15,
    height: 15,
    color: '#FF0000',
    speed: 1,
    gravity: 1
})

function input() {
    if (87 in keys) {
        if (player1.y - player1.gravity > 0) {
            player1.y -= player1.gravity;
        }
    } else if (83 in keys) {
        if (player1.y + player1.height + player1.gravity < canvas.height) {
            player1.y += player1.gravity;
        }
    }
    if (38 in keys) {
        if (player2.y - player2.gravity > 0) {
            player2.y -= player2.gravity;
        }
    } else if (40 in keys) {
        if (player2.y + player2.height + player2.gravity < canvas.height) {
            player2.y += player2.gravity;
        }
    }
}

function drawBox(box) {
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.width, box.height);
}

function displayScore1() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "rgb(255,255,255)";
    var str1 = score1;
    ctx.fillText(str1, (canvas.width / 2) - 50, 30);
}

function displayScore2() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "rgb(255,255,255)";
    var str2 = score2;
    ctx.fillText(str2, (canvas.width / 2) + 50, 30);
}


function ballBounce() {
    if (((theBall.y + theBall.gravity) <= 0) || ((theBall.y + theBall.gravity + theBall.height) >= canvas.height)) {
        theBall.gravity = theBall.gravity * -1;
        theBall.y += theBall.gravity;
        theBall.x += theBall.speed;
    } else {
        theBall.x += theBall.speed;
        theBall.y += theBall.gravity
    }
    ballCollision();
}

function ballCollision() {
    if (((theBall.x + theBall.speed <= player1.x + player1.width) && (theBall.y + theBall.gravity > player1.y) && (theBall.y + theBall.gravity <= player1.y + player1.height))
        || ((theBall.x + theBall.width + theBall.speed >= player2.x) && (theBall.y + theBall.gravity > player2.y) && (theBall.y + theBall.gravity <= player2.y + player2.height))) {
        theBall.speed = theBall.speed * -1;
    } else if (theBall.x + theBall.speed < player1.x) {
        score2 += 1;
        theBall.speed = theBall.speed * -1;
        theBall.x = 100 + theBall.speed;
        theBall.y += theBall.gravity;
    } else if (theBall.x + theBall.speed > player2.x + player2.width) {
        score1 += 1;
        theBall.speed = theBall.speed * -1;
        theBall.x = 500 + theBall.speed;
        theBall.y += theBall.gravity;
    } else {
        theBall.x += theBall.speed;
        theBall.y += theBall.gravity;
    }
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayScore1();
    displayScore2();
    drawBox(player1);
    drawBox(player2);
    drawBox(midLine);
    drawBox(theBall);
}

function loop() {
    ballBounce();
    input(player1);
    input(player2);
    window.requestAnimationFrame(loop);
}

loop();