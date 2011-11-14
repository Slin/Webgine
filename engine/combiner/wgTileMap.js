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
    this.dimx = 64;
    this.dimy = 64;
    
    this.enemy = new Array();
    
    // addTile(id, 0 / animated / object, atlasid[from, atlasid to, time, cycle])
    this.addTile = function(id, obj)
    {
        if(!this.tiles[id])
        if(this.addTile.arguments.length==6) {
            this.tiles[id] = new Array(obj,this.addTile.arguments[2],this.addTile.arguments[3],this.addTile.arguments[4],this.addTile.arguments[5]);
        }
        else
            this.tiles[id] = new Array(obj, this.addTile.arguments[2]);
        
    }
    
    this.generate = function()
    {
        var row = 0, col = 0;
        
        var tile;
        
        for(var j = 0; j < 3; j++) {
        row = 0;
        col = 0;
        
        
        for(var i = 0; i < this.data.length; i++)
        {
        
        if(this.tiles[this.data[i]]) {
        
            if(j==0&&this.tiles[this.data[i]][0]==0)
            {
                tile = wgMain.first_ent.addEntity(this.texture, this.tiles[this.data[i]][0]);
                tile.object.pos.x = this.offset.x-col*this.dimx*-1;
                tile.object.pos.y = this.offset.y-row*this.dimy;
            }
            else if(j==1&&this.tiles[this.data[i]][0]==1) {
                tile = wgMain.first_ent.addEntity(this.texture, this.tiles[this.data[i]][0]);
                tile.object.pos.x = this.offset.x-col*this.dimx*-1;
                tile.object.pos.y = this.offset.y-row*this.dimy;
                
                tile.object.material.setAnimation(this.tiles[this.data[i]][1],
                                                  this.tiles[this.data[i]][2],
                                                  this.tiles[this.data[i]][3],
                                                  this.tiles[this.data[i]][4]);
            }
            else if(j==2&&this.tiles[this.data[i]][0]==2) {
                tile = wgMain.first_ent.addEntity(this.tiles[this.data[i]][1], new aEnemy());
				tile.group = 1;
				tile.action.type = 1;
                tile.object.pos.x = this.offset.x-col*this.dimx*-1;
                tile.object.pos.y = this.offset.y-row*this.dimy;
            }
            
            //enemy has own texture atlas
            if(j!=2&&this.tiles[this.data[i]][0]!=2) {
                    tile.object.material.initAtlas(this.texinfo.cols, this.texinfo.rows, this.texinfo.width, this.texinfo.height, 0, 0);
                    tile.object.material.setAtlas(this.tiles[this.data[i]][1]);
            }
                
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
    }
};

