//
//	wgMain.js
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

var speed = 1.0;
var fallspeed = 0.0;
var player = 0;
function gameevent(ts)
{
	if(player != 0 && player.object != 0)
	{
		player.object.pos.x += (wgKeyboard.right-wgKeyboard.left)*speed*ts;
		
		if(player.object.pos.y > -300)
		{
			fallspeed -= ts*0.01;
		}else
		{
			fallspeed = 0.0;
		}
		if(wgKeyboard.up && fallspeed == 0)
			fallspeed = 2.0;
			
		player.object.pos.y += fallspeed*ts;
		
		if(player.object.pos.y < -300)
			player.object.pos.y = -300;
			
		if(player.object.pos.x < -800)
			player.object.pos.x = -800;
		if(player.object.pos.x > 672)
			player.object.pos.x = 672;
	}
}

function main()
{
    wgMain.initWebgine(gameevent);
    
    var ground;
    for(var x = -800; x < 800; x += 128)
    {
        ground = wgMain.first_ent.addEntity("sample_0/grass.png");
        ground.object.pos.x = x;
        ground.object.pos.y = -428;
    }
    
    player = wgMain.first_ent.addEntity("sample_0/player.png");
    wgMain.mainLoop();
}