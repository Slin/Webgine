

function editUpdatePosition(x,y) {
	if(gamemode)
		return;
	
	gGlobals.cursorposx = x;
	gGlobals.cursorposy = y;
}

function gEditTestLevel() {
	wgMain.first_ent.addEntity("game/Back3.png", new aBackground(0.2, 0.0, -0.3));
	wgMain.first_ent.addEntity("game/Back2.png", new aBackground(0.4, 0.0, -0.2));
	wgMain.first_ent.addEntity("game/Back1.png", new aBackground(0.55, 0.0, -0.1));
	wgMain.first_ent.addEntity("game/Back0.png", new aBackground(0.8, 0.0, -0.0));
	wgMain.first_ent.addEntity("game/schwarz.png", new aBackground(1.0, 0.0, 0.75));
	
}

var gEdit = new function() {
	
	var cursor = 0;
	var posx = 0, posy = 0;
	var currenttile = 0;
	var width = 800, height = 30;
	var i=0;
	var data = 0;
	var reset = 0;
	this.welcomeback = 0;
	
	this.init = function() {
		gamemode=0;
		
		// Info panel
		document.getElementById("counter").innerHTML = "<p style=\"font-size:12px;\"><b>EDITOR SHORTCUTS</b><br/>SHIFT: Move Camera<br/>CTRL: Switch Tile<br/>LMOUSE: Place Tile";
		document.getElementById("timer").innerHTML = "";
		
		cursor = wgMain.first_ent.addEntity("game/default.png", new aSolid);
		cursor.object.size.x = cursor.object.size.y = 75;
		cursor.group = 1;
		
		if(!this.welcomeback) {
			width=prompt("Set Width",800);
			height=prompt("Set Height",30);
			wgCamera.follow = cursor.object;
			
			data = new Array();
			
			// Clear Level
			for(var i=0;i<width*height;i++) {
				data[i]=0;
			}
		}
		this.welcomeback = 1;
		this.updateTileMap();
		
	}
	
	this.update = function(ts) {
		if(wgKeyboard.shift)
			wgCamera.update(1);
		
		if(reset) {
			cursor = wgMain.first_ent.addEntity("game/default.png", new aSolid);
			cursor.object.size.x = cursor.object.size.y = 75;
			cursor.group = 1;
			wgCamera.follow = cursor.object;
			
			
			reset=0;
		}
		
		// Select Tile
		if(wgKeyboard.ctrl&&!wgKeyboard.space) {
			if(currenttile<wgTileMap.tiles.length)
				currenttile++;
			else
				currenttile=0; // cursor "delete"
			
			if(currenttile>=0&&wgTileMap.tiles[currenttile]!=undefined) {
			
				if(wgTileMap.tiles[currenttile][2].d)
					args = wgTileMap.chooseRandomTile(wgTileMap.tiles[currenttile][2].d);
				else if(wgTileMap.tiles[currenttile][2])
					args = wgTileMap.chooseRandomTile(wgTileMap.tiles[currenttile][2]);
				
				cursor.object.material = new wgMaterial();
				cursor.object.material.shader = wgShader.getShader();
				cursor.object.mesh = wgMesh.getMesh();
				if(args.tex)
					cursor.object.material.texture = wgTexture.getTexture(args.tex);
				if(args.texinfo) {
						cursor.object.material.initAtlas(args.texinfo.cols, args.texinfo.rows, args.texinfo.width, args.texinfo.height, 0, 0);
						cursor.object.material.setAtlas(args.texinfo.set);
				}
			}
		}
		
		if(cursor.object) {
			cursor.object.pos.x = (wgCamera.pos.x+gGlobals.cursorposx)-0.5*document.body.clientWidth;
			cursor.object.pos.y = (wgCamera.pos.y-gGlobals.cursorposy)+0.5*document.body.clientHeight-120;
			
			//calculate grid cursor
			posx = Math.floor(cursor.object.pos.x/75);
			posy = Math.ceil(cursor.object.pos.y/75);
			
			cursor.object.pos.x = posx*75;
			cursor.object.pos.y = posy*75;
			
			document.getElementById("timer").innerHTML = posx+","+posy;
		}
		
		// set tile
		if(wgKeyboard.mlft) {
			if(data[-posy*width+posx+2] != currenttile&&posy>-height&&posy<=0&&posx<width&&posx>=0) {
				data[-posy*width+posx+2] = currenttile;
				this.updateTileMap();
			}
		}
	}
	
	this.updateTileMap = function() {
		
		while(wgMain.first_ent.next!=0)
			wgMain.first_ent.next.destroy();
		wgMain.first_ent = new wgEntity();
		
		if(data[0]!=width&&data[1]!=height)
			data.unshift(width,height);
		
		wgTileMap.data = 0;
		wgTileMap.sdata = data;
		wgTileMap.generate(1);
		document.getElementById("testlevel").value = wgTileMap.sdata;
		reset = 1;
		//cursor.object.moveToFront();
	}
};