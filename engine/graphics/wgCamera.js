//
//	wgCamera.js
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

var wgCamera = new function() 
{
    this.pos = {x: 0, y: 0};
    this.dir = 0;
	this.look = 0;
    this.speed = 1;
	this.speedy = 0.9;
	
	this.follow = 0; // Camera follows this wgObject
	
	this.set = function(x,y) {
		this.pos.x=x;
		this.pos.y=y;
	}
	
    this.update = function(speed) {
		if(!this.follow)
			return;
		
		x = this.follow.pos.x;
		y = this.follow.pos.y;
		
		this.speed = speed;
	
        if(wgKeyboard.left)
          this.dir=-1;
        
        if(wgKeyboard.right)
          this.dir=1;
		
		if(wgKeyboard.up || wgKeyboard.space)
          this.look=0;
        
        if(wgKeyboard.down&&!wgKeyboard.up&&!wgKeyboard.space)
          this.look=-200;
				
		var diffx = x-this.pos.x+(200*this.dir);
		var diffy = y-this.pos.y+this.look;
		
		if(diffx>0&&diffx<1||diffx<0&&diffx>-1)
			diffx = 0;
			
		if(diffx>0)
			this.pos.x += diffx/100*this.speed*wgTimer.timestep;
		else if(diffx<0)
			this.pos.x += diffx/100*this.speed*wgTimer.timestep;
		
		if(diffy>0)
			this.pos.y += diffy/100*this.speedy*wgTimer.timestep;
		else if(diffy<-100)
			this.pos.y += diffy/100*this.speedy*wgTimer.timestep;
		
		if(this.pos.x <= this.lvlbl+600)		// left border
			this.pos.x = this.lvlbl+600;
		else if(this.pos.x >= this.lvlbr+600)	// right border
			this.pos.x = this.lvlbr+600;
		
		if(this.pos.y <= this.lvlbd+400)		// left border
			this.pos.y = this.lvlbd+400;
		
    }
};
