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
	wgCamera.set(gGlobals.player.object.pos.x,gGlobals.player.object.pos.y);
	
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

var musicplaying = "song1";
function toggleMusic()
{
	if(musicplaying != 0)
	{
		document.getElementById("music").src = "game/play_icon.png";
		wgAudio.stopAudio(musicplaying);
		musicplaying = 0;
	}else
	{
		document.getElementById("music").src = "game/stop_icon.png";
		wgAudio.playAudio("song1", 1);
		musicplaying = "song1";
	}
}

var audioplaying = 1;
function toggleSound()
{
	if(audioplaying == 1)
	{
		wgAudio.muteAudio("song1");
		document.getElementById("sound").src = "game/unmute_icon.png";
		wgAudio.muteSounds();
		audioplaying = 0;
	}else
	{
		wgAudio.unmuteAudio("song1");
		document.getElementById("sound").src = "game/mute_icon.png";
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
			
			case 1:
				gGlobals.level = level_1_0;
				break;
				
			case 2:
				gGlobals.level = level_2_0;
				break;
				
			case 3:
				gGlobals.level = level_3_0;
				break;
				
			case 4:
				gGlobals.level = level_4_0;
				break;
				
			case 5:
				gGlobals.level = level_5_0;
				break;
				
			case 6:
				gGlobals.level = level_6_0;
				break;
				
			case 7:
				gGlobals.level = level_7_0;
				break;
				
			case 8:
				gGlobals.level = level_8_0;
				break;
				
			case 9:
				gGlobals.level = level_9_0;
				break;
				
			case 10:
				gGlobals.level = level_10_0;
				break;
				
			case 11:
				gGlobals.level = level_11_0;
				break;
				
			case 12:
				gGlobals.level = level_12_0;
				break;
				
			case 13:
				gGlobals.level = level_13_0;
				break;
				
			case 14:
				gGlobals.level = level_14_0;
				break;
				
			case 15:
				gGlobals.level = level_15_0;
				break;
				
			case 16:
				gGlobals.level = level_16_0;
				break;
				
			case 17:
				gGlobals.level = level_17_0;
				break;
				
			case 18:
				gGlobals.level = level_18_0;
				break;
				
			case 19:
				gGlobals.level = level_19_0;
				break;
				
			case 20:
				gGlobals.level = level_20_0;
				break;
				
			case 21:
				gGlobals.level = level_21_0;
				break;
				
			case 22:
				gGlobals.level = level_22_0;
				break;
				
			case 23:
				gGlobals.level = level_23_0;
				break;
				
			case 24:
				gGlobals.level = level_24_0;
				break;
		}
	}
	
	gRestart();
	wgKeyboard.onEntf = gRestart;
	wgAudio.playAudio("song1", 1);
	
	// Enable Testenv
	//gTestInit();
	
	wgMain.mainLoop();
}