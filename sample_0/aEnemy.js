//
//	player.js
//	Webgine
//
//	Created by Nils Daumann on 06.11.11.
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

function aEnemy()
{
	this.speed = 0.3;
	this.fallspeed = 0.0;
	
	this.ent = 0;
}

aEnemy.prototype.onUpdate = function(ts)
{
	this.ent.object.pos.x += this.speed*ts;
	
	if(this.ent.object.pos.y > -300)
	{
		this.fallspeed -= ts*0.01;
	}else
	{
		this.fallspeed = 0.0;
	}
/*	if(wgKeyboard.up && this.fallspeed == 0)
		this.fallspeed = 2.0;*/
	
	this.ent.object.pos.y += this.fallspeed*ts;
	
	if(this.ent.object.pos.y < -300)
		this.ent.object.pos.y = -300;
		
	if(this.ent.object.pos.x < -800)
	{
		this.ent.object.pos.x = -800;
		this.speed *= -1;
	}
	if(this.ent.object.pos.x > 672)
	{
		this.ent.object.pos.x = 672;
		this.speed *= -1;
	}
	
	var dir = {x : gGlobals.player.object.pos.x-this.ent.object.pos.x, y : gGlobals.player.object.pos.y-this.ent.object.pos.y};
	var dist = dir.x*dir.x+dir.y*dir.y;
//	dist = sqrt(dist);
	if(dist < 20 && gGlobals.player.action.health > 0)
	{
		gGlobals.player.action.health = 0;
	}
};