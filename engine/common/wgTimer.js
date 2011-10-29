var lasttime = 0;
var newtime = 0;
var timestep = 0;

function getTime()
{
    newtime = new Date().getTime();
    timestep = newtime-lasttime;
    if(timestep > 100.0){timestep = 0;}
    lasttime = newtime;
}