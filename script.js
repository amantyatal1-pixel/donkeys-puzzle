let imageURL = "";

let size = 12;

let tiles = [];

let selectedTile = null;

let moves = 0;

let seconds = 0;

let timer = null;

let playing = false;


const imageInput =
    document.getElementById("imageInput");

const difficulty =
    document.getElementById("difficulty");

const startBtn =
    document.getElementById("startBtn");

const doneBtn =
    document.getElementById("doneBtn");

const tryBtn =
    document.getElementById("tryBtn");

const puzzle =
    document.getElementById("puzzle");

const message =
    document.getElementById("message");

const timeText =
    document.getElementById("time");

const movesText =
    document.getElementById("moves");

const sizeText =
    document.getElementById("sizeText");

const celebration =
    document.getElementById("celebration");

const playAgainBtn =
    document.getElementById("playAgainBtn");

const donkeyContainer =
    document.getElementById("donkeyContainer");

const confetti =
    document.getElementById("confetti");


/* IMAGE */

imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    if (!file) return;

    imageURL =
        URL.createObjectURL(file);

    message.textContent =
        "Image selected! Press START.";

});


/* DIFFICULTY */

difficulty.addEventListener("change", function () {

    size =
        Number(difficulty.value);

    sizeText.textContent =
        size + " × " + size;

});


/* START */

startBtn.addEventListener(
    "click",
    startGame
);


/* TRY AGAIN */

tryBtn.addEventListener(
    "click",
    function () {

        if (imageURL === "") {

            message.textContent =
                "Please choose an image first.";

            return;
        }

        startGame();

    }
);


/* DONE */

doneBtn.addEventListener(
    "click",
    checkDone
);


/* PLAY AGAIN */

playAgainBtn.addEventListener(
    "click",
    function () {

        hideCelebration();

        startGame();

    }
);


/* START GAME */

function startGame() {

    if (imageURL === "") {

        message.textContent =
            "⚠️ Please choose an image first.";

        return;
    }


    clearInterval(timer);


    size =
        Number(difficulty.value);


    moves = 0;

    seconds = 0;

    selectedTile = null;

    playing = true;


    timeText.textContent =
        "00:00";

    movesText.textContent =
        "0";

    sizeText.textContent =
        size + " × " + size;


    message.textContent =
        "Arrange the puzzle pieces!";


    createTiles();

    shuffleTiles();

    drawPuzzle();

    startTimer();

}


/* CREATE */

function createTiles() {

    tiles = [];

    const total =
        size * size;


    for (
        let i = 0;
        i < total;
        i++
    ) {

        tiles.push(i);

    }

}


/* SHUFFLE */

function shuffleTiles() {

    for (
        let i = tiles.length - 1;
        i > 0;
        i--
    ) {

        const random =
            Math.floor(
                Math.random() * (i + 1)
            );


        const temp =
            tiles[i];

        tiles[i] =
            tiles[random];

        tiles[random] =
            temp;

    }


    if (isSolved()) {

        shuffleTiles();

    }

}


/* DRAW */

function drawPuzzle() {

    puzzle.innerHTML = "";

    puzzle.style.gridTemplateColumns =
        "repeat(" + size + ", 1fr)";


    for (
        let position = 0;
        position < tiles.length;
        position++
    ) {

        const tile =
            document.createElement("div");


        tile.className =
            "tile";


        const number =
            tiles[position];


        const row =
            Math.floor(number / size);


        const column =
            number % size;


        let x = 0;

        let y = 0;


        if (size > 1) {

            x =
                column * 100 / (size - 1);

            y =
                row * 100 / (size - 1);

        }


        tile.style.backgroundImage =
            "url('" + imageURL + "')";


        tile.style.backgroundSize =
            size * 100 + "% " +
            size * 100 + "%";


        tile.style.backgroundPosition =
            x + "% " + y + "%";


        tile.addEventListener(
            "click",
            function () {

                selectTile(position);

            }
        );


        tile.addEventListener(
            "touchend",
            function (event) {

                event.preventDefault();

                selectTile(position);

            },
            { passive: false }
        );


        puzzle.appendChild(tile);

    }

}


/* SELECT */

function selectTile(position) {

    if (!playing) return;


    if (selectedTile === null) {

        selectedTile =
            position;


        puzzle.children[position]
            .classList.add("selected");

        return;

    }


    if (selectedTile === position) {

        puzzle.children[position]
            .classList.remove("selected");

        selectedTile = null;

        return;

    }


    swapTiles(
        selectedTile,
        position
    );


    moves++;

    movesText.textContent =
        moves;


    selectedTile = null;


    drawPuzzle();

}


/* SWAP */

function swapTiles(a, b) {

    const temp =
        tiles[a];

    tiles[a] =
        tiles[b];

    tiles[b] =
        temp;

}


/* DONE */

function checkDone() {

    if (!playing) {

        message.textContent =
            "Start the puzzle first!";

        return;

    }


    if (isSolved()) {

        playing = false;

        clearInterval(timer);

        message.textContent =
            "🎉 PUZZLE COMPLETED!";


        startCelebration();

    }

    else {

        message.textContent =
            "❌ NOT SOLVED, DONKEYS! 😂 TRY AGAIN!";

    }

}


/* CHECK SOLVED */

function isSolved() {

    for (
        let i = 0;
        i < tiles.length;
        i++
    ) {

        if (tiles[i] !== i) {

            return false;

        }

    }

    return true;

}


/* TIMER */

function startTimer() {

    timer =
        setInterval(
            function () {

                if (!playing) return;

                seconds++;

                updateTime();

            },
            1000
        );

}


function updateTime() {

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        seconds % 60;


    timeText.textContent =
        String(minutes).padStart(2, "0")
        + ":"
        + String(secs).padStart(2, "0");

}


/* =================================
   FULL CELEBRATION
================================= */

function startCelebration() {

    celebration.classList.add("show");


    createConfetti();


    createDonkeys();


    /*
       More donkeys appear
       during celebration.
    */

    setTimeout(createDonkeys, 500);

    setTimeout(createDonkeys, 1000);

    setTimeout(createDonkeys, 1500);

    setTimeout(createDonkeys, 2000);

}


/* DONKEY POPUPS */

function createDonkeys() {

    const emojis = [
        "🫏",
        "🫏",
        "🫏",
        "🥳",
        "😂",
        "🫏"
    ];


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const donkey =
            document.createElement("div");


        donkey.className =
            "donkey-popup";


        donkey.textContent =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        donkey.style.left =
            Math.random() * 90 + "vw";


        donkey.style.top =
            Math.random() * 80 + "vh";


        donkey.style.setProperty(
            "--moveX",
            (Math.random() * 500 - 250) + "px"
        );


        donkey.style.setProperty(
            "--moveY",
            (-300 - Math.random() * 400) + "px"
        );


        donkeyContainer.appendChild(donkey);


        setTimeout(
            function () {

                donkey.remove();

            },
            3000
        );

    }

}


/* CONFETTI */

function createConfetti() {

    confetti.innerHTML = "";


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.className =
            "confetti-piece";


        piece.style.left =
            Math.random() * 100 + "vw";


        piece.style.animationDelay =
            Math.random() * 2 + "s";


        piece.style.transform =
            "rotate(" +
            Math.random() * 360 +
            "deg)";


        piece.style.backgroundColor =
            randomColor();


        confetti.appendChild(piece);

    }

}


/* RANDOM CONFETTI COLOUR */

function randomColor() {

    const colors = [
        "#ff5252",
        "#ffd740",
        "#69f0ae",
        "#40c4ff",
        "#e040fb",
        "#ffffff"
    ];


    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];

}


/* HIDE CELEBRATION */

function hideCelebration() {

    celebration.classList.remove("show");

    donkeyContainer.innerHTML = "";

    confetti.innerHTML = "";

}