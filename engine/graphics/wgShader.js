function compileShader(type, source)
{
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        alert("invalid shader: "+gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

function getShader()
{
    var vShaderQuellcode = "attribute vec2 vPosition;"+
        "uniform vec3 projection;"+
        "uniform vec4 object;"+
        "varying vec2 texcoord0;"+
        "void main()"+
        "{"+
        "    texcoord0 = vPosition;"+
        "    gl_Position = vec4((object.xy+vPosition*object.zw)/projection.xy, 0.0, projection.z);"+
        "}" ;
        
    var fShaderQuellcode = "precision mediump float;"+
        "uniform lowp sampler2D tex0;"+
        "varying mediump vec2 texcoord0;"+
        "void main()"+
        "{"+
        "    gl_FragColor = texture2D(tex0, texcoord0);"+
        "}";

    var id = gl.createProgram();
    var vShader = compileShader(gl.VERTEX_SHADER, vShaderQuellcode);
    gl.attachShader(id, vShader);
    var fShader = compileShader(gl.FRAGMENT_SHADER, fShaderQuellcode);
    gl.attachShader(id, fShader);
    gl.linkProgram(id);
    
    id.posloc = gl.getAttribLocation(id, "vPosition");
    id.projloc = gl.getUniformLocation(id, "projection");
    id.objloc = gl.getUniformLocation(id, "object");
    id.texloc = gl.getUniformLocation(id, "tex0");
    
    return id;
}