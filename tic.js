const gameBoard = (function() {
    const gameArray = ['','','','','','','','',''];
    const markSpot = (player,spot) => {
        gameArray[spot] = player;
        return gameArray;
    };
    const newBoard = () => {
        for(let i=0; i<9; i++){
            gameArray[i]='';
        };
        return gameArray;
    };
    return {gameArray, markSpot, newBoard};
})();


function createPlayer(marker){
    const symbol = marker;
    return {symbol};
}


function playGame() {
    const nuBoard = gameBoard;
    const player1 = createPlayer('x');
    const player2 = createPlayer('o');
    return {nuBoard, player1, player2};
}

// let newGame = playGame();
// newGame.markSpot(newgame.player1.symbol, )
