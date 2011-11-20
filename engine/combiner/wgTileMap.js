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
    this.addTile = function(id)
    {
        if(!this.tiles[id])
            this.tiles[id] = this.addTile.arguments;
    }
    
    this.generate = function()
    {
        var row = 0, col = 0;
        var tile, args;

		/**
        if(this.width*this.height!=this.data.length*2+4) {
          alert("Error: Level data is corrupt.");
          return;
        }
        **/
		
		var tdata = this.data.split(" ");
        this.width = tdata[0];
		this.height = tdata[1];
		tdata = tdata.slice(2,tdata.length);

		for(var i = 0; i < tdata.length; i++) {
			tdata[i]=parseInt(tdata[i]);
		}
		
        for(var i = 0; i < tdata.length; i++)
        {
            args = new Array();
            
            if(this.tiles[tdata[i]]!=undefined) {
                
                //there may not only be one texture but multiple textures: top,topleft,topright,left,right,default
                if(this.tiles[tdata[i]].length>=7) {
                    
                    // choose the right tile, depending on neighbours
                    if((!tdata[(row-1)*this.width+(col)] && !tdata[(row)*this.width+(col-1)]) || !tdata[(row)*this.width+(col-1)]&&this.tiles[tdata[(row-1)*this.width+(col)]]!=this.tiles[tdata[(row)*this.width+(col)]])
                      args = this.tiles[tdata[i]][2];   //topleft
                    else if((!tdata[(row-1)*this.width+(col)] && !tdata[(row)*this.width+(col+1)]) || !tdata[(row)*this.width+(col+1)]&&this.tiles[tdata[(row-1)*this.width+(col)]]!=this.tiles[tdata[(row)*this.width+(col)]])
                      args = this.tiles[tdata[i]][4];   //topright
                    else if(!tdata[(row-1)*this.width+(col)] || this.tiles[tdata[(row-1)*this.width+(col)]]!=this.tiles[tdata[(row)*this.width+(col)]])
                      args = this.tiles[tdata[i]][3];   //top
                    else if(!tdata[(row)*this.width+(col-1)])
                      args = this.tiles[tdata[i]][5];   //left
                    else if(!tdata[(row)*this.width+(col+1)])
                      args = this.tiles[tdata[i]][6];   //right
                    else if(this.tiles[tdata[i]].length>7) {
                      var min=7;
                      var max=this.tiles[tdata[i]].length;
                      var rand = Math.floor(Math.random()*(max-min))+min;
                      
                      args = this.tiles[tdata[i]][rand];   // random default tiles
                    }
                    else
                      args = this.tiles[tdata[i]][7];   //default
                } else
                    args = this.tiles[tdata[i]][2];
                
				
				var func = new (this.tiles[tdata[i]][1])();
					
                tile = wgMain.first_ent.addEntity(args.tex, func);
                
				if(func.id=="aPlayer")
					gGlobals.player = tile;
				
                tile.object.pos.x = this.offset.x-col*this.dimx*-1;
                tile.object.pos.y = this.offset.y-row*this.dimy;
                
                if(args.group)
                  tile.group = args.group;
                
                if(args.atype)
                  tile.action.type = args.atype;
                
                if(args.texinfo) {
                    tile.object.material.initAtlas(args.texinfo.cols, args.texinfo.rows, args.texinfo.width, args.texinfo.height, 0, 0);
                    tile.object.material.setAtlas(args.texinfo.set);
                }
                
                if(args.texani)
                    tile.object.material.setAnimation(args.texani.from, args.texani.to, args.texani.speed, args.texani.cycle);
                
				if(args.size) {
					tile.object.size.x = args.size.x;
					tile.object.size.y = args.size.y;
				}
            }
            
            if(col==this.width-1)
            {
                row++;
                col = 0;
            }
            else
                col++;
        }
        
    }
};

