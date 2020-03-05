const player = (name, symbol) => {
    const getName = () => name;
    
    return {getName, symbol};
}

let board = [0,1,2,3,4,5,6,7,8];


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
    textDisplay.textContent = "player one's turn";
    container.appendChild(textDisplay);

    let playerOne = player('steve', 'X');
    let playerTwo = player('bob', 'O');
    let playerTurn = playerOne;

    let markerListen = document.getElementsByClassName('marker');
    //console.log(markerListen);
    for (let i = 0; i < markerListen.length; i++) {
        //markerListen[i].textContent = '';
        markerListen[i].addEventListener('click', function turn(e) {
            //console.log(e.target);
            
            if (textDisplay.textContent.includes('wins') || textDisplay.textContent.includes('draw') || e.target.textContent) {
                return markerListen[i].removeEventListener('click', turn);
                
            }
            else if (playerTurn == playerOne && !e.target.textContent) {
                textDisplay.textContent = "player two's turn";
                board[i] = playerOne.symbol;
                e.target.textContent = playerOne.symbol;
                playerTurn = playerTwo;
                console.log(board);
                gameLogic.endGame(playerOne);
            }
            else if (playerTurn == playerTwo && !e.target.textContent) {
                textDisplay.textContent = "player one's turn";
                board[i] = playerTwo.symbol;
                e.target.textContent = playerTwo.symbol;
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
        textDisplay.textContent = "player one's turn";
        board = [0,1,2,3,4,5,6,7,8];
        console.log(board);
        for (let i = 0; i < markerListen.length; i++) {
            markerListen[i].textContent = '';
        }
    });
    
    return {resetBoard, playerOne, playerTwo, textDisplay, markerListen};

})();

//game logic, who goes first, who wins, tie etc

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
        

        if (board[0] === player.symbol && board[1] === player.symbol && board[2] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;           
            
        }
        else if (board[3] === player.symbol && board[4] === player.symbol && board[5] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
        }
        else if (board[6] === player.symbol && board[7] === player.symbol && board[8] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
        }
        else if (board[0] === player.symbol && board[3] === player.symbol && board[6] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
        }
        else if (board[1] === player.symbol && board[4] === player.symbol && board[7] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
        }
        else if (board[2] === player.symbol && board[5] === player.symbol && board[8] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
        }
        else if (board[0] === player.symbol && board[4] === player.symbol && board[8] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
        }
        else if (board[2] === player.symbol && board[4] === player.symbol && board[6] === player.symbol) {
            gameBoard.textDisplay.textContent = `${player.getName()} wins!!`;
        }
        else if (checkDraw() == false) {
            gameBoard.textDisplay.textContent = "It's a draw!";
        }
    }
    
    

    return {endGame};    

})();
