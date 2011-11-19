function level1() {
  wgTileMap.addTile(1, aEnemy, { tex: "sample_0/edt.png", 
                                 texinfo: {cols:2, rows:2, width:256, height:256, set:0},
                                 texani: {from:0, to:3, speed:0.2, cycle:1},
                                 group: 1, 
                                 atyp: 1
                               });
  
	wgTileMap.addTile(2, aSolid, {tex: "sample_0/worldatlas.png",
                                    texinfo: {cols:4, rows:4, width:256, height:256, set:2},   //2topleft
                                    group: 0},
                                   {tex: "sample_0/worldatlas.png",
                                    texinfo: {cols:4, rows:4, width:256, height:256, set:0}   //3top
                                    ,group: 0},
                                   {tex: "sample_0/worldatlas.png",
                                    texinfo: {cols:4, rows:4, width:256, height:256, set:3}   //4topright
                                    ,group: 0},
                                   {tex: "sample_0/worldatlas.png",
                                    texinfo: {cols:4, rows:4, width:256, height:256, set:4}   //5left
                                    ,group: 0},
                                   {tex: "sample_0/worldatlas.png",
                                    texinfo: {cols:4, rows:4, width:256, height:256, set:6}   //6right
                                    ,group: 0},
                                   {tex: "sample_0/worldatlas.png",
                                    texinfo: {cols:4, rows:4, width:256, height:256, set:1}   //7def
                                    ,group: 0},
                                   {tex: "sample_0/worldatlas.png",
                                    texinfo: {cols:4, rows:4, width:256, height:256, set:7}  //8def2
                                    ,group: 0}
                               );
                               
  wgTileMap.addTile(3, aSolid, { tex: "sample_0/worldatlas.png",
                                    texinfo: {cols:4, rows:4, width:256, height:256, set:8}
                                    ,group: 0
                               });
  
  wgTileMap.addTile(4, aSolid, { tex: "sample_0/worldatlas.png",
                                    texinfo: {cols:4, rows:4, width:256, height:256, set:5},
                                    group: 1
                               });
  
  wgTileMap.addTile(5, aSolid, { tex: "sample_0/worldatlas.png",
                                    texinfo: {cols:4, rows:4, width:256, height:256, set:9},
                                    group: 1
                               });
                               
  
	wgTileMap.offset.x = -400;
	wgTileMap.offset.y = 200;
	wgTileMap.width = 7;
	wgTileMap.height = 5;
	
	wgTileMap.data = new Array(  0,5,0,5,1,0,0,
                               0,4,0,4,0,0,0,
                               0,2,2,2,2,0,0,
                               2,0,0,0,2,2,0,
                               2,0,2,2,2,2,0);
	
	wgTileMap.generate();
}