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