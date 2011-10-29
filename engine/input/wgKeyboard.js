//
//	wgKeyboard.js
//	Webgine
//
//	Created by Nils Daumann on 29.10.11.
//	Copyright (c) 2011 Nils Daumann

//	Permission is hereby granted, free of charge, to any person obtaining a copy
//	of this software and associated documentation files (the "Software"), to deal
//	in the Software without restriction, including without limitation the rights
//	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//	copies of the Software, and to permit persons to whom the Software is
//	furnished to do so, subject to the following conditions:

//	The above copyright notice and this permission notice shall be included in
//	all copies or substantial portions of the Software.

//	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//	THE SOFTWARE.

var key = {'left' : 0, 'right' : 0, 'up' : 0, 'down' : 0};

function keyDown(event)
{
    switch(event.keyCode)
    {
        case 37: // cursor links
            key.left = 1;
            break;
        case 38: // cursor hoch
            key.up = 1;
            break;
        case 39: // cursor rechts
            key.right = 1;
            break;
        case 40: // cursor runter
            key.down = 1;
            break;
           
        case 87: //w
            key.up = 1;
            break;
        case 65: //a
            key.left = 1;
            break;
        case 83: //s
            key.down = 1;
            break;
        case 68: //d
            key.right = 1;
            break;
            
        default:
            break;
    }
}

function keyUp(event)
{
    switch(event.keyCode)
    {
        case 37: // cursor links
            key.left = 0;
            break;
        case 38: // cursor hoch
            key.up = 0;
            break;
        case 39: // cursor rechts
            key.right = 0;
            break;
        case 40: // cursor runter
            key.down = 0;
            break;
            
        case 87: //w
            key.up = 0;
            break;
        case 65: //a
            key.left = 0;
            break;
        case 83: //s
            key.down = 0;
            break;
        case 68: //d
            key.right = 0;
            break;
            
        default:
            break;
    }
}

function initKeyboard()
{
    document.addEventListener("keydown", keyDown, false);
    document.addEventListener("keyup", keyUp, false);
}