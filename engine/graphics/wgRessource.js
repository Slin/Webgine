
var RESSOURCE = {
    TEXTURE : 'Texture Ressource',
    SHADER  : 'Shader Ressource',
    MATERIAL: 'Material Ressource'
};

var wgRessource = new function()
{
    var ressources = new Array();
    
    this.load = function(t, filename) 
    {
        var exists = 0;
        for(var filen in ressources) {
            if(filen == filename && ressources[filen].type != t) 
            {
                exists = 1;
                alert("Error: File \""+filename+"\": Already "+ressources[filename].type);
            }
        }
    
        if(filename!="" && !exists)
        {
            // Add a new Ressource
            switch(t) {
                case RESSOURCE.TEXTURE:
                        ressources[filename] = {
                            type  : t,
                            data  : wgTexture.getTexture(filename)
                        };
                    break;
                
                case RESSOURCE.SHADER:
                        ressources[filename] = {
                            type  : t,
                            data  : 0
                        };
                    break;
                
                case RESSOURCE.MATERIAL:
                    ressources[filename] = {
                        type  : t,
                        data  : new wgMaterial
                    };
                    
                    ressources[filename].data.texture = this.load.arguments[2];
                    ressources[filename].data.shader  = this.load.arguments[3];
                    break;
                
                default:
                    break;
            }
        }
    }
    
    this.get = function(filename) 
    {
        if(ressources[filename])
            return ressources[filename].data;
    }
};