//
//	wgResource.js
//	Webgine
//
//	Created by Simon Schmudde on 06.11.11.
//	Copyright (c) 2011 Simon Schmudde

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

var wgTileMap = new function()
{
    this.texture = 0;
    this.texinfo = {cols : 2, rows : 2, width : 256, height : 256};
    this.tiles = new Array();
    
    // Level Data Array
    this.data = 0;
    
    this.offset = { x : 0, y : 0 };
    this.width;
    this.height;
    
    // dimension of a box
    this.dimx = 128;
    this.dimy = 128;
    
    
    // addTile(id,atlasid[from, atlasid to, time, cycle])
    this.addTile = function(id, atlasid)
    {
        if(!this.tiles[id])
        if(this.addTile.arguments.length==5) {
            this.tiles[id] = new Array(this.addTile.arguments[1],this.addTile.arguments[2],this.addTile.arguments[3],this.addTile.arguments[4]);
        }
        else
            this.tiles[id] = new Array(-1, atlasid);
        
    }
    
    this.generate = function()
    {
        var row = 0, col = 0;
        
        var tile;
        for(var i = 0; i < this.data.length; i++)
        {
            if(this.tiles[this.data[i]])
            {
                tile = wgMain.first_ent.addEntity(this.texture, 0);
                
                tile.object.material.initAtlas(this.texinfo.cols, this.texinfo.rows, this.texinfo.width, this.texinfo.height, 0, 0);
                tile.object.material.setAtlas(this.tiles[this.data[i]][1]);
                
                if(this.tiles[this.data[i]][0]!=-1) 
                {
                    tile.object.material.setAnimation(this.tiles[this.data[i]][0],
                                                      this.tiles[this.data[i]][1],
                                                      this.tiles[this.data[i]][2],
                                                      this.tiles[this.data[i]][3]);
                }
                
                tile.object.pos.x = this.offset.x-col*this.dimx*-1;
                tile.object.pos.y = this.offset.y-row*this.dimy;
            }
            
            if(col>=this.width-1)
            {
                row++;
                col = 0;
            }
            else
                col++;
        }
    }
};

