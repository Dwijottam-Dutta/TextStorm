/***************************Library*Header********************************** 

* Library Name: win32_drag.js
*
* Library Description: This is a Library by which you can drag js gui like operating system gui's
*
* Author:
* Dwijottam Dutta

****************************************************************************/

function dragElement(gui, titlebar) {
    var pos1 = -1,
        pos2 = -1,
        pos3 = -1,
        pos4 = -1;
    if (titlebar) {
        // if present, the header is where you move the DIV from:
        titlebar.onmousedown = dragMouseDownMain;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        gui.onmousedown = dragMouseDownMain;
    }

    function dragMouseDownMain(e) {
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

        if (e.clientY < 30) {
            document.onmousemove = null;
        }
        else {
            // set the element's new position:
            gui.style.top = (gui.offsetTop - pos2) + "px";
            gui.style.left = (gui.offsetLeft - pos1) + "px";
        }
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        return;
    }
}