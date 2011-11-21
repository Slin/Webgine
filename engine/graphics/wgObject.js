//
//	wgObject.js
//	Webgine
//
//	Created by Nils Daumann on 30.10.11.
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

function wgObject()
{
    this.prev = 0;
    this.next = 0;

    this.pos = {x : 0, y : 0};
    this.size = {x : 64, y : 64};
    
    this.mesh = 0;
    this.material = 0;
}

wgObject.prototype.moveToFront = function()
{
	var temp = this;
	while(temp.next != 0)
	{
		temp = temp.next;
	}
	this.destroy();
	this.prev = temp;
	this.next = temp.next;
	temp.next = this;
};

wgObject.prototype.moveToBack = function()
{
    this.destroy();
	this.prev = wgRenderer.first_obj;
	this.next = wgRenderer.first_obj.next;
	wgRenderer.first_obj.next.prev = this;
	wgRenderer.first_obj.next = this;
};

wgObject.prototype.addObject = function(texfile,mode)
{
    var temp = new wgObject;
    temp.next = this.next;
    this.next.prev = temp;
    this.next = temp;
    this.next.prev = this;
	
	temp.material = new wgMaterial();
	temp.material.texture = wgTexture.getTexture(texfile,mode);
	temp.material.shader = wgShader.getShader();
	temp.mesh = wgMesh.getMesh();
	
    return temp;
};

wgObject.prototype.destroy = function() 
{
	this.prev.next = this.next; 
	this.next.prev = this.prev;
};