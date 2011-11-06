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

var gGlobals = new function()
{
	this.player = 0;
};

function gameevent(ts)
{
	
}

function main()
{
    wgMain.initWebgine(gameevent);
    
    var ground;
    for(var x = -800; x < 800; x += 128)
    {
        ground = wgMain.first_ent.addEntity("sample_0/grass.png", 0);
        ground.object.pos.x = x;
        ground.object.pos.y = -428;
    }
    
    gGlobals.player = wgMain.first_ent.addEntity("sample_0/player.png", new aPlayer());
	gGlobals.player.object.pos.x = 400;
	wgMain.first_ent.addEntity("sample_0/edt.png", new aEnemy());
	
    wgMain.mainLoop();
}