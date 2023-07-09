import {GUI} from 'dat.gui';

var gui = new GUI();
let folders = new Map();
let events = {};

var container = document.querySelector('#dat_gui');
if (!container) {
    container = document.createElement('div');
    container.id = 'dat_gui';
    document.body.appendChild(container);
}
dragElement(container);
container.appendChild(gui.domElement);
hideAll();

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
function addFolder(folderName, parentFolder){
    if (parentFolder){
        if (folders.has(folderName))return;
        if (!folders.has(parentFolder))return;
        let new_folder = folders.get(parentFolder).addFolder(folderName)
        folders.set(folderName, new_folder);
        return;
    }
    let new_folder = gui.addFolder(folderName);
    folders.set(folderName, new_folder);
    
}

function addButton(folderName, buttonName, callback){
    let folder = (folderName == '' || !folders.has(folderName)) ? gui : folders.get(folderName);
    // events.set(buttonName, callback);
    if (events[buttonName])return;
    events[buttonName] = callback;
    folder.add(events, buttonName);
}
function hideAll(){
    gui.closed = true;
    container.style.display = "none";
}
function displayAll(){
    gui.closed = false;
    container.style.display = "block";
}

export {
    addFolder,
    addButton,
    hideAll,
    displayAll
}