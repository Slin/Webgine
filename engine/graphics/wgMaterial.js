//
//	wgMaterial.js
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

function wgMaterial()
{
    this.texture = 0;
    this.shader = 0;
	
	this.atlas = {posx : 0, posy : 0, width : 1.0, height : 1.0, columns : 1, rows : 1};
	this.animation = {curr: 0, from : 0, to : 0, range : 0, speed : 0, time : 0, cycle : 0};
	this.inverttexx = 0;
	this.color = {r: 1.0, g: 1.0, b: 1.0, a: 1.0};
}

wgMaterial.prototype.initAtlas = function(imagesx, imagesy, texx, texy, areax, areay)
{
	if(areax == 0)
		areax = texx;
	if(areay == 0)
		areay = texy;
	
	this.atlas.width = (areax/imagesx)/texx;
	this.atlas.height = (areay/imagesy)/texy;
	
	this.atlas.columns = imagesx;
	this.atlas.rows = imagesy;
};

wgMaterial.prototype.setAtlas = function(id)
{
	this.animation.curr = id;

	this.atlas.posx = id%this.atlas.columns;
	this.atlas.posy = Math.floor(id/this.atlas.columns);
	
	this.atlas.posx *= this.atlas.width;
	this.atlas.posy *= this.atlas.height;
};

wgMaterial.prototype.getAtlas = function()
{
	return this.animation.curr;
};

wgMaterial.prototype.setAnimation = function(from, to, speed, cycle)
{
	this.animation.from = from;
	this.animation.to = to;
	this.animation.range = to-from;
	this.animation.speed = speed;
	this.animation.cycle = cycle;
	this.animation.time = 0;
	
	this.setAtlas(from);
};

wgMaterial.prototype.updateAnimation = function(ts)
{
	if(this.animation.speed == 0)
	{
		return;
	}
	
	this.animation.time += ts*this.animation.speed*0.01;
	if(this.animation.time >= 1.0)
	{
		if(this.animation.cycle > 0)
		{
			this.animation.time = this.animation.time-1.0;
		}else
		{
			this.animation.time = 1.0;
			this.animation.speed = 0;
		}
	}
	this.animation.curr = this.animation.from+Math.round(this.animation.time*this.animation.range);
	this.setAtlas(this.animation.curr);
}