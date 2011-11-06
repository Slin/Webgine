//
//	wgEntity.js
//	Webgine
//
//	Created by Nils Daumann on 03.11.11.
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

function wgAction()
{
	this.onUpdate = 0;
	this.onInit = 0;
}

function wgEntity()
{
	this.action = 0;
	this.object = 0;
	
	this.next = 0;
	this.prev = 0;
}

wgEntity.prototype.addEntity = function(texfile)
{
	var temp = new wgEntity();
    temp.next = this.next;
    this.next.prev = temp;
    this.next = temp;
    this.next.prev = this;
	
	temp.object = wgRenderer.first_obj.addObject(texfile);
	return this.next;
};