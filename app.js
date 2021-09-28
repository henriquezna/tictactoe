const container = document.getElementById("gameContainer");
const playerLabel = document.getElementById("player");

const gameBoard = () => {
    let board = ["--", "--", "--", "--", "--", "--", "--", "--", "--"];
    const changeBoard = (index, sign) => {
        board[index] = sign;
    }
    const resetBoard = () => {
        board = ["--", "--", "--", "--", "--", "--", "--", "--", "--"];
    }
    const getBoard = () => {
        return board
    }
    return {changeBoard, resetBoard, getBoard};
};

const playerName = (n) => {
    const name = n;
    const getName = () => {
        return name;
    }
    return {getName};
}

const displayController = () => {
    const updateGame = (currentBoard) => {
        //remove previous display state
        for(let i = 0; i<9; i++){
            let box = document.getElementById(i);
            if(box !== null){
                box.remove();
            }
        }

        //add current display state
        for(let i = 0; i<9; i++){
            const newButton = document.createElement("button");
            newButton.innerText = currentBoard[i];
            newButton.setAttribute("id", i);
            newButton.addEventListener("click", function(){change(i);}, false);
            container.appendChild(newButton);
        }
    }
    return{updateGame}
};

const gameLoop = () => {
    let turn = 0;
    const nextTurn = () => {
        if(turn < 9){
            if(playerLabel.innerText === playerOne.getName()){
                playerLabel.innerText = playerTwo.getName();
            }else{
                playerLabel.innerText = playerOne.getName();
            }
            turn++;
        }
        if(turn === 9){
            playerLabel.innerText = "Scratch";
        }
    }
    const resetTurn = () => {
        turn = 0;
    }
    return{nextTurn, resetTurn};
};

const gameBoardState = gameBoard();
const disp = displayController();
const loop = gameLoop();

change = (index) => {
    if(playerLabel.innerText === playerOne.getName()){
        gameBoardState.changeBoard(index, "X");
    }else{
        gameBoardState.changeBoard(index, "O");
    }
    loop.nextTurn();
    disp.updateGame(gameBoardState.getBoard());
    if(win()){
        if(playerLabel.innerText === playerOne.getName()){
            playerLabel.innerText = playerTwo.getName() + " WINS";
        }else{
            playerLabel.innerText = playerOne.getName() + " WINS";
        }
    }
}

win = function(){
    const gameState = gameBoardState.getBoard();
    let isWin = false;
    if(gameState[0] !== "--" && gameState[0] === gameState[1] && gameState[1] === gameState[2]){
        isWin = true;
    }else if(gameState[3] !== "--" && gameState[3] === gameState[4] && gameState[4] === gameState[5]){
        isWin = true;
    }else if(gameState[6] !== "--" && gameState[6] === gameState[7] && gameState[7] === gameState[8]){
        isWin = true;
    }else if(gameState[0] !== "--" && gameState[0] === gameState[3] && gameState[3] === gameState[6]){
        isWin = true;
    }else if(gameState[1] !== "--" && gameState[1] === gameState[4] && gameState[4] === gameState[7]){
        isWin = true;
    }else if(gameState[2] !== "--" && gameState[2] === gameState[5] && gameState[5] === gameState[8]){
        isWin = true;
    }else if(gameState[0] !== "--" && gameState[0] === gameState[4] && gameState[4] === gameState[8]){
        isWin = true;
    }else if(gameState[2] !== "--" && gameState[2] === gameState[4] && gameState[4] === gameState[6]){
        isWin = true;
    }
    return isWin;
}

restartGame = function(){
    gameBoardState.resetBoard();
    disp.updateGame(gameBoardState.getBoard());
    loop.resetTurn();
}

//Start
let pOne = window.prompt("Name");
let pTwo = window.prompt("Name");
playerOne = playerName(pOne);
playerTwo = playerName(pTwo);

player.innerText = playerOne.getName();
disp.updateGame(gameBoardState.getBoard());