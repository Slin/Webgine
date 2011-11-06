
var wgTileMap = new function() {
    
    // Tile Datatype: Array of texturenames (!!! to be extended for tile informations...)
    this.tiledata = new Array();
    
    // Level Data
    this.data = 0;
    
    this.offset = { x : 0, y : 0 };
    this.width;
    this.height;
    
    // dimension of a box
    this.dimx = 128;
    this.dimy = 124;
    
    this.generate = function() 
    {
        var row = 0, col = 0;
        
        var tile;
        for(var i = 0; i < this.data.length; i++) {
            if(this.data[i]>0 && this.data[i]<this.tiledata.length) {
                tile = wgMain.first_ent.addEntity(this.tiledata[this.data[i]], 0);
            
                tile.object.pos.x = this.offset.x-col*this.dimx*-1;
                tile.object.pos.y = this.offset.y-row*this.dimy;
            }
            
                if(col>=this.width-1) {
                    row++;
                    col = 0;
                }
                else
                    col++;
        }
    }
};

