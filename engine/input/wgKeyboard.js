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

var wgKeyboard = new function()
{
    this.left = 0;
    this.up = 0;
    this.right = 0;
    this.down = 0;

    this.keyDown = function(event)
    {
        switch(event.keyCode)
        {
            case 37: // cursor links
                wgKeyboard.left = 1;
                break;
            case 38: // cursor hoch
                wgKeyboard.up = 1;
                break;
            case 39: // cursor rechts
                wgKeyboard.right = 1;
                break;
            case 40: // cursor runter
                wgKeyboard.down = 1;
                break;
               
            case 87: //w
                wgKeyboard.up = 1;
                break;
            case 65: //a
                wgKeyboard.left = 1;
                break;
            case 83: //s
                wgKeyboard.down = 1;
                break;
            case 68: //d
                wgKeyboard.right = 1;
                break;
                
            default:
                break;
        }
    };

    this.keyUp = function(event)
    {
        switch(event.keyCode)
        {
            case 37: // cursor links
                wgKeyboard.left = 0;
                break;
            case 38: // cursor hoch
                wgKeyboard.up = 0;
                break;
            case 39: // cursor rechts
                wgKeyboard.right = 0;
                break;
            case 40: // cursor runter
                wgKeyboard.down = 0;
                break;
                
            case 87: //w
                wgKeyboard.up = 0;
                break;
            case 65: //a
                wgKeyboard.left = 0;
                break;
            case 83: //s
                wgKeyboard.down = 0;
                break;
            case 68: //d
                wgKeyboard.right = 0;
                break;
                
            default:
                break;
        }
    };

    this.initKeyboard = function()
    {
        document.addEventListener("keydown", wgKeyboard.keyDown, false);
        document.addEventListener("keyup", wgKeyboard.keyUp, false);
    };
};