//
//	wgCollision.js
//	Webgine
//
//	Created by Nils Daumann on 07.11.11.
//	Copyright (c) 2011 Nils Daumann

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

function wgCollInfo()
{
	this.hit = 0;
	this.dist = {x : 0, y : 0};
}

var wgCollision = new function()
{
	this.checkParallelQuads = function(fromx, fromy, tox, toy, obj)
	{
		var objx2 = obj.pos.x+obj.size.x;
		var objy2 = obj.pos.y+obj.size.y;
		
		var quadwidth = Math.abs(tox-fromx);
		var quadheight = Math.abs(toy-fromy);
		
		var x1 = Math.min(fromx, Math.min(tox, Math.min(obj.pos.x, objx2)));
		var y1 = Math.min(fromy, Math.min(toy, Math.min(obj.pos.y, objy2)));
		
		var x2 = Math.max(fromx, Math.max(tox, Math.max(obj.pos.x, objx2)));
		var y2 = Math.max(fromy, Math.max(toy, Math.max(obj.pos.y, objy2)));
		
		var reswidth = x2-x1;
		var resheight = y2-y1;
		
//		alert("res: "+reswidth+" quads: "+(quadwidth+obj.size.y));
		if(reswidth < quadwidth+obj.size.x && resheight < quadheight+obj.size.y)
		{
			var hit = new wgCollInfo();
			hit.hit = 1;
//			alert("val1: "+(obj.pos.y-fromy)+" val2: "+(objy2-fromy));
			if(Math.abs(obj.pos.x-fromx) < Math.abs(objx2-fromx))
			{
				hit.dist.x = obj.pos.x-fromx;
			}else
			{
				hit.dist.x = objx2-fromx;
			}
			if(Math.abs(obj.pos.y-fromy) < Math.abs(objy2-fromy))
			{
				hit.dist.y = obj.pos.y-fromy;
			}else
			{
				hit.dist.y = objy2-fromy;
			}
/*			if(Math.abs(hit.dist.x) < Math.abs(hit.dist.y))
			{
				hit.dist.y = 0;
			}else
			{
				hit.dist.x = 0;
			}*/
			return hit;
		}else
		{
			return new wgCollInfo();
		}
	};
	
	this.checkParallelQuadsList = function(fromx, fromy, tox, toy, ents, group)
	{
		var tempent = ents;
		var collinfo = new wgCollInfo();
		var tempinfo = 0;
		var maxx = Math.max(fromx, tox);
		var minx = Math.min(fromx, tox);
		var maxy = Math.max(fromy, toy);
		var miny = Math.min(fromy, toy);
		while(tempent != 0)
		{
			if(tempent.object != 0 && tempent.group == group)
			{
				//TODO: remove this hacky optimization...
				if(	(tempent.object.pos.x > maxx || tempent.object.pos.x+tempent.object.size.x < minx) ||
					(tempent.object.pos.y > maxy || tempent.object.pos.y+tempent.object.size.y < miny))
					{
						tempent = tempent.next;
						continue;
					}
				
				tempinfo = this.checkParallelQuads(fromx, fromy, tox, toy, tempent.object);
				if(tempinfo.hit != 0)
				{
					if(collinfo.hit == 0)
					{
						collinfo = tempinfo;
					}else
					{
						if(Math.sqrt(collinfo.dist.x*collinfo.dist.x+collinfo.dist.y*collinfo.dist.y) > Math.sqrt(tempinfo.dist.x*tempinfo.dist.x+tempinfo.dist.y*tempinfo.dist.y))
						{
//							alert("val1: "+(tempinfo.dist.x)+" val2: "+(tempinfo.dist.y));
							collinfo = tempinfo;
						}
					}
				}
			}
			tempent = tempent.next;
		}
		
		return collinfo;
	};
	
	this.checkParallelQuadsTree = function(fromx, fromy, tox, toy, tree, group)
	{
		var tempent = ents;
		var collinfo = new wgCollInfo();
		var tempinfo = 0;
		var maxx = Math.max(fromx, tox);
		var minx = Math.min(fromx, tox);
		var maxy = Math.max(fromy, toy);
		var miny = Math.min(fromy, toy);
		while(tempent != 0)
		{
			if(tempent.object != 0 && tempent.group == group)
			{
				//TODO: remove this hacky optimization...
				if(	(tempent.object.pos.x > maxx || tempent.object.pos.x+tempent.object.size.x < minx) ||
					(tempent.object.pos.y > maxy || tempent.object.pos.y+tempent.object.size.y < miny))
					{
						tempent = tempent.next;
						continue;
					}
				
				tempinfo = this.checkParallelQuads(fromx, fromy, tox, toy, tempent.object);
				if(tempinfo.hit != 0)
				{
					if(collinfo.hit == 0)
					{
						collinfo = tempinfo;
					}else
					{
						if(Math.sqrt(collinfo.dist.x*collinfo.dist.x+collinfo.dist.y*collinfo.dist.y) > Math.sqrt(tempinfo.dist.x*tempinfo.dist.x+tempinfo.dist.y*tempinfo.dist.y))
						{
//							alert("val1: "+(tempinfo.dist.x)+" val2: "+(tempinfo.dist.y));
							collinfo = tempinfo;
						}
					}
				}
			}
			tempent = tempent.next;
		}
		
		return collinfo;
	};
};