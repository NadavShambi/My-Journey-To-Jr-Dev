'use strict'

var boardSize
var gNums
var gBoard
var interval

function onInit() {
    gNums = createNumPool(boardSize)
    gBoard = createBoard(boardSize)
    renderBoard(gBoard)
}

function onMode(mode) {
    var loader = document.querySelector('.start-screen')
    boardSize = mode.dataset.r
    if (boardSize) loader.style.display = 'none'
    onInit()
    onRestart()
}

function renderBoard(board) {
    var elTable = document.querySelector('.game-table')
    var strHTML = '<table><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {
            strHTML += `<td class="cell hoverable"
            onclick="onCellClicked(this)">${gBoard[i][j]}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    elTable.innerHTML = strHTML
}

function timer() {
    if (interval) return
    var seconds = 0
    var minutes = 0
    var secDisplay
    var minDisplay
    var timer = document.querySelector('.timer span')
    interval = setInterval(function () {
        seconds++
        if (seconds === 60) {
            seconds = 0
            minutes++
        } else if (seconds < 10) secDisplay = '0' + seconds
        else secDisplay = seconds

        if (minutes < 10) minDisplay = '0' + minutes
        else minDisplay = minutes
        timer.innerText = `${minDisplay}:${secDisplay}`
    }, 1000);
}

function onRestart() {
    clearInterval(interval)
    interval = null
    var endScreen = document.querySelector('.end-screen')
    var realTimer = document.querySelector('.timer span')
    var nextNum = document.querySelector('.counter span')
    nextNum.innerText = 1
    realTimer.innerText = '00:00'
    endScreen.style.display = 'none'
    onInit()
}

function onCellClicked(cell) {
    if (cell.classList.contains('hit')) return
    if (cell.classList.contains('fail')) return
    var nextNum = document.querySelector('.counter span')
    if (nextNum.innerText === '1') timer()
    if (nextNum.innerText === cell.innerText) {
        cell.classList.add('hit')
        cell.classList.remove('hoverable')
        nextNum.innerText = +nextNum.innerText + 1
    } else {
        cell.classList.toggle('fail')
        setTimeout(function () {
            cell.classList.toggle('fail')
        }, 1500)
    }
    if (+nextNum.innerText === boardSize ** 2 + 1) {
        var endScreen = document.querySelector('.end-screen')
        var endScreenTimer = document.querySelector('.end-screen h3 span')
        var realTimer = document.querySelector('.timer span')
        endScreenTimer.innerText = realTimer.innerText
        onInit()
        endScreen.style.display = 'flex'
        nextNum.innerText = 1
    }
}

function createNumPool(num) {
    var numPool = []
    for (let i = 1; i < num ** 2 + 1; i++) {
        numPool.push(i + '')
    }
    return numPool
}

function createBoard(num) {
    var board = []
    for (var i = 0; i < num; i++) {
        board[i] = []
        for (var j = 0; j < num; j++) {
            board[i][j] = drawNum(gNums)
        }
    }
    return board
}

function drawNum(array) {
    var idx = getRandomInt(0, array.length)
    var num = array[idx]
    array.splice(idx, 1)
    return num
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

