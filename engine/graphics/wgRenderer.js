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
    this.first_obj = new wgObject();

    this.render = function()
    {
        // Hintergrund loeschen
        wgMain.gl.clearDepth(1.0);
        wgMain.gl.clearColor(0.5, 0.7, 0.8, 1.0);
        wgMain.gl.clear(wgMain.gl.COLOR_BUFFER_BIT|wgMain.gl.DEPTH_BUFFER_BIT);
        
        wgMain.gl.blendFunc(wgMain.gl.SRC_ALPHA, wgMain.gl.ONE_MINUS_SRC_ALPHA);
        wgMain.gl.enable(wgMain.gl.BLEND);
        wgMain.gl.disable(wgMain.gl.DEPTH_TEST);
        
        var tempobj = this.first_obj.next;
        while(tempobj != 0)
        {        
            wgMain.gl.useProgram(tempobj.material.shader);
            
            wgMain.gl.activeTexture(wgMain.gl.TEXTURE0);
            wgMain.gl.bindTexture(wgMain.gl.TEXTURE_2D, tempobj.material.texture);
            wgMain.gl.uniform1i(tempobj.material.shader.texloc, 0);
            
            wgMain.gl.uniform3f(tempobj.material.shader.projloc, canvassizex, canvassizey, scalefactor);
            wgMain.gl.uniform4f(tempobj.material.shader.objloc, tempobj.pos.x, tempobj.pos.y, tempobj.size.x, tempobj.size.y);
            
//            alert("posx: "+tempobj.pos.x);
            
            wgMain.gl.bindBuffer(wgMain.gl.ARRAY_BUFFER, tempobj.mesh);
            wgMain.gl.vertexAttribPointer(tempobj.material.shader.posloc, 2, wgMain.gl.FLOAT, false, 0, 0);
            wgMain.gl.enableVertexAttribArray(tempobj.material.shader.posloc);
            wgMain.gl.drawArrays(wgMain.gl.TRIANGLES, 0, 6);
            
            tempobj = tempobj.next;
        }
    };
};