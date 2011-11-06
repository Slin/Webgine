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
    
    gGlobals.player = wgMain.first_ent.addEntity("sample_0/player.png", new aPlayer());
    gGlobals.player.object.pos.x = 400;
    wgMain.first_ent.addEntity("sample_0/edt.png", new aEnemy());
	
    
    wgTileMap.tiledata[2] = "sample_0/grass0.png";
    wgTileMap.tiledata[1] = "sample_0/grass.png";
    wgTileMap.offset.x = -800;
    wgTileMap.offset.y = -170;
    wgTileMap.width = 13;
    wgTileMap.height = 3;
    wgTileMap.data = new Array( 0,0,0,2,0,2,0,0,0,0,0,0,0,
                                2,0,2,1,0,1,0,0,2,2,0,0,0,
                                1,2,1,1,2,1,2,2,1,1,2,2,2);
    
    wgTileMap.generate();
	
    wgMain.mainLoop();
}