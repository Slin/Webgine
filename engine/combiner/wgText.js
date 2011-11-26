//
// wgText.js
// Webgine
//
// Created by Simon Schmudde on 19.11.11.
// Copyright (c) 2011 Simon Schmudde

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


function wgText()
{
    this.texture = 0;
    this.dimx = 16;
    this.dimy = 16;

    this.string = 0;
    this.x = 0,this.y = 0;
    
    this.ltext = new Array();
}

wgText.prototype.set = function(text,x,y) {

	if(this.texture == 0)
	{
		alert("No font texture specified to display \""+text+"\" with.");
		return;
	}

    this.string = text;
    if(x!=0&&y!=0) {
        this.x=x;
        this.y=y;
    }
    
    // delete old objects
    if(this.ltext.length>0)  
    {
        for(var i=0;i<this.ltext.length;i++) {
            this.ltext[i].destroy();
        }
    }
    
    // add for each character an object
    for(var i=0;i<this.string.length;i++) {
        this.ltext[i] = wgMain.first_ent.addEntity(this.texture,aSolid,1);
        this.ltext[i].object.size.x = this.dimx;
        this.ltext[i].object.size.y = this.dimy;
        this.ltext[i].object.pos.x = this.x+i*this.dimx;
        this.ltext[i].object.pos.y = this.y;
        this.ltext[i].group = 1;
        this.ltext[i].object.material.texture = wgTexture.getTexture(this.texture);
        this.ltext[i].object.material.initAtlas(16, 8, 128, 64, 0, 0);
        this.ltext[i].object.material.setAtlas(this.string.charCodeAt(i));
    }
};

wgText.prototype.moveToFront = function()
{
	for(var i=0;i<this.ltext.length;i++)
	{
		this.ltext[i].object.moveToFront();
	}
};

wgText.prototype.moveToBack = function()
{
	for(var i=0;i<this.ltext.length;i++)
	{
		this.ltext[i].object.moveToBack();
	}
};