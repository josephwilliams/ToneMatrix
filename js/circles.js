var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

// range of notes (y)
var range = 15;
// size of sequence (x)
var size = 16;
// cellSize represents height and/or width of the square cell/tile
var cellSize = 36;

// holds stringified subarrays for rendering (coloring)
var selectedCells = [];
// holds subarrays of positions for playback
var selectedNotes = {
  0: [], 1: [], 2: [], 3: [], 4: [],
  5: [], 6: [], 7: [], 8: [], 9: [],
  10: [], 11: [], 12: [], 13: [], 14: [], 15: []
};

canvas.width = size * cellSize + 1;
canvas.height = range * cellSize + 1;

canvas.addEventListener('click', handleClick);

function drawGrid() {
  // c.lineWidth = 4;
  // c.strokeStyle = "#fff";
  for (var row = 0; row < range; row++) {
      for (var col = 0; col < size; col++) {
          var x = col * cellSize;
          var y = row * cellSize;
          var xyString = JSON.stringify([col, row]);

          if (selectedCells.indexOf(xyString) === -1) {
             c.beginPath();
            //  c.shadowBlur = 6;
            //  c.shadowColor = "#350066";
             c.arc(x + 16, y + 16, 15, 0, 2 * Math.PI, false);
             c.fillStyle = '#99ffca';
             c.fill();
             c.lineWidth = 1;
             c.strokeStyle = '#350066';
             c.stroke();

          } else {
            if (hlCol === col){
              c.beginPath();
              c.arc(x + 16, y + 16, 8, 0, 2 * Math.PI, false);
              c.fillStyle = "#350066"; // dark purple
              c.fill();
              c.lineWidth = 6;
              c.strokeStyle = '#350066';
              c.stroke();
            } else {
              c.beginPath();
              c.arc(x + 16, y + 16, 15, 0, 2 * Math.PI, false);
              c.fillStyle = "#A020F0"; // purple
              c.fill();
              c.lineWidth = 1;
              c.strokeStyle = '#350066';
              c.stroke();
            }
              }
            }
          }
  // c.closePath();
}

function handleClick(e) {
  var xRaw = e.offsetX || e.layerX;
  var yRaw = e.offsetY || e.layerY;

  var x = Math.floor(xRaw / cellSize);
  var y = Math.floor(yRaw / cellSize);

  var xyString = JSON.stringify([x,y]);

  if (selectedCells.indexOf(xyString) === -1) {
    selectedCells.push(xyString);
    selectedNotes[x].push(y);
    paintCell(xRaw, yRaw, "#A020F0");
  } else {
    for (var i = 0; i < selectedCells.length; i++) {
      if (selectedCells[i] === xyString){
        selectedCells.splice(i, 1);
      }
    }

    for (var k = 0; k < selectedNotes[x].length; k++) {
      if (selectedNotes[x][k] === y){
        console.log(selectedNotes[x]);
        selectedNotes[x].splice(k, 1);
      }
    }

    paintCell(xRaw, yRaw, "#99ffca");
  }
}

function paintCell(x, y, color) {
  xPos = Math.floor(x / cellSize) * cellSize;
  yPos = Math.floor(y / cellSize) * cellSize;

  c.beginPath();
  c.arc(xPos + 16, yPos + 16, 15, 0, 2 * Math.PI, false);
  c.fillStyle = color;
  c.fill();
  c.lineWidth = 1;
  c.strokeStyle = '#350066';
  c.stroke();
}

var clearGrid = function () {
  selectedCells = [];
  selectedNotes = {
    0: [], 1: [], 2: [], 3: [], 4: [],
    5: [], 6: [], 7: [], 8: [], 9: [],
    10: [], 11: [], 12: [], 13: [], 14: [], 15: []
  };
};

var highlightCol = function(x) {
  c.fillStyle = "#9999ff";
  c.globalAlpha = 0.15;
  c.fillRect(x * ((canvas.width) / size) - 4,
             0,
             ((canvas.width) / size),
             canvas.height - 6
            );

  c.globalAlpha = 1;
};

var lastD = 0;
var hlCol = 0;

function draw() {
  // #clearRect clears the drawing such that new renderings can occur
  c.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();

  if(playback.playing) {
    highlightCol(hlCol);
  }
}

draw();
