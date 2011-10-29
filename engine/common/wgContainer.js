//
//	wgContainer.js
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

var canvas;
var gl;
var texid;
var shaderprog;
var vbo;
var posloc;
var projloc;
var objloc;
var texloc;
var scalefactor = 1.0;
var canvassizex = 800;
var canvassizey = 400;
var posx = 0;
var posy = 0;
var sizex = 256;
var sizey = 256;
var speed = 2.0;
var lasttime = 0;
var newtime = 0;
var timestep = 0;

var key = {'left' : 0, 'right' : 0, 'up' : 0, 'down' : 0};

function throwOnGLError(err, funcName, args)
{
    throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to" + funcName;
}

function keyDown(event)
{
    switch(event.keyCode)
    {
        case 37: // cursor links
            key.left = 1;
            break;
        case 38: // cursor hoch
            key.up = 1;
            break;
        case 39: // cursor rechts
            key.right = 1;
            break;
        case 40: // cursor runter
            key.down = 1;
            break;
           
        case 87: //w
            key.up = 1;
            break;
        case 65: //a
            key.left = 1;
            break;
        case 83: //s
            key.down = 1;
            break;
        case 68: //d
            key.right = 1;
            break;
            
        default:
            break;
    }
}

function keyUp(event)
{
    switch(event.keyCode)
    {
        case 37: // cursor links
            key.left = 0;
            break;
        case 38: // cursor hoch
            key.up = 0;
            break;
        case 39: // cursor rechts
            key.right = 0;
            break;
        case 40: // cursor runter
            key.down = 0;
            break;
            
        case 87: //w
            key.up = 0;
            break;
        case 65: //a
            key.left = 0;
            break;
        case 83: //s
            key.down = 0;
            break;
        case 68: //d
            key.right = 0;
            break;
            
        default:
            break;
    }
}

function render()
{
    window.requestAnimFrame(render, canvas);
    
    newtime = new Date().getTime();
    timestep = newtime-lasttime;
    lasttime = newtime;
    
    posx += (key.right-key.left)*speed*timestep;
    posy += (key.up-key.down)*speed*timestep;
    
    // Hintergrund loeschen
    gl.clearDepth(1.0);
    gl.clearColor(0.5, 0.7, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    gl.blendFunc(gl.ONE, gl.ZERO);
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    
    gl.useProgram(shaderprog);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texid);
    gl.uniform1i(texloc, 0);
    
    gl.uniform3f(projloc, canvassizex, canvassizey, scalefactor);
    gl.uniform4f(objloc, posx, posy, sizex, sizey);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(posloc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posloc);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function main()
{
    // canvas ist die "Leinwand" auf die gezeichnet werden kann
    canvas = document.getElementById("wgCanvas");
    document.addEventListener("keydown", keyDown, false);
    document.addEventListener("keyup", keyUp, false);
    gl = WebGLUtils.setupWebGL(canvas);
    WebGLDebugUtils.makeDebugContext(gl, throwOnGLError);
    
    // Das Shader-Program-Objekt fasst spaeter den Vertex-
    // und Fragment-Shader zusammen.
    shaderprog = gl.createProgram();
    
    // Der folgende String enthaelt den kompletten Quellcode
    // fuer einen minimalistischen Vertex-Shader:
    var vShaderQuellcode = "attribute vec2 vPosition;"+
        "uniform vec3 projection;"+
        "uniform vec4 object;"+
        "varying vec2 texcoord0;"+
        "void main()"+
        "{"+
        "    texcoord0 = vPosition;"+
        "    gl_Position = vec4((object.xy+vPosition*object.zw)/projection.xy, 0.0, projection.z);"+
        "}" ;
    // Das Vertex-Shader-Objekt wird angelegt:
    vShader = gl.createShader(gl.VERTEX_SHADER);
    // - mit seinem Quelltext verknuepft:
    gl.shaderSource(vShader, vShaderQuellcode);
    // - kompiliert:
    gl.compileShader(vShader);
    if(!gl.getShaderParameter(vShader, gl.COMPILE_STATUS))
    {
        alert("invalid shader: "+gl.getShaderInfoLog(vShader));
        return null;
    };
    // - dem Shader-Program-Objekt hinzugefuegt:
    gl.attachShader(shaderprog, vShader);
    
    // Nochmal das gleiche Vorgehen wie fuer den Vertex-
    // Shader; analog fuer den Fragment-Shader:
    var fShaderQuellcode = "precision mediump float;"+
        "uniform lowp sampler2D tex0;"+
        "varying mediump vec2 texcoord0;"+
        "void main()"+
        "{"+
        "    gl_FragColor = texture2D(tex0, texcoord0);"+
        "}";
    fShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fShader, fShaderQuellcode);
    gl.compileShader(fShader);
      
    if(!gl.getShaderParameter(fShader, gl.COMPILE_STATUS))
    {
        alert("invalid shader: "+gl.getShaderInfoLog(fShader));
        return null;
    };

    gl.attachShader(shaderprog, fShader);
    
    // Das Shader-Program-Objekt ist vollstaendig und muss
    // gelinkt werden.
    gl.linkProgram(shaderprog);
    
    // Die Verknuepfung zwischen JavaScript und dem
    // Shader-Attribut
    posloc = gl.getAttribLocation(shaderprog, "vPosition");
    projloc = gl.getUniformLocation(shaderprog, "projection");
    objloc = gl.getUniformLocation(shaderprog, "object");
    texloc = gl.getUniformLocation(shaderprog, "tex0");
    
    // Ein Array mit den Koordinaten, der Eckpunkte des Dreiecks
    // das dargestellt wird.
    var vVertices = new Float32Array(
    [0.0, 1.0,
    1.0, 0.0,
    0.0, 0.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0]);
    
    // ein WebGL-Buffer-Objekt wird erzeugt:
    vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vVertices, gl.STATIC_DRAW);
    
    //erstellen und laden einer Textur...
    texid = gl.createTexture();
    var image = new Image();
    image.onload = function()
    {
        gl.bindTexture(gl.TEXTURE_2D, texid);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.bindTexture(gl.TEXTURE_2D, null);
        render();
    }
    image.onerror = function()
    {
        alert("Couldn´t load texture "+image.src);
    }
    image.src = "sample_0/grass.png";
}