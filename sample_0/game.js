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

var speed = 2.0;
var fallspeed = 0.0;
var player;
function gameevent(ts)
{
    player.pos.x += (wgKeyboard.right-wgKeyboard.left)*speed*ts;
    
    if(player.pos.y > -300) 
    {
        fallspeed -= ts*0.01;
    }
    else
    {
        fallspeed = 0.0;
    }
    if(wgKeyboard.up && fallspeed == 0)
        fallspeed = 2.0;
        
    player.pos.y += fallspeed*ts;
    
    if(player.pos.y < -300)
        player.pos.y = -300;
}

function main()
{
    wgMain.initWebgine(gameevent);
    wgRessource.load(RESSOURCE.TEXTURE, "sample_0/grass.png");
    wgRessource.load(RESSOURCE.TEXTURE, "sample_0/edt.png");
    
    var shadid = wgShader.getShader();
    var spritemesh = wgMesh.getMesh();
    
    // load material - parameter: filename, texid, shaderid
    wgRessource.load(RESSOURCE.MATERIAL, "grmat", wgRessource.get("sample_0/grass.png"), shadid);
    wgRessource.load(RESSOURCE.MATERIAL, "plmat", wgRessource.get("sample_0/edt.png"), shadid);
    
    var ground;
    for(var x = -800; x < 800; x += 128)
    {
        ground = wgRenderer.first_obj.addObject();
        ground.mesh = spritemesh;
        ground.material = wgRessource.get("grmat");
        ground.pos.x = x;
        ground.pos.y = -428;
    }
    
    player = wgRenderer.first_obj.addObject();
    player.mesh = spritemesh;
    player.material = wgRessource.get("plmat");
    
    wgMain.mainLoop();
}