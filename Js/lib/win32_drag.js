/***************************Library*Header********************************** 

* Library Name: win32_drag.js
*
* Library Description: This is a Library by which you can drag js gui like operating system gui's
*
* Author:
* Dwijottam Dutta

****************************************************************************/


/***************************LICENCE**********************************

MIT License

Copyright (c) 2021 Dwijottam Dutta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

****************************************************************************/

function dragElement(gui, titlebar, bool) {
    if (bool) {
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
            // set the element's new position:
            gui.style.top = (gui.offsetTop - pos2) + "px";
            gui.style.left = (gui.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
            return
        }
    }
}