


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
    let nuBoard = gameBoard;
    const grid = document.querySelectorAll('.cell');
    const message = document.querySelector('.header');
    const abortController = new AbortController();
    const resetButton = document.querySelector('button');

        
    const player1 = createPlayer('X', 'Player 1');
    const player2 = createPlayer('O','Player 2');
    let currentPlayer = 1;
    let gridArray = Array.from(grid);

    resetButton.addEventListener('click', () => {
        nuBoard.gameArray = ['','','','','','','','',''];
        gridArray = Array.from(grid);
        gridArray.forEach( (node) => {
            node.textContent = '';
        })
        message.textContent = "Okay let's go again!";
        playerWins(player1).win = false;
        playerWins(player1).win = false;
        playGame();
    });
 

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
    };


    function markSpot(player, spot) {
        nuBoard.gameArray[spot] = player.symbol;
        gridArray[spot].textContent = player.symbol;
        console.log(playerWins(player).win);
        if (playerWins(player).win) {
            message.textContent = `${player.name} wins!!!`;
            gridArray.forEach((node) => {
                // console.log(node);
                // node.removeEventListener('click', takeTurns(node));
                abortController.abort();
            });
        }
        return nuBoard.gameArray;
    }


    function takeTurns(node) {
        const innerFunction = () => {
            if(currentPlayer > 0){
                markSpot(player1, gridArray.indexOf(node));
            } else {
                markSpot(player2, gridArray.indexOf(node));
            }
            currentPlayer *= -1;
        };

        return innerFunction;

    }

        gridArray.forEach( (node) => {
        node.addEventListener('click', takeTurns(node), {once: true, signal: abortController.signal});
        });

}

playGame();



