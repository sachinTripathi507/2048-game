let row = 4;
let col = 4;
let board;
let score = 0;

window.onload = function () {
    setgame();
    console.log("load");
}
// To set the initial layout of board
function setgame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updatetile(tile, num);
            document.getElementById("board").append(tile);
            // console.log(tile);
        }
    }
    setTwo();
    setTwo();

}
function resetgame() {

    window.location.reload();
}
// update board after interaction
function updatetile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());

        } else {
            tile.classList.add("x8192");
        }

    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideleft();
        terminate();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideright();
        terminate();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideup();
        terminate();
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        slidedown();
        terminate();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})
function filterzero(r1) {
    r1 = r1.filter(num => num != 0);
    return r1;
}
function slide(r1) {
    r1 = filterzero(r1);
    // console.log(r1.length);
    for (let i = 0; i < r1.length - 1; i++) {
        if (r1[i] == r1[i + 1]) {
            r1[i] *= 2;
            r1[i + 1] = 0;
            score += r1[i];
        }
    } //[4, 0, 2]
    r1 = filterzero(r1); //[4, 2]
    //add zeroes
    while (r1.length < col) {
        r1.push(0);
    } //[4, 2, 0, 0]
    return r1;
}
function slideleft() {
    for (let r = 0; r < row; r++) {
        let r1 = board[r];
        r1 = slide(r1);
        board[r] = r1;
        for (let c = 0; c < col; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updatetile(tile, num);

        }
    }
    // setTwo();
}
function slideright() {
    for (let r = 0; r < row; r++) {
        let r1 = board[r].reverse();
        r1 = slide(r1);
        board[r] = r1.reverse();
        for (let c = 0; c < col; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updatetile(tile, num);

        }
    }
    // setTwo();
}

function slideup() {
    for (let c = 0; c < col; c++) {
        let r1 = [board[0][c], board[1][c], board[2][c], board[3][c]];
        r1 = slide(r1);
        // board[0][r]=r1[0];
        // board[1][r]=r1[1];
        // board[2][r]=r1[2];
        // board[3][r]=r1[3];
        for (let r = 0; r < row; r++) {
            board[r][c] = r1[r]
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updatetile(tile, num);

        }
    }

}
function slidedown() {
    for (let c = 0; c < col; c++) {
        let r1 = [board[0][c], board[1][c], board[2][c], board[3][c]];
        r1.reverse();
        r1 = slide(r1);
        r1.reverse();
        // board[0][r]=r1[0];
        // board[1][r]=r1[1];
        // board[2][r]=r1[2];
        // board[3][r]=r1[3];
        for (let r = 0; r < row; r++) {
            board[r][c] = r1[r]
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updatetile(tile, num);

        }
    }
    // setTwo();
}
function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * row);
        let c = Math.floor(Math.random() * col);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() {
    // let count = 0;
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;

}
function terminate() {
    let value = hasEmptyTile();
    if (!value) {
        window.alert("GAME OVER");

    }
}