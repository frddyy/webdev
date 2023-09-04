// Game Board
let gameBoard;
let gameBoardWidth = 750;
let gameBoardHeight = 250;
let gameContext;

// T-Rex
let trexStandingWidth = 68;
let trexStandingHeight = 74;
let trexDuckingWidth = 58;
let trexDuckingHeight = 64;

let trexWidth = trexStandingWidth; // Ukuran awal dinosaurus (lebar)
let trexHeight = trexStandingHeight; // Ukuran awal dinosaurus (tinggi)

let trexX = 50;
let trexY = gameBoardHeight - trexHeight;
let trexImg;

let trex = {
    x : trexX,
    y : trexY,
    width : trexWidth,
    height : trexHeight
}
// Array frame-frame gambar untuk animasi berlari
let trexRunningFrames = [
    "assets/img/dino-run1.png",
    "assets/img/dino-run2.png"
];

// Array frame-frame gambar untuk animasi menunduk
let trexDuckingFrames = [
    "assets/img/dino-duck1.png",
    "assets/img/dino-duck2.png"
];

let trexRunningFrameIndex = 0; // Indeks frame berjalan saat ini
let trexDuckingFrameIndex = 0; // Indeks frame menunduk saat ini
let frameChangeInterval = 150; // Interval pergantian frame (ms)
let lastFrameChangeTime = 0; // Waktu terakhir pergantian frame

let isDuckingAnimation = false;
let isDucking = false;

// Track
let trackImg = document.getElementById("track");

// Cactus
let cacti = [];
let cactus1Width = 43;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = gameBoardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

// let birdObstacleWidth = 40;
// let birdObstacleHeight = 30;
// let birdObstacles = [];

// let birdImg1 = new Image();
// birdImg1.src = "assets/img/bird1.png";

// let birdImg2 = new Image();
// birdImg2.src = "assets/img/bird2.png";

// let currentBirdImg = birdImg1; // Gambar burung saat ini

// let birdAnimationCounter = 0;
// let birdAnimationInterval = 10; // Interval perubahan gambar burung

// let cloudObstacleWidth = 100;
// let cloudObstacleHeight = 40;

// let cloudObstacles = [];

// let cloudObstacleImg = new Image();
// cloudObstacleImg.src = "assets/img/cloud.png";


// Game Setting
let velocityX = -8;
let velocityY = 0;
let gravity = .4;

// Game Over
let gameOver = false;
let gameOverImg = new Image();
gameOverImg.src = "assets/img/game-over.png";
let gameOverX = (gameBoardWidth - gameOverImg.width) / 2;
let gameOverY = (gameBoardHeight - gameOverImg.height) / 2;

// Reset
let resetImg = new Image();
resetImg.src = "assets/img/reset.png";
let resetX = (gameBoardWidth - resetImg.width) / 2;
let resetY = (gameBoardHeight - resetImg.height) / 1.5 + 25;

// Score
let score = 0;
let highScore = 0;
if (score > highScore) {
    highScore = score;
}



window.onload = function() {
    gameBoard = document.getElementById("gameBoard");
    gameBoard.height = gameBoardHeight;
    gameBoard.width = gameBoardWidth;

    // Draw on the Game Board
    gameContext = gameBoard.getContext("2d"); 

    trexImg = new Image();
    trexImg.src = "assets/img/dino.png";
    trexImg.onload = function () {
        gameContext.drawImage(trexImg, trex.x, trex.y, trex.width, trex.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = "assets/img/cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "assets/img/cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "assets/img/cactus3.png";

    requestAnimationFrame(update);
    setInterval(placeCactus, 1000); //1000 ms = 1 s
    document.addEventListener("keydown", moveTrex);
    document.addEventListener("keyup", function(e) {
        if (e.code == "ArrowDown") {
            isDucking = false;
            
            // Kembali ke gambar Trex berdiri
            trexWidth = trexStandingWidth;
            trexHeight = trexStandingHeight;
    
            // Kembalikan posisi dinosaurus ke posisi normal
            trex.y = gameBoardHeight - trexHeight;
        }
    }); 
    
     // Cek apakah ada skor tertinggi dalam penyimpanan lokal
     if (localStorage.getItem("highScore")) {
        highScore = parseInt(localStorage.getItem("highScore"));
    }
    

}

function moveTrex(e) {
    let jumpSound = document.getElementById("jumpSound");

    if (gameOver) {
        
        if (e.code == "Space" || e.code == "ArrowUp") {
            location.reload();
        } else {
            return;
        }
    }

    if (e.code == "ArrowDown") {
        isDucking = true;
        isDuckingAnimation = true;
        velocityX = -10;
        
        // Perbarui ukuran dinosaurus saat menunduk
        trexWidth = trexDuckingWidth;
        trexHeight = trexDuckingHeight;

        // Turunkan posisi dinosaurus hanya saat menunduk
        if (!isDucking) {
            trex.y = gameBoardHeight - trexHeight;
        }
    } else if ((e.code == "Space" || e.code == "ArrowUp") && trex.y == trexY) {
        // Jump
        isDucking = false;
        velocityY = -10;

        // Kembali ke ukuran asli saat berlari
        trexWidth = trexStandingWidth;
        trexHeight = trexStandingHeight;

        // Mainkan suara lompatan
        jumpSound.play();
    }

}

function update() {
    requestAnimationFrame(update);

    if (gameOver) {
        // Setelah game over
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
        // Mainkan suara game over
        let gameOverSound = document.getElementById("gameOverSound");
        gameOverSound.play();

        gameContext.drawImage(gameOverImg, gameOverX, gameOverY);
        gameContext.drawImage(resetImg, resetX, resetY);
        return;
    }

    gameContext.clearRect(0, 0, gameBoard.width, gameBoard.height);

     // Gambar elemen track di bawah dinosaurus
     gameContext.drawImage(trackImg, 0, gameBoard.height - trexHeight, gameBoard.width, trexHeight);

    // T-Rex
    velocityY += gravity;
    trex.y = Math.min(trex.y + velocityY, trexY);

    // Periksa apakah waktunya untuk mengubah frame
    let currentTime = Date.now();
    if (currentTime - lastFrameChangeTime >= frameChangeInterval) {
        // Ganti frame berdasarkan animasi yang aktif
        if (isDucking) {
            if (isDuckingAnimation) {
                trexImg.src = trexDuckingFrames[trexDuckingFrameIndex];
                trexDuckingFrameIndex = (trexDuckingFrameIndex + 1) % trexDuckingFrames.length;

                if (trexDuckingFrameIndex === 0) {
                    isDuckingAnimation = false;
                }
            }
        } else {
            trexImg.src = trexRunningFrames[trexRunningFrameIndex];
            trexRunningFrameIndex = (trexRunningFrameIndex + 1) % trexRunningFrames.length;
        }
        
        lastFrameChangeTime = currentTime;
    }

    gameContext.drawImage(trexImg, trex.x, trex.y, trexWidth, trexHeight);

    // Cactus
    for (let i = 0; i < cacti.length; i++) {
        let cactus = cacti[i]
        cactus.x += velocityX;
        gameContext.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        if (detectCollision(trex, cactus)) {
            gameOver = true;
            if (isDucking) {
                gameContext.clearRect(trex.x, trex.y, trex.width, trex.height);
            }
            trexImg.src = "assets/img/dino-dead.png";
            trexImg.onload = function() {
                gameContext.drawImage(trexImg, trex.x, trex.y, trex.width, trex.height);
            }
        }
        
    }

    // Score
    gameContext.fillStyle = "black";
    gameContext.font = "20px courier";
    score++;
    gameContext.fillText(`Score: ${score}`, 5, 20);
    gameContext.fillText(`High Score: ${highScore}`, 5, 40); // Tampilkan skor tertinggi


}

function placeCactus() {
    if (gameOver) {
        return;
    }

    // Place Cactus
    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height : cactusHeight
    }

    // Randowm between 0 - 0.9999
    let placeCactusChance = Math.random(); 

    
    if (placeCactusChance > .90) { // 10% get cactus3
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cacti.push(cactus);
    } else if (placeCactusChance > .70) { // 30% get cactus2
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cacti.push(cactus);
    } else if (placeCactusChance > .50) { // 50% get cactus1
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cacti.push(cactus);
    }

    if (cacti.length > 5) {
        cacti.shift(); // remove the first element from array so that array doesn't contantly grow
    }
}

// function placeBirdObstacle() {
//     let birdObstacle = {
//         img: birdObstacleImg,
//         x: gameBoardWidth,
//         y: gameBoardHeight - trexHeight - birdObstacleHeight - Math.random() * 50, // Randomize the bird's height
//         width: birdObstacleWidth,
//         height: birdObstacleHeight,
//     };
//     birdObstacles.push(birdObstacle);

//     if (birdObstacles.length > 5) {
//         birdObstacles.shift();
//     }
// }

// function placeCloudObstacle() {
//     let cloudObstacle = {
//         img: cloudObstacleImg,
//         x: gameBoardWidth,
//         y: Math.random() * 50, // Randomize the cloud's height
//         width: cloudObstacleWidth,
//         height: cloudObstacleHeight,
//     };
//     cloudObstacles.push(cloudObstacle);

//     if (cloudObstacles.length > 5) {
//         cloudObstacles.shift();
//     }
// }


function detectCollision(a, b) {
    return a.x <= b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width >= b.x &&   //a's top right corner passes b's top left corner
           a.y <= b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height >= b.y;    //a's bottom left corner passes b's top left corner
}