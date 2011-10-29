function getMesh()
{
    var vVertices = new Float32Array(
        [0.0, 1.0,
         1.0, 0.0,
         0.0, 0.0,
         0.0, 1.0,
         1.0, 0.0,
         1.0, 1.0]);
    
    var vboid = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboid);
    gl.bufferData(gl.ARRAY_BUFFER, vVertices, gl.STATIC_DRAW);
    
    return vboid;
}