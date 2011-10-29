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