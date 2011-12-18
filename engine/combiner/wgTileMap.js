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
    this.sdata = 0;
    this.offset = { x : 0, y : 0 };
    this.width;
    this.height;
    
    // dimension of a box
    this.dimx = 75;
    this.dimy = 75;
    
    this.enemy = new Array();
    
    this.addTile = function(id)
    {
        if(!this.tiles[id])
            this.tiles[id] = this.addTile.arguments;
    }
    
	this.chooseRandomTile = function(o)
	{
		if(o.length>0) 
			return o[Math.floor(wgRandom(0,o.length))];
		else
			return o;
	}
	
    this.generate = function(mode)
    {
        var row = 0, col = 0;
        var tile, args;
		
		// get data from string
		if(!this.sdata)
			var tdata = this.data.split(" ");
		else
			var tdata = this.sdata;
		
        this.width = tdata[0];
		this.height = tdata[1];
		
		tdata = tdata.slice(2,tdata.length);
		
		if(!this.sdata) {
			for(var i = 0; i < tdata.length; i++) {
				tdata[i]=parseInt(tdata[i]);
			}
		}
		
        if(this.width*this.height!=tdata.length) {
          alert("Error: Level data is corrupt.");
          return;
        }
		
		// calculate lvl borders
		wgCamera.lvlbl = this.offset.x;
		wgCamera.lvlbr = this.offset.x+this.dimx*this.width;
		wgCamera.lvlbt = this.offset.y;
		wgCamera.lvlbd = this.offset.y-this.dimy*this.height;
		
		if(!gamemode) {
			wgCamera.lvlbl-=150;
			wgCamera.lvlbr+=150;
			wgCamera.lvlbd-=150;
		}
		
		// parse data
        for(var i = 0; i < tdata.length; i++)
        {
            args = new Array();
            
			// Get tile info of element
            if(this.tiles[tdata[i]]!=undefined) {
                
                
				// indizes of data array: current,up,down,left,right
				var cr = (row)*this.width+(col);
				var up = (row-1)*this.width+(col);
				var dn = (row+1)*this.width+(col);
				var lt = (row)*this.width+(col-1);
				var rt = (row)*this.width+(col+1);
					
				// check if brothers, i.e. neightbours have same tile type
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
				
				// tiletypes: d,s,t,ts,tl,tr,tb,tbl,tbr,l,r,b,lr
				if(this.tiles[tdata[i]][2].s&&tdata[up]!=tdata[cr] && tdata[dn]!=tdata[cr] && tdata[rt]!=tdata[cr] && tdata[lt]!=tdata[cr])
					args = this.chooseRandomTile(this.tiles[tdata[i]][2].s);   //single
				else if(this.tiles[tdata[i]][2].ts&&tdata[up]!=tdata[cr] && tdata[rt]!=tdata[cr] && tdata[lt]!=tdata[cr])
                    args = this.chooseRandomTile(this.tiles[tdata[i]][2].ts);   //topsingle
				else if(this.tiles[tdata[i]][2].tbl&&tdata[up]!=tdata[cr] && tdata[dn]!=tdata[cr] && tdata[lt]!=tdata[cr] && tdata[cr]!=upbro)
                    args = this.chooseRandomTile(this.tiles[tdata[i]][2].tbl);   //topbottomleft
				else if(this.tiles[tdata[i]][2].tbr&&tdata[up]!=tdata[cr] && tdata[dn]!=tdata[cr] && tdata[rt]!=tdata[cr] && tdata[cr]!=upbro)
                    args = this.chooseRandomTile(this.tiles[tdata[i]][2].tbr);   //topbottomright
                else if(this.tiles[tdata[i]][2].tb&&tdata[up]!=tdata[cr] && tdata[dn]!=tdata[cr] && tdata[cr]!=upbro)
                    args = this.chooseRandomTile(this.tiles[tdata[i]][2].tb);   //topbottom
				else if(this.tiles[tdata[i]][2].tl&&(tdata[up]!=tdata[cr] && tdata[lt]!=tdata[cr]) && tdata[cr]!=ltbro && tdata[cr]!=upbro)
                    args = this.chooseRandomTile(this.tiles[tdata[i]][2].tl);   //topleft
                else if(this.tiles[tdata[i]][2].tr&&(tdata[up]!=tdata[cr] && tdata[rt]!=tdata[cr]) && tdata[cr]!=rtbro && tdata[cr]!=upbro)
                    args = this.chooseRandomTile(this.tiles[tdata[i]][2].tr);   //topright
                else if(this.tiles[tdata[i]][2].t&&tdata[up]!=tdata[cr] && tdata[cr]!=upbro )
                    args = this.chooseRandomTile(this.tiles[tdata[i]][2].t);   //top
				else if(this.tiles[tdata[i]][2].bl&&tdata[dn]!=tdata[cr] && tdata[lt]!=tdata[cr])
                    args = this.chooseRandomTile(this.tiles[tdata[i]][2].bl);   //bottomleft
				else if(this.tiles[tdata[i]][2].br&&tdata[dn]!=tdata[cr] && tdata[rt]!=tdata[cr])
                    args = this.chooseRandomTile(this.tiles[tdata[i]][2].br);   //bottomright
				else if(this.tiles[tdata[i]][2].b&&tdata[dn]!=tdata[cr] && tdata[cr]!=dnbro)
                    args = this.chooseRandomTile(this.tiles[tdata[i]][2].b);   //bottom
				else if(this.tiles[tdata[i]][2].lr&&tdata[lt]!=tdata[cr] && tdata[rt]!=tdata[cr])
                    args = this.chooseRandomTile(this.tiles[tdata[i]][2].lr);   //leftright
                else if(this.tiles[tdata[i]][2].l&&tdata[lt]!=tdata[cr])
                    args = this.chooseRandomTile(this.tiles[tdata[i]][2].l);   //left
                else if(this.tiles[tdata[i]][2].r&&tdata[rt]!=tdata[cr])
                    args = this.chooseRandomTile(this.tiles[tdata[i]][2].r);   //right
				else if(this.tiles[tdata[i]][2].d)
					args = this.chooseRandomTile(this.tiles[tdata[i]][2].d);
				else
                    args = this.chooseRandomTile(this.tiles[tdata[i]][2]);
                
				
				if(!gamemode) // level edit mode: set all blocks static without actors
					var func = new aSolid();
				else  
					var func = new (this.tiles[tdata[i]][1])();                
				
				// (hacky) Set Global Variable Player
				if(func.id=="aPlayer") {
					tile = wgMain.first_ent.addEntity(args.tex, func);
					gGlobals.player = tile;
				} else
					tile = wgMain.first_ent.addEntity(args.tex, func,1);
				
				// position
                tile.object.pos.x = -col*this.dimx*-1;
                tile.object.pos.y = -row*this.dimy;
                
				
				// parse tile arguments
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
						var tmp = wgRandom(min,max);
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
            
            if(col==this.width-1) {
                row++;
                col = 0;
            }
            else
                col++;
        }
    }
};

