//
//	wgQuadTree.js
//	Webgine
//
//	Created by Nils Daumann on 29.11.11.
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


var wgQuadTree = new function()
{
	function wgBranch(posx_, posy_, sizex_, sizey_, parent)
	{
		this.area = {posx: posx_, posy: posy_, sizex: sizex_, sizey: sizey_};
		this.parent = parent;
		this.children = 0;
		this.objects = new Array();
	}
	
	wgBranch.prototype.subdivide = function(divisions) 
	{
		if(this.children != 0)
			return;
			
		this.children = new Array(0, 0, 0, 0);
		this.children[0] = new wqBranch(this.area.posx, this.area.posy, this.area.sizex*0.5, this.area.sizey*0.5);
		this.children[1] = new wqBranch(this.area.posx+this.area.sizex*0.5, this.area.posy, this.area.sizex*0.5, this.area.sizey*0.5);
		this.children[2] = new wqBranch(this.area.posx, this.area.posy+this.area.sizey*0.5, this.area.sizex*0.5, this.area.sizey*0.5);
		this.children[3] = new wqBranch(this.area.posx+this.area.sizex*0.5, this.area.posy+this.area.sizey*0.5, this.area.sizex*0.5, this.area.sizey*0.5);
		
		divisions -= 1;
		if(divisions > 0)
		{
			this.children[0].subdivide(divisions);
			this.children[1].subdivide(divisions);
			this.children[2].subdivide(divisions);
			this.children[3].subdivide(divisions);
		}
	};
	
	wgBranch.prototype.destroy = function() 
	{
		if(this.children != 0)
		{
			this.children[0].destroy();
			this.children[1].destroy();
			this.children[2].destroy();
			this.children[3].destroy();
		}
		
		this.children = 0;
		this.parent = 0;
		this.objects = 0;
	};

	wgBranch.prototype.insertEntity = function(ent, dynamic)
	{
		if(dynamic || this.children != 0)
		{
			this.objects.push(ent);
		}else
		{
			var entrect = new wgRect();
			entrect.posx = ent.object.pos.x;
			entrect.posy = ent.object.pos.y;
			entrect.sizex = ent.object.size.x;
			entrect.sizey = ent.object.size.y;
			
			if(wgMath.rectInRect(entrect, this.children[0].area))
			{
				this.children[0].insertEntity(ent, dynamic);
			}
			else if(wgMath.rectInRect(entrect, this.children[1].area))
			{
				this.children[1].insertEntity(ent, dynamic);
			}
			else if(wgMath.rectInRect(entrect, this.children[2].area))
			{
				this.children[2].insertEntity(ent, dynamic);
			}
			else if(wgMath.rectInRect(entrect, this.children[3].area))
			{
				this.children[3].insertEntity(ent, dynamic);
			}
			else
			{
				this.objects.push(ent);
			}
		}
	};

	wgBranch.prototype.removeEntity = function(ent) 
	{
		
	};

	wgBranch.prototype.updateEntity = function(ent) 
	{
		
	};
	
	this.tree = 0;

	this.createTree = function(posx, posy, sizex, sizey, divisions)
	{
		this.tree = new wgBranch(posx, posy, sizex, sizey);
		this.tree.subdivide(divisions);
	};
	
	this.destroyTree = function()
	{
		this.tree.destroy();
		this.tree = 0;
	};
}