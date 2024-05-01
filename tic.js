


const gameBoard = (function() {
    const gameArray = ['','','','','','','','',''];
    return {gameArray};
})();


function createPlayer(marker, playerName){
    const symbol = marker;
    const name = playerName;
    return {name, symbol};
}


function playGame() {
    const nuBoard = gameBoard;
    const grid = document.querySelectorAll('.cell');
    const message = document.querySelector('.header');


        
    const player1 = createPlayer('X', 'Player 1');
    const player2 = createPlayer('O','Player 2');
    let currentPlayer = 1;
    const gridArray = Array.from(grid);


    const takeTurns = (node) => {
    
            if(currentPlayer > 0){
                markSpot(player1, gridArray.indexOf(node));
            } else {
                markSpot(player2, gridArray.indexOf(node));
            }
            currentPlayer *= -1;

    };


    gridArray.forEach( (node) => {
        node.addEventListener('click', () => takeTurns(node), {once: true});
    });


    const markSpot = (player,spot) => {
        nuBoard.gameArray[spot] = player.symbol;
        gridArray[spot].textContent = nuBoard.gameArray[spot];
        console.log(playerWins(player).win);
        if(playerWins(player).win){
            message.textContent = `${player.name} wins!!!`;
            gridArray.forEach( (node) => {
                console.log(node);
                node.removeEventListener('click', () => takeTurns(node), {once: true});
            });
        }
        return nuBoard.gameArray;
    };


    const playerWins = (player) => {

        let count = 0;
        let win = false;
        for(let i=0; i<9; i++) {
            if(nuBoard.gameArray[i] == player.symbol) count++;
        }
        console.log(`count is ${count}`);
  
        if(count >= 3){
            console.log("count is eq or greater than 3");
            if(nuBoard.gameArray[4] == player.symbol){
                if(nuBoard.gameArray[3] == player.symbol && nuBoard.gameArray[5] == player.symbol) win = true;
                if(nuBoard.gameArray[0] == player.symbol && nuBoard.gameArray[8] == player.symbol) win = true;
                if(nuBoard.gameArray[2] == player.symbol && nuBoard.gameArray[6] == player.symbol) win = true;
                if(nuBoard.gameArray[1] == player.symbol && nuBoard.gameArray[7] == player.symbol) win = true;
                
            }
            if(nuBoard.gameArray[0] == player.symbol){
                if(nuBoard.gameArray[1] == player.symbol && nuBoard.gameArray[2] == player.symbol) win = true;
                if(nuBoard.gameArray[3] == player.symbol && nuBoard.gameArray[6] == player.symbol) win = true;

            } 
            if(nuBoard.gameArray[8] == player.symbol){
                if(nuBoard.gameArray[6] == player.symbol && nuBoard.gameArray[7] == player.symbol) win = true;
                if(nuBoard.gameArray[2] == player.symbol && nuBoard.gameArray[5] == player.symbol) win = true;
            } 
   
        };

        return {win};
    }

    return {nuBoard, markSpot, playerWins};
}

const newGame = playGame();

