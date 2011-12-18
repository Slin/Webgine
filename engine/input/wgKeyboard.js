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
	this.enter = 0;
	this.space = 0;
	this.entf = 0;
	this.ctrl = 0;
	this.shift = 0;
	this.mlft = 0;
	this.mrgt = 0;
	this.mmid = 0;
	
	this.onEnter = 0;
	this.onEntf = 0;

    this.keyDown = function(event)
    {
        switch(event.keyCode)
        {
            case 37: // cursor links
                wgKeyboard.left = 1;
                break;
            case 38: // cursor hoch
 //               wgKeyboard.up = 1;
                break;
            case 39: // cursor rechts
                wgKeyboard.right = 1;
                break;
            case 40: // cursor runter
//                wgKeyboard.down = 1;
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
				
			case 13: //enter
				if(wgKeyboard.onEnter != 0)
					wgKeyboard.onEnter();
				wgKeyboard.enter = 1;
				break;
			case 46: //entf
				if(wgKeyboard.onEntf != 0)
					wgKeyboard.onEntf();
				wgKeyboard.entf = 1;
				break;
			case 32: //space
				wgKeyboard.space = 1;
				break;
            
			case 16:
				wgKeyboard.shift = 1;
				break;
			
			case 17:
				wgKeyboard.ctrl = 1;
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
				
			case 13: //enter
				wgKeyboard.enter = 0;
				break;
			case 46: //entf
				wgKeyboard.entf = 0;
				break;
			case 32: //space
				wgKeyboard.space = 0;
				break;
			case 16:
				wgKeyboard.shift = 0;
				break;
			case 17:
				wgKeyboard.ctrl = 0;
				break;
			
            default:
                break;
        }
    };

	this.buttonDown = function(e) {
		switch(e.button) {
			case 0:	// left
				wgKeyboard.mlft = 1;
				break;
			case 2:	// right
				wgKeyboard.mrgt = 1;
				break;
			case 1: // middle button
				wgKeyboard.mmid = 1;
				break;
		}
	}
	
	this.buttonUp = function(e) {
		switch(e.button) {
			case 0:	// left
				wgKeyboard.mlft = 0;
				break;
			case 2:	// right
				wgKeyboard.mrgt = 0;
				break;
			case 1: // middle button
				wgKeyboard.mmid = 0;
				break;
		}
	}
    this.initKeyboard = function()
    {
        document.addEventListener("keydown", wgKeyboard.keyDown, false);
        document.addEventListener("keyup", wgKeyboard.keyUp, false);
		document.addEventListener("mousedown", wgKeyboard.buttonDown, false);
		document.addEventListener("mouseup", wgKeyboard.buttonUp, false);
    };
};