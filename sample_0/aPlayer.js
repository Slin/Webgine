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
	this.id = "aPlayer";
	this.speed = 1;
	this.ordspeed = 0.3;
	this.fallspeed = 0.0;
	
	this.health = 100;
	this.jump = 0;
	this.onIce = 0;
	
	this.ent = 0;
	
	this.lastdir = 0;
}

aPlayer.prototype.onUpdate = function(ts)
{
	//killed
	if(this.health == 0)
	{
		wgAudio.playSound("death");
		this.health = -1;
		this.ent.object.material.setAnimation(1, 0, 0, 0);
	}
	if(this.health <= 0)
		return;
	
	//movement
	var input = (wgKeyboard.right-wgKeyboard.left);
	var collinfo = wgCollision.checkParallelQuadsList(this.ent.object.pos.x+this.ent.object.size.x*0.5, this.ent.object.pos.y+10, this.ent.object.pos.x+this.ent.object.size.x*0.5+500*input, this.ent.object.pos.y+this.ent.object.size.y, wgMain.first_ent, 0);
	
	if(collinfo.hit && Math.abs(collinfo.dist.x)-15 < 0)
	{
		input = 0;
	}
	else
	{
		if((this.onIce <= 0 || input == 0))// && this.fallspeed == 0)
		{
			this.speed = this.ordspeed;
		}
		else
		{
			if(this.falspeed == 0)
			{
				this.speed += 0.01*ts;
				alert("ice");
			}
		}
		if(collinfo.hit && Math.abs(collinfo.dist.x)-15 < this.speed*ts)
		{
			this.ent.object.pos.x += input*(Math.abs(collinfo.dist.x)-14);
		}
		else
		{
			this.ent.object.pos.x += input*this.speed*ts;
		}
	}
	
	//animations
	if(this.fallspeed == 0)
	{
		if(input != 0)
		{
			if(this.lastdir != input)
			{
				this.ent.object.material.setAnimation(2, 9, .19, 1);
				if(input < 0)
					this.ent.object.material.inverttexx = 1.0;
				else
					this.ent.object.material.inverttexx = 0.0;
				this.lastdir = input;
			}
		}else
		{
			this.lastdir = input;
			this.ent.object.material.setAnimation(0, 0, 0, 0);
		}
	}
	
	//gravity
	collinfo = wgCollision.checkParallelQuadsList(this.ent.object.pos.x+this.ent.object.size.x*0.5-14, this.ent.object.pos.y+30, this.ent.object.pos.x+this.ent.object.size.x*0.5+14, this.ent.object.pos.y-10000, wgMain.first_ent, 0);
	if(-collinfo.dist.y > 32 || collinfo.hit == 0)
	{
		this.fallspeed -= ts*0.0035;
	}else
	{
		if(this.fallspeed <= 0)
		{
			this.ent.object.pos.y -= -collinfo.dist.y-30;
			this.fallspeed = 0.0;
		}
	}
	if(this.fallspeed < 0 && this.fallspeed*ts < (collinfo.dist.y+30) && collinfo.hit != 0)
	{
		this.fallspeed = (collinfo.dist.y+30)/ts;
	}
	
	//jumping
	if((wgKeyboard.up || this.jump > 0) && this.fallspeed == 0)
	{
		this.ent.object.material.setAnimation(2, 3, 0.4, 0);
		if(this.jump <= 0)
			this.jump = 1.0;
		this.fallspeed = this.jump;
		this.jump = 0;
		this.lastdir = -100;
	}
	
	if(this.fallspeed > 0.0)
	{
		collinfo = wgCollision.checkParallelQuadsList(this.ent.object.pos.x+this.ent.object.size.x*0.5-14, this.ent.object.pos.y+30, this.ent.object.pos.x+this.ent.object.size.x*0.5+14, this.ent.object.pos.y+this.ent.object.size.y, wgMain.first_ent, 0);
		if(collinfo.hit != 0)
		{
			this.fallspeed = 0;
		}
	}
	
	this.ent.object.pos.y += this.fallspeed*ts;
		
	//update Camera
	if(this.health)
		wgCamera.update(this.ent.object.pos.x,this.ent.object.pos.y);
};