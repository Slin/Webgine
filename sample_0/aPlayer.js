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

function aPlayer()
{
	this.speed = 0.5;
	this.fallspeed = 0.0;
	
	this.health = 100;
	
	this.ent = 0;
	
	this.lastdir = 0;
}

aPlayer.prototype.onUpdate = function(ts)
{
	if(this.health == 0)
	{
		this.health = -1;
		this.ent.object.material.setAnimation(4, 6, 0.14, 0);
	}
	
	if(this.health <= 0)
		return;
	
	var input = (wgKeyboard.right-wgKeyboard.left);
	
	var collinfo = wgCollision.checkParallelQuadsList(this.ent.object.pos.x+this.ent.object.size.x*0.5, this.ent.object.pos.y+10, this.ent.object.pos.x+this.ent.object.size.x*0.5+(this.ent.object.size.x*0.5+this.speed*ts)*input, this.ent.object.pos.y+this.ent.object.size.y, this.ent.next);
	if(collinfo.hit == 0)
		this.ent.object.pos.x += input*this.speed*ts;
	else
		input = 0;
	
	if(this.fallspeed == 0)
	{
		if(input != 0)
		{
			if(this.lastdir != input)
			{
				this.ent.object.material.setAnimation(0, 1, 0.4, 1);
				this.lastdir = input;
			}
		}else
		{
			this.lastdir = input;
			this.ent.object.material.setAnimation(0, 0, 0, 0);
		}
	}
	
	collinfo = wgCollision.checkParallelQuadsList(this.ent.object.pos.x, this.ent.object.pos.y+30, this.ent.object.pos.x+this.ent.object.size.x, this.ent.object.pos.y-10000, this.ent.next);
//	alert("collx: "+collinfo.dist.x+" colly: "+collinfo.dist.y);
	if(-collinfo.dist.y > 32)//this.ent.object.pos.y > -300)
	{
		this.fallspeed -= ts*0.01;
	}else
	{
		this.ent.object.pos.y -= -collinfo.dist.y-30;
		this.fallspeed = 0.0;
	}
	
	if(wgKeyboard.up && this.fallspeed == 0)
	{
		this.ent.object.material.setAnimation(2, 3, 0.4, 0);
		this.fallspeed = 2.0;
		this.lastdir = -100;
	}
	
	this.ent.object.pos.y += this.fallspeed*ts;
	
//	if(this.ent.object.pos.y < -300)
//		this.ent.object.pos.y = -300;
		
	if(this.ent.object.pos.x < -800)
		this.ent.object.pos.x = -800;
	if(this.ent.object.pos.x > 672)
		this.ent.object.pos.x = 672;
		
		//update Camera
		wgCamera.update(this.ent.object.pos.x,this.ent.object.pos.y);
};