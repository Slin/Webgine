//
//	wgMain.js
//	Webgine
//
//	Created by Nils Daumann on 28.10.11.
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

var canvas;
var gl;
var texid;
var shadid;
var vbo;
var scalefactor = 1.0;
var canvassizex = 800;
var canvassizey = 400;
var posx = 0;
var posy = 0;
var sizex = 256;
var sizey = 256;
var gameeventhandler;

function mainLoop()
{
    window.requestAnimFrame(mainLoop, canvas);
    
    getTime();
    gameeventhandler(timestep);
    
    render();
}

function throwOnGLError(err, funcName, args)
{
    throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to" + funcName;
}

function initWebgine(event)
{
    // canvas ist die "Leinwand" auf die gezeichnet werden kann
    canvas = document.getElementById("wgCanvas");
    initKeyboard();
    gl = WebGLUtils.setupWebGL(canvas);
    WebGLDebugUtils.makeDebugContext(gl, throwOnGLError);
    gameeventhandler = event;
}

var speed = 2.0;
var fallspeed = 0.0;
function gameevent(ts)
{
    posx += (key.right-key.left)*speed*ts;
    
    if(posy > -300)
    {
        fallspeed -= ts*0.01;
    }else
    {
        fallspeed = 0.0;
    }
    if(key.up && fallspeed == 0)
        fallspeed = 2.0;
        
    posy += fallspeed*ts;
    
    if(posy < -300)
        posy = -300;
}

function main()
{
    initWebgine(gameevent);
    
    shadid = getShader();
    vbo = getMesh();
    texid = getTexture("sample_0/grass.png");
    
    mainLoop();
}