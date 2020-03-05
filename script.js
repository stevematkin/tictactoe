const player = (name, symbol) => {
    const getName = () => name;    
    return {getName, symbol};
}

let board = [0,1,2,3,4,5,6,7,8];

//create board and start the game
const gameBoard = (() => {
    board = [0,1,2,3,4,5,6,7,8];
    
    let container = document.querySelector('.container');
    let boardContainer = document.createElement('div');
    boardContainer.classList.add('board');    

    for (let i = 0; i < board.length; i++) {
        let boardGrid = document.createElement('div');
        boardGrid.classList.add('board-grid', `board-${i}`);
        
        
        let gridContent = document.createElement('div');
        gridContent.classList.add('grid-content');
        

        let marker = document.createElement('div');
        marker.classList.add('marker');        

        container.appendChild(boardContainer);
        boardContainer.appendChild(boardGrid);
        boardGrid.appendChild(gridContent);
        gridContent.appendChild(marker);

    }   
       
    let textDisplay = document.createElement('div');
    textDisplay.classList.add('text-display');
    textDisplay.textContent = "Player One's turn!";
    container.appendChild(textDisplay);
    

    let playerOne = player('Player One', 'X');
    let playerTwo = player('Player Two', 'O');
    let playerTurn = playerOne;
    

    let markerCell = document.getElementsByClassName('marker');
    //console.log(markerCell);
    for (let i = 0; i < markerCell.length; i++) {        
        markerCell[i].addEventListener('click', function turn(e) {
            //console.log(e.target);
            
            if (textDisplay.textContent.includes('wins') || textDisplay.textContent.includes('draw') || e.target.textContent) {
                return markerCell[i].removeEventListener('click', turn);                
            }
            else if (playerTurn == playerOne && !e.target.textContent) {
                textDisplay.textContent = "Player Two's turn!";
                board[i] = playerOne.symbol;
                e.target.textContent = playerOne.symbol;
                e.target.style.color = 'red';
                playerTurn = playerTwo;
                console.log(board);
                gameLogic.endGame(playerOne);
            }
            else if (playerTurn == playerTwo && !e.target.textContent) {
                textDisplay.textContent = "Player One's turn!";
                board[i] = playerTwo.symbol;
                e.target.textContent = playerTwo.symbol;
                e.target.style.color = 'blue';
                playerTurn = playerOne;
                console.log(board);
                gameLogic.endGame(playerTwo);
            }
        });
    }
    
    let resetBoard = document.querySelector('.reset-button');
    resetBoard.addEventListener('click', function reset(e) {
        console.log('reset clicked');
        playerTurn = playerOne;
        textDisplay.textContent = "Player One's turn!";
        board = [0,1,2,3,4,5,6,7,8];        
        console.log(board);
        for (let i = 0; i < markerCell.length; i++) {
            markerCell[i].textContent = '';
            markerCell[i].style.backgroundColor = 'transparent';
        }
    });
    
    return {playerOne, playerTwo, textDisplay};

})();


//determine win or draw
const gameLogic = (() => {    
    
    const endGame = (player) => {

        const checkDraw = () => {
            let draw = false;
            for (let i = 0; i < board.length; i++) {
                if (typeof board[i] == 'number') {
                    draw = true;
                }
            }
            return draw;
        };

        const cells = document.getElementsByClassName('marker');
        
        
        const winBackground = (a, b ,c) => {
            cells[a].style.backgroundColor = 'lightgreen';
            cells[b].style.backgroundColor = 'lightgreen';
            cells[c].style.backgroundColor = 'lightgreen';
        }
        

        if (board[0] === player.symbol && board[1] === player.symbol && board[2] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
            winBackground(0, 1, 2);           
            
        }
        else if (board[3] === player.symbol && board[4] === player.symbol && board[5] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
            winBackground(3, 4, 5);
        }
        else if (board[6] === player.symbol && board[7] === player.symbol && board[8] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
            winBackground(6, 7, 8);
        }
        else if (board[0] === player.symbol && board[3] === player.symbol && board[6] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
            winBackground(0, 3, 6);
        }
        else if (board[1] === player.symbol && board[4] === player.symbol && board[7] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
            winBackground(1, 4, 7);
        }
        else if (board[2] === player.symbol && board[5] === player.symbol && board[8] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
            winBackground(2, 5, 8);
        }
        else if (board[0] === player.symbol && board[4] === player.symbol && board[8] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
            winBackground(0, 4, 8);
        }
        else if (board[2] === player.symbol && board[4] === player.symbol && board[6] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
            winBackground(2, 4, 6);
        }
        else if (checkDraw() == false) {
            gameBoard.textDisplay.textContent = "It's a draw!";
            for (let i = 0; i < cells.length; i++) {
                cells[i].style.backgroundColor = 'lightgreen';
            }
        }
    }
    
    
    
    return {endGame};    

})();

