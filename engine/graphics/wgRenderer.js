//
//	wgRenderer.js
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

var wgRenderer = new function()
{
    this.render = function()
    {
        // Hintergrund loeschen
        wgMain.gl.clearDepth(1.0);
        wgMain.gl.clearColor(0.5, 0.7, 0.8, 1.0);
        wgMain.gl.clear(wgMain.gl.COLOR_BUFFER_BIT|wgMain.gl.DEPTH_BUFFER_BIT);
        
        wgMain.gl.blendFunc(wgMain.gl.ONE, wgMain.gl.ZERO);
        wgMain.gl.disable(wgMain.gl.BLEND);
        wgMain.gl.enable(wgMain.gl.DEPTH_TEST);
        
        wgMain.gl.useProgram(shadid);
        
        wgMain.gl.activeTexture(wgMain.gl.TEXTURE0);
        wgMain.gl.bindTexture(wgMain.gl.TEXTURE_2D, texid);
        wgMain.gl.uniform1i(shadid.texloc, 0);
        
        wgMain.gl.uniform3f(shadid.projloc, canvassizex, canvassizey, scalefactor);
        wgMain.gl.uniform4f(shadid.objloc, posx, posy, sizex, sizey);
        
        wgMain.gl.bindBuffer(wgMain.gl.ARRAY_BUFFER, vbo);
        wgMain.gl.vertexAttribPointer(shadid.posloc, 2, wgMain.gl.FLOAT, false, 0, 0);
        wgMain.gl.enableVertexAttribArray(shadid.posloc);
        wgMain.gl.drawArrays(wgMain.gl.TRIANGLES, 0, 6);
    };
};