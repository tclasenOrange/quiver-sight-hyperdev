var button = document.querySelector("#play");
button.addEventListener('click', start );

function start(){
  var gameReady = false;
  if(!gameReady){
  var fieldSize = document.querySelector('#fieldSize');
  if(fieldSize.value <== 0){
    setUpGame(15);
  }
  else {
    setUpGame(fieldSize.value);
  }
  fieldSize.style.display="none";
  }
  else{
    simulationStep();
  }
}

function getSurroundingLivingFields(number){
  
}

function simulationStep(){
  
}

function setUpGame(n) {
  createTable(n);
}

function createTable(n){
  var root = document.createElement("table");
  root.appendChild(createHeader(n));
  for(var i = 0; i<n; i++){
    root.appendChild(createRow(n));
  }
  return root;
}

function createHeader(n){
  var header = document.createElement("tr");
  for(var i = 0; i<n; i++){
    var headerCol = document.createElement("th");
    var node = document.createTextNode(i);
    headerCol.appendChild(node);
    header.appendChild(headerCol);
  }
  return header;
}

function createRow(n){
  var rowHeader = document.createElement("tr");
  for(var i = 0; i<n;i++) {
    var rowElement = document.createElement("td");
    var inputCheckbox = document.createElement("input");
    
  }
}
