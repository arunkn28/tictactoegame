/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
	var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
	if(grid[colIdx][rowIdx]==0){
		if(turn==='X'){
		//let newValue = 1;
		grid[colIdx][rowIdx] = 1;
		turn = 'O';
		computerTurn();
		}else{
		grid[colIdx][rowIdx] = 2;	
		turn = 'X';
		}
		renderMainGrid();
		addClickHandlers();
		if(findwinner())
			return;
	}else{
		alert('Cell Not Empty');
	}
}

function grid_row_win_block_turn(value){
	for (let colIdx=0; colIdx< GRID_LENGTH;colIdx++){
		var sum=0;
		var indx=[];
		for (let rowIdx=0; rowIdx< GRID_LENGTH;rowIdx++){
			var gridval = grid[colIdx][rowIdx];
			if(gridval==0){
				indx.push(colIdx,rowIdx);
			}
			else if(gridval==value)
				break;
			sum += grid[colIdx][rowIdx];
		}
		if((sum==4 ||sum==2) && indx.length==2){
			grid[indx[0]][indx[1]]=2;
			turn = 'X';
			return true;
		}	
		
	}
	return false;
}
function grid_col_win_block_turn(value){
	for (let rowIdx=0; rowIdx< GRID_LENGTH;rowIdx++){
		var sum=0;
		var indx=[];
		for (let colIdx=0; colIdx< GRID_LENGTH;colIdx++){
			var gridval = grid[colIdx][rowIdx];
			if(gridval==0)
				indx.push(colIdx,rowIdx);
			else if(gridval==value)
				break;
			sum += grid[colIdx][rowIdx];
		}
		if((sum==4 ||sum==2) && indx.length==2){
			grid[indx[0]][indx[1]]=2;
			turn = 'X';
			return true;
		}
			
	}
	return false;
}

function grid_diagonal_win_block_turn(value){
	//check diagonal win
	turn = 'X';
	if(grid[2][2]==0 && grid[0][0]==value && grid[1][1]==value){
		grid[2][2]=2;
		return true;
	}else if(grid[1][1]==0 &&  grid[0][0]==value && grid[2][2]==value){
		grid[1][1]=2;
		return true;
	}else if(grid[0][0]==0 && grid[1][1]==value && grid[2][2]==value){
		grid[0][0]=2;
		return true;
	}else if(grid[2][0]==0 && grid[0][2]==value && grid[1][1]==value){
		grid[2][0]=2;
		return true;
	}else if(grid[0][2]==0 && grid[2][0]==value && grid[1][1]==value){
		grid[0][2]=2;
		return true;
	}else if(grid[1][1]==0 && grid[2][0]==value && grid[0][2]==value){
		grid[1][1]=2;
		return true;
	}
}

function mark_corners(){
	turn = 'X';
	if(grid[0][0] == 0 && (grid[0][2] == 1  || grid[2][0] == 1)) {
      grid[0][0]=2;
	  return true;
    }
    else if (grid[0][2] == 0 && (grid[0][0] == 1  || grid[2][2] ==1 )) {
      grid[0][2]=2;
	  return true;
    }
    else if (grid[2][2] == 0 && (grid[0][2] == 1  || grid[2][0] ==1)) {
      grid[2][2]=2;
	  return true;
    }
    else if (grid[2][0] == 0 && (grid[0][0] == 1  || grid[2][2] == 1)) {
      grid[2][0]=2;
	  return true;
    }
    else if (grid[0][0] == 0) {
      grid[0][0]=2;
      return true;
    }
    else if (grid[0][2] == 0) {
     grid[0][2]=2;
      return true;
    }
    else if (grid[2][0] == 0) {
      grid[2][0] == 2;
     return true;
    }
    else if (grid[2][2] == 0) {
      grid[2][2] == 2
      return true;
    }
  
    else if (grid[0][1] == 0) {
      grid[0][2] == 2;
      return true;
    }
    else if (grid[1][2] == 0) {
      grid[1][2] == 2;
      return true;
    }
    else if (grid[2][1] == 0) {
      grid[2][1] == 2;
      return true;
    }
    else if (grid[1][0] == 0) {
      grid[1][0] == 2;
      return true;
    }
}
function computerTurn(){
	if(grid_col_win_block_turn(1) || grid_row_win_block_turn(1))
		return;
	if (grid_diagonal_win_block_turn(2))
		return;	
	if (grid_col_win_block_turn(2) || grid_row_win_block_turn(2))
		return;
	if (grid_diagonal_win_block_turn(1))
		return;	
	if (grid[1][1]==0){
		grid[1][1]=2
		return
	}
	if(mark_corners())
		return
	
}

function findwinner(){
	for (let colIdx=0; colIdx< GRID_LENGTH;colIdx++){
		var sum=0;
		var flag=1;
		for (let rowIdx=0; rowIdx< GRID_LENGTH;rowIdx++){
			var gridval = grid[colIdx][rowIdx];
			if(gridval==0){
				flag=0;
				break;
			}
			sum += grid[colIdx][rowIdx];
		}
		if(flag==1 && sum==3){
			alert('Human Wins');
			return true;
		}	
		if(sum==6){
			alert("Bot Wins")
			return true;
		}
	}
	for (let rowIdx=0; rowIdx< GRID_LENGTH;rowIdx++){
		var sum=0;
		var flag=1;
		for (let colIdx=0; colIdx< GRID_LENGTH;colIdx++){
			var gridval = grid[colIdx][rowIdx];
			if(gridval==0){
				flag=0;
				break;
			}
			sum += grid[colIdx][rowIdx];
		}
		if(flag==1 && sum==3){
			alert('Human Wins');
			return true;
		}	
		if(sum==6){
			alert("Bot Wins")
			return true;
		}
			
	}
	if(grid[0][0]==1 && grid[0][0]==grid[1][1] && grid[1][1]==grid[2][2]){
		alert("Human Wins");
		return true;
	}
	if(grid[0][0]==2 && grid[0][0]==grid[1][1] && grid[1][1]==grid[2][2]){
		alert("Bot Wins");
		return true;
	}
	if(grid[0][2]==1 && grid[0][2]==grid[1][1] && grid[1][1]==grid[2][0]){
		alert("Human Wins");
		return true;
	}
	if(grid[0][2]==2 && grid[0][2]==grid[1][1] && grid[1][1]==grid[2][0]){
		alert("Bot Wins");
		return true;
	}
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
