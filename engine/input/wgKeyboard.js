var key = {'left' : 0, 'right' : 0, 'up' : 0, 'down' : 0};

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

function initKeyboard()
{
    document.addEventListener("keydown", keyDown, false);
    document.addEventListener("keyup", keyUp, false);
}