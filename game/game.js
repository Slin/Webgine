//
// wgMain.js
// Webgine
//
// Created by Nils Daumann on 30.10.11.
// Copyright (c) 2011 Nils Daumann

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var gGlobals = new function()
{
	this.player = 0;
	
	this.timer = 0;
	this.level = 0;
	this.nextlevel = 0;
	this.countgifts = 0;
	this.countgiftsoverall = 0;
	this.lvlbl=0,this.lvlbr=0,this.lvlbt=0,this.lvlbd=0;
};

function gNextLevel() 
{
	gGlobals.level = gGlobals.nextlevel;
	gRestart();
}

function gRestart() 
{
	wgKeyboard.onEnter = 0;
	
	// delete old lvl
	while(wgMain.first_ent.next!=0)
		wgMain.first_ent.next.destroy();
	wgMain.first_ent = new wgEntity();
	gGlobals.level();
	gCalcGifts();
	gGiftOutput();
	gGlobals.player.object.moveToFront();
	gGlobals.timer = 0;
	
	if(document.getElementById("infobig").style.display == 'block') {
		document.getElementById("infobig").style.display = 'none';
		document.getElementById("timer").style.display = 'block';
		document.getElementById("counter").style.display = 'block';
	}
}

function gCalcGifts() {
	//Get Number of presents
	var temp = wgTileMap.data.match(/11/g);
	if(temp!=undefined&&temp.length>0) {
		gGlobals.countgiftsoverall = temp.length;
		gGlobals.countgifts = 0;
	}
	
}

function gFoundGift()
{
	//count
	gGlobals.countgifts++;
	gGiftOutput();
}

function gGiftOutput() {
	if(gGlobals.countgifts==gGlobals.countgiftsoverall) {
		if(gGlobals.nextlevel == 0)
		{
			if(gGlobals.level == level_0_1)
			{
				document.getElementById("infobig").innerHTML = "<h2>Gratulation!</h2><br/>Du hast alle Geschenke gefunden in einer Zeit von nur <span>"+Math.round(gGlobals.timer*100)/100+" Sekunden</span>.<br/><br/><b>Du hast alle bisher spielbaren Levels gespielt, ab 1. Dezember gibt es mehr!</b><br/><br/><button id=\"restart\">Neuer Versuch</button> <button id=\"nextlevel\">Erneut spielen</button>";
			}else
			{
				document.getElementById("infobig").innerHTML = "<h2>Gratulation!</h2><br/>Du hast alle Geschenke gefunden in einer Zeit von nur <span>"+Math.round(gGlobals.timer*100)/100+" Sekunden</span>.<br/><br/><b>Du hast alle bisher spielbaren Levels gespielt, morgen gibt es mehr!</b><br/><br/><button id=\"restart\">Neuer Versuch</button> <button id=\"nextlevel\">Erneut spielen</button>";
			}
			gGlobals.nextlevel = level_0_0;
		}else
		{
			document.getElementById("infobig").innerHTML = "<h2>Gratulation!</h2><br/>Du hast alle Geschenke gefunden in einer Zeit von nur <span>"+Math.round(gGlobals.timer*100)/100+" Sekunden</span>.<br/><br/><button id=\"restart\">Neuer Versuch</button> <button id=\"nextlevel\">N&auml;chstes Level</button>";
		}
		document.getElementById("infobig").style.display = 'block';
		document.getElementById("timer").style.display = 'none';
		document.getElementById("counter").style.display = 'none';		
		document.getElementById("nextlevel").onclick = gNextLevel;
		document.getElementById("restart").onclick = gRestart;
		wgKeyboard.onEnter = gNextLevel;
	}
	else
		document.getElementById("counter").innerHTML = "<img src=\"game/present01.png\"/> "+gGlobals.countgifts+" / "+gGlobals.countgiftsoverall;
}

var musicplaying = "song0";
function toggleMusic()
{
	if(musicplaying != 0)
	{
		wgAudio.stopAudio(musicplaying);
		musicplaying = 0;
	}else
	{
		wgAudio.playAudio("song0", 1);
		musicplaying = "song0";
	}
}

var audioplaying = 1;
function toggleAudio()
{
	if(audioplaying == 1)
	{
		wgAudio.muteSounds();
		audioplaying = 0;
	}else
	{
		wgAudio.unmuteSounds();
		audioplaying = 1;
	}
}

function gameevent(ts)
{
	if(gGlobals.countgifts==gGlobals.countgiftsoverall)
		return;
	
	gGlobals.timer += ts/1000.0;
	document.getElementById("timer").innerHTML = Math.round(gGlobals.timer*100.0)/100.0;
}

function gTestInit() {
	document.getElementById("dev").innerHTML = "<br/>Testumgebung<br/><textarea id=\"testlevel\" rows=\"3\" cols=\"100\"></textarea><br/><br/><button id=\"test\">Test Level</button> <button id=\"nextlvl\">Next Level</button>";
	document.getElementById("test").onclick = gTest;
	document.getElementById("nextlvl").onclick = gNextLevel;
}

function gTest()
{
	// delete old lvl
	while(wgMain.first_ent.next!=0)
		wgMain.first_ent.next.destroy();
	wgMain.first_ent = new wgEntity();

	wgTileMap.data = document.getElementById("testlevel").value;
	wgTileMap.generate();
	gCalcGifts();
	gGiftOutput();
	gGlobals.timer = 0;
	//gGlobals.player.object.moveToFront();
	wgCamera.update(player.pos.x,player.pos.y);
}

function main()
{
	wgMain.initWebgine(gameevent);
	
	gIniTiles();
	
	gGlobals.level = level_0_0;
	
	if(document.getElementById("level") != null)
	{
		switch(parseInt(document.getElementById("level").value))
		{
			case 0:
				gGlobals.level = level_0_0;
				break;
			
/*			case 1:
				gGlobals.level = level_1_0;
				break;
				
			case 2:
				gGlobals.level = level_2_0;
				break;*/
		}
	}
	
	gRestart();
	wgKeyboard.onEntf = gRestart;
	wgAudio.playAudio("song0", 1);
	
	// Enable Testenv
	//gTestInit();
	
	wgMain.mainLoop();
}