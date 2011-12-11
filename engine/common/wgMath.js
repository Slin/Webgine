//
//	wgMath.js
//	Webgine
//
//	Created by Nils Daumann on 01.12.11.
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

function wgRect()
{
	posx = 0;
	posy = 0;
	sizex = 0;
	sizey = 0;
}

function wgRandom(min,max)
{
	return Math.random()*(max-min)+min;
}

var wgMath = new function()
{
    this.posInRect = function(pos, rect)
	{
		return (pos.x > rect.posx && pos.y > rect.posy && pos.x < rect.posx+rect.sizex && pos.y < rect.posy+rect.sizey);
	};
	
	this.rectInRect = function(rect0, rect1)
	{
		return (this.posInRect((rect0.posx, rect0.posy), rect1) && this.posInRect((rect0.posx+rect0.sizex, rect0.posy+rect0.sizey), rect1));
	};
};
