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
    this.dimx = 75;
    this.dimy = 75;
    
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

		var tdata = this.data.split(" ");
        this.width = tdata[0];
		this.height = tdata[1];
		
		tdata = tdata.slice(2,tdata.length);

		for(var i = 0; i < tdata.length; i++) {
			tdata[i]=parseInt(tdata[i]);
		}
		
        if(this.width*this.height!=tdata.length) {
          alert("Error: Level data is corrupt.");
          return;
        }
		
		gGlobals.lvlbl = this.offset.x;
		gGlobals.lvlbr = this.offset.x+this.dimx*this.width;
		gGlobals.lvlbt = this.offset.y;
		gGlobals.lvlbd = this.offset.y-this.dimy*this.height;
		
		
        for(var i = 0; i < tdata.length; i++)
        {
            args = new Array();
            
            if(this.tiles[tdata[i]]!=undefined) {
                if(this.tiles[tdata[i]].length>=15) {
                    
					var cr = (row)*this.width+(col);
					var up = (row-1)*this.width+(col);
					var dn = (row+1)*this.width+(col);
					var lt = (row)*this.width+(col-1);
					var rt = (row)*this.width+(col+1);
					
					var upbro=0,dnbro=0,ltbro=0,rtbro=0;
					
					if(this.tiles[tdata[(row-1)*this.width+(col)]] != undefined && this.tiles[tdata[(row-1)*this.width+(col)]][2].bro) 
						upbro = this.tiles[tdata[(row-1)*this.width+(col)]][2].bro;
					else
						upbro = 0;
					
					if(this.tiles[tdata[(row+1)*this.width+(col)]] != undefined && this.tiles[tdata[(row+1)*this.width+(col)]][2].bro)
						dnbro = this.tiles[tdata[(row+1)*this.width+(col)]][2].bro;
					else
						dnbro = 0;
					
					if(this.tiles[tdata[(row)*this.width+(col-1)]] != undefined && this.tiles[tdata[(row)*this.width+(col-1)]][2].bro)
						ltbro = this.tiles[tdata[(row)*this.width+(col-1)]][2].bro;
					else
						ltbro = 0;
					
					if(this.tiles[tdata[(row)*this.width+(col+1)]] != undefined && this.tiles[tdata[(row)*this.width+(col+1)]][2].bro)
						rtbro = this.tiles[tdata[(row)*this.width+(col+1)]][2].bro;
					else
						rtbro = 0;
					
					if(tdata[up]!=tdata[cr] && tdata[dn]!=tdata[cr] && tdata[rt]!=tdata[cr] && tdata[lt]!=tdata[cr])
                      args = this.tiles[tdata[i]][15];   //single
					else if(tdata[up]!=tdata[cr] && tdata[rt]!=tdata[cr] && tdata[lt]!=tdata[cr])
                      args = this.tiles[tdata[i]][8];   //topsingle
					else if(tdata[up]!=tdata[cr] && tdata[dn]!=tdata[cr] && tdata[lt]!=tdata[cr] && tdata[cr]!=upbro)
                      args = this.tiles[tdata[i]][11];   //topbottomleft
					else if(tdata[up]!=tdata[cr] && tdata[dn]!=tdata[cr] && tdata[rt]!=tdata[cr] && tdata[cr]!=upbro)
                      args = this.tiles[tdata[i]][12];   //topbottomright
                    else if(tdata[up]!=tdata[cr] && tdata[dn]!=tdata[cr] && tdata[cr]!=upbro)
                      args = this.tiles[tdata[i]][10];   //topbottom
					else if((tdata[up]!=tdata[cr] && tdata[lt]!=tdata[cr]) && tdata[cr]!=ltbro && tdata[cr]!=upbro)
                      args = this.tiles[tdata[i]][3];   //topleft
                    else if((tdata[up]!=tdata[cr] && tdata[rt]!=tdata[cr]) && tdata[cr]!=rtbro && tdata[cr]!=upbro)
                      args = this.tiles[tdata[i]][5];   //topright
                    else if(tdata[up]!=tdata[cr] && tdata[cr]!=upbro)
                      args = this.tiles[tdata[i]][4];   //top
					else if(tdata[dn]!=tdata[cr] && tdata[lt]!=tdata[cr])
                      args = this.tiles[tdata[i]][13];   //bottomleft
					else if(tdata[dn]!=tdata[cr] && tdata[rt]!=tdata[cr])
                      args = this.tiles[tdata[i]][14];   //bottomright
					else if(tdata[dn]!=tdata[cr])
                      args = this.tiles[tdata[i]][9];   //bottom
					else if(tdata[lt]!=tdata[cr] && tdata[rt]!=tdata[cr])
                      args = this.tiles[tdata[i]][16];   //leftright
                    else if(tdata[lt]!=tdata[cr])
                      args = this.tiles[tdata[i]][6];   //left
                    else if(tdata[rt]!=tdata[cr])
                      args = this.tiles[tdata[i]][7];   //right
					
                    else if(this.tiles[tdata[i]].length>16) {
                      var min=16;
                      var max=this.tiles[tdata[i]].length;
                      var rand = Math.floor(Math.random()*(max-min))+min;
                      
                      args = this.tiles[tdata[i]][rand];   // random default tiles
                    }
					
                    else
                     args = this.tiles[tdata[i]][16];   //default
                } else
                    args = this.tiles[tdata[i]][2];
                
				
				var func = new (this.tiles[tdata[i]][1])();                
				if(func.id=="aPlayer") {
					tile = wgMain.first_ent.addEntity(args.tex, func);
					gGlobals.player = tile;
				} else
					tile = wgMain.first_ent.addEntity(args.tex, func);
				
                tile.object.pos.x = -col*this.dimx*-1;
                tile.object.pos.y = -row*this.dimy;
                
                if(args.group)
                  tile.group = args.group;
                
                if(args.atype) {
					tile.action.type = args.atype;
				  }
                
                if(args.texinfo) {
                    tile.object.material.initAtlas(args.texinfo.cols, args.texinfo.rows, args.texinfo.width, args.texinfo.height, 0, 0);
                    tile.object.material.setAtlas(args.texinfo.set);
                }
                
                if(args.texani)
                    tile.object.material.setAnimation(args.texani.from, args.texani.to, args.texani.speed, args.texani.cycle);
                
				if(args.size) {
					if(args.size.rand&&args.size.min&&args.size.max) {
						var min = args.size.min;
						var max = args.size.max;
						var tmp = Math.random()*(max-min)+min;
						
						tile.object.size.x = tmp*args.size.x;
						tile.object.size.y = tmp*args.size.y;
					} else {
					tile.object.size.x = args.size.x;
					tile.object.size.y = args.size.y;
					}
				} else {
					tile.object.size.x = this.dimx;
					tile.object.size.y = this.dimy;
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

