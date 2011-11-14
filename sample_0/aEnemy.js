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
	this.speed = -0.1;
	this.fallspeed = 0.0;
	
	this.health = 100;
	
	this.ent = 0;
}

aEnemy.prototype.onUpdate = function(ts)
{
	if(this.health <= 0)
	{
		this.ent.object.pos.y -= 500;
		return;
	}

	//movement
	var collinfo = wgCollision.checkParallelQuadsList(this.ent.object.pos.x+this.ent.object.size.x*0.5, this.ent.object.pos.y+10, this.ent.object.pos.x+this.ent.object.size.x*0.5+(this.ent.object.size.x*0.5+10)*((this.speed > 0)? 1.0:-1.0), this.ent.object.pos.y+this.ent.object.size.y, wgMain.first_ent, 0);
	if(collinfo.hit != 0)
	{
		this.speed *= -1;
	}
	this.ent.object.pos.x += this.speed*ts;
	
	//gravity
	collinfo = wgCollision.checkParallelQuadsList(this.ent.object.pos.x, this.ent.object.pos.y+30, this.ent.object.pos.x+this.ent.object.size.x, this.ent.object.pos.y-10000, wgMain.first_ent, 0);
	if(-collinfo.dist.y > 32)
	{
		this.fallspeed -= ts*0.01;
	}else
	{
		this.ent.object.pos.y -= -collinfo.dist.y-30;
		this.fallspeed = 0.0;
	}
	this.ent.object.pos.y += this.fallspeed*ts;
	
	//kill player
	var dir = {x : gGlobals.player.object.pos.x-this.ent.object.pos.x, y : gGlobals.player.object.pos.y-this.ent.object.pos.y};
	var dist = dir.x*dir.x+dir.y*dir.y;
	dist = Math.sqrt(dist);
	dir.y /= dist;
	if(dist < 64 && gGlobals.player.action.health > 0)
	{
		if(dir.y < 0.5)
		{
			gGlobals.player.action.health = 0;
		}else
		{
			this.health = 0;
		}
	}
};