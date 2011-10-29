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

function render()
{
    // Hintergrund loeschen
    gl.clearDepth(1.0);
    gl.clearColor(0.5, 0.7, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    gl.blendFunc(gl.ONE, gl.ZERO);
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    
    gl.useProgram(shadid);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texid);
    gl.uniform1i(shadid.texloc, 0);
    
    gl.uniform3f(shadid.projloc, canvassizex, canvassizey, scalefactor);
    gl.uniform4f(shadid.objloc, posx, posy, sizex, sizey);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(shadid.posloc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(shadid.posloc);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}