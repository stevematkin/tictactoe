const player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    return {getName, getMarker};
}

//create a game board
const gameBoard = (() => {
    let board = [0,1,2,3,4,5,6,7,8];
    //console.log(board);

    function displayBoard() {
        let container = document.querySelector('.container');
        let boardContainer = document.createElement('div');
        boardContainer.classList.add('board');
        let marker;

        for (let i = 0; i < board.length; i++) {
            let boardGrid = document.createElement('div');
            boardGrid.classList.add('board-grid', `board-${i}`);
            
            
            let gridContent = document.createElement('div');
            gridContent.classList.add('grid-content');
            

            marker = document.createElement('div');
            marker.classList.add('marker');
            

            container.appendChild(boardContainer);
            boardContainer.appendChild(boardGrid);
            boardGrid.appendChild(gridContent);
            gridContent.appendChild(marker);

        }
        
        // let markerListen = document.querySelectorAll('.marker');
        // markerListen.forEach(marker => {
        //     marker.addEventListener('click', e => {
        //         e.target.textContent = 'X';
        //         console.log(e);
        //     });
        // });
        //console.log(markerListen);
                
        let playerOne = player('steve', 'X');
        let playerTwo = player('bob', 'O');
        let playerTurn = playerOne;

        let markerListen = document.getElementsByClassName('marker');
        for (let i = 0; i < markerListen.length; i++) {
            markerListen[i].addEventListener('click', function turn(e) {
                if (playerTurn == playerOne) {
                    board[i] = playerOne.getMarker();
                    e.target.textContent = playerOne.getMarker();
                    playerTurn = playerTwo;
                    console.log(board);
                }
                else if (playerTurn == playerTwo) {
                    board[i] = playerTwo.getMarker();
                    e.target.textContent = playerTwo.getMarker();
                    playerTurn = playerOne;
                    console.log(board);
                }
            });
        }
        console.log(markerListen);
    }
    return {displayBoard};

})();

gameBoard.displayBoard();

//add two players seperate objects



//game logic, who goes first, who wins, tie etc

const gameLogic = (() => {
    
    

    let round = 0;



})();
