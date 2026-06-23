/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')

const messageEl = document.querySelector('#message')

const boardElements = document.querySelector('#board')

const resetBtnEl = document.querySelector('#reset-btn')

console.log(squareEls)
console.log(messageEl)
console.log(boardElements)

/*-------------------------------- Constants --------------------------------*/

const board = [
    '', '', '',
    '', '', '',
    '', '', '']

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]
 
/*---------------------------- Variables (state) ----------------------------*/

let turn = 'X'
let winner = false
let tie = false

/*-------------------------------- Functions --------------------------------*/

function render(){
    updateBoard()
    updateMessage()
}

function updateBoard(){
    // loop through the board variable using forEach
    board.forEach((Cell, index) =>{
        squareEls[index].textContent = Cell;
    }) 
}

function updateMessage(){
    if(!winner && !tie) {
        messageEl.textContent = `Current turn: ${turn}`
    }
    else if(!winner && tie){
        messageEl.textContent = `Tie`   
    }
    else{
        messageEl.textContent = `${turn} is win`
    }
}

function handleClick(event){
    const squareIndex = event.target.id
    
    if (board[squareIndex] === "X" || board[squareIndex] === 'O') return

    if (winner) return

    placePice(squareIndex)
    checkForWinner()
    checkForTie()
    playerTurn()
    render()

    console.log(event.target.id)
    console.log(board)
    console.log(turn)
    console.log(winner)
    console.log(tie)
}

function placePice(index){
    board[index] = turn
}

function checkForWinner(){
    winningCombos.forEach(combo =>{
        const A = board[combo[0]]
        const B = board[combo[1]]
        const C = board[combo[2]]

        if(A !== "" && A === B && A === C){
            winner = true
        }
    })
}

function checkForTie(){
    if (winner) return

    if(board.includes('')){
        return
    }
    else{
        tie = true
    }
}

function playerTurn(){
    if(winner) return

    if(!winner){
        if(turn === 'X'){turn = 'O'}
        else if(turn === 'O'){turn = 'X'}
    }
}

function init(){
    console.log('Game reset')
    
    board.forEach((cell, index)=>{
        board[index] = ""
    })

    turn = 'X'
    winner = false
    tie = false

    render()
}

/*----------------------------- Event Listeners -----------------------------*/


squareEls.forEach(oneSquare =>{
    oneSquare.addEventListener('click', handleClick)
})

resetBtnEl.addEventListener('click', init)