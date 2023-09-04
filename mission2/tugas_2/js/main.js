// Class untuk mengelola papan permainan
class GameBoard {
    constructor() {
      this.width = 750; // Lebar papan permainan
      this.height = 250; // Tinggi papan permainan
      this.canvas = document.getElementById("gameBoard"); // Mendapatkan elemen canvas dari HTML
      this.canvas.height = this.height;
      this.canvas.width = this.width;
      this.context = this.canvas.getContext("2d"); // Mendapatkan konteks gambar 2D
    }
  
    clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Menghapus konten canvas
    }
  }
  
  // Class untuk Trex (karakter pemain)
  class Trex {
    constructor(gameBoard) {
      this.width = 88; // Lebar Trex
      this.height = 94; // Tinggi Trex
      this.x = 50; // Koordinat X awal Trex
      this.y = gameBoard.height - this.height; // Koordinat Y awal Trex
      this.img = new Image();
      this.img.src = "assets/img/dino.png"; // Gambar Trex
    }
  
    draw(gameContext) {
      gameContext.drawImage(this.img, this.x, this.y, this.width, this.height); // Menggambar Trex pada canvas
    }
  }
  
  // Class untuk kaktus
  class Cactus {
    constructor(gameBoard, img, width, height, x, y) {
      this.img = new Image();
      this.img.src = img; // Gambar kaktus
      this.width = width; // Lebar kaktus
      this.height = height; // Tinggi kaktus
      this.x = x; // Koordinat X kaktus
      this.y = y; // Koordinat Y kaktus
    }
  
    move(velocityX) {
      this.x += velocityX; // Menggerakkan kaktus ke kiri dengan kecepatan tertentu
    }
  
    draw(gameContext) {
      gameContext.drawImage(this.img, this.x, this.y, this.width, this.height); // Menggambar kaktus pada canvas
    }
  }
  
  // Class untuk pengaturan permainan
  class GameSettings {
    constructor() {
      this.velocityX = -8; // Kecepatan horizontal permainan
      this.velocityY = 0; // Kecepatan vertikal permainan
      this.gravity = 0.4; // Gravitasi permainan
    }
  }
  
  // Class utama untuk permainan
  class Game {
    constructor() {
      this.gameBoard = new GameBoard();
      this.trex = new Trex(this.gameBoard);
      this.cacti = [];
      this.gameSettings = new GameSettings();
      this.gameOver = false;
      this.score = 0;
  
      // Memuat gambar-gambar
      this.gameOverImg = new Image();
      this.gameOverImg.src = "assets/img/game-over.png";
      this.resetImg = new Image();
      this.resetImg.src = "assets/img/reset.png";
  
      // Mendengarkan peristiwa keyboard
      document.addEventListener("keydown", (e) => this.moveTrex(e));
      document.addEventListener("keyup", (e) => this.releaseKey(e));
  
      requestAnimationFrame(() => this.update());
      setInterval(() => this.placeCactus(), 1000);
    }
  
    moveTrex(e) {
      // Menangani pergerakan Trex
      if (gameOver) {
        if (e.code == "Space" || e.code == "ArrowUp") {
            location.reload();
        } else {
            return;
        }
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && trex.y == trexY) {
        // Jump
        isDucking = false;
        velocityY = -10;
        trexImg.src = "assets/img/dino.png";
        trexImg.onload = function () {
            gameContext.drawImage(trexImg, trex.x, trex.y, trex.width, trex.height);
        }
    } else if (e.code == "ArrowDown") {
        isDucking = true;
        velocityX = -10;
        trexImg.src = "assets/img/dino-duck1.png";
        trexImg.onload = function() {
            gameContext.drawImage(trexImg, trex.x, trex.y, trex.width, trex.height);
        }
    }
    }
  
    releaseKey(e) {
      // Menangani pelepasan tombol
      document.addEventListener("keyup", function(e) {
        if (e.code == "ArrowDown") {
            isDucking = false;
            // Kembali ke gambar Trex berdiri
            trexImg.src = "assets/img/dino.png";
            trexImg.onload = function() {
                gameContext.drawImage(trexImg, trex.x, trex.y, trex.width, trex.height);
            }
        }
    });
    }
  
    update() {
      // Memperbarui status permainan
    requestAnimationFrame(update);

    if (gameOver) {
        gameContext.drawImage(gameOverImg, gameOverX, gameOverY);
        gameContext.drawImage(resetImg, resetX, resetY);
        return;
    }

    gameContext.clearRect(0, 0, gameBoard.width, gameBoard.height);

    //  T-Rex
    velocityY += gravity;
    trex.y = Math.min(trex.y + velocityY, trexY); //Apply gravity to current trex.y, making sure it doens't exceed the ground
    gameContext.drawImage(trexImg, trex.x, trex.y, trex.width, trex.height);

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
    gameContext.fillText(score, 5, 20);
    }
  
    placeCactus() {
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
  
    detectCollision(a, b) {
      // Mendeteksi tabrakan antara objek a dan b
      return a.x <= b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width >= b.x &&   //a's top right corner passes b's top left corner
           a.y <= b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height >= b.y;    //a's bottom left corner passes b's top left corner
    }
  }
  
  // Ketika halaman telah dimuat sepenuhnya, buat objek permainan
  window.onload = function () {
    const game = new Game();
  };
  