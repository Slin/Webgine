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
		document.getElementById("counter").innerHTML = "Gratz! Alle Geschenke gefunden!<br/><button id=\"nextlevel\">N&auml;chstes Level Starten</button>";
		document.getElementById("nextlevel").onclick = gNextLevel;
		wgKeyboard.onEnter = gNextLevel;
	}
	else
		document.getElementById("counter").innerHTML = "Geschenke: "+gGlobals.countgifts+" / "+gGlobals.countgiftsoverall;
}

function gameevent(ts)
{
	
}

function main()
{
	wgMain.initWebgine(gameevent);
	
	gIniTiles();
	//set start level
	gGlobals.level = level0;
	gRestart();
	wgKeyboard.onEntf = gRestart;
	//wgAudio.playAudio("song0");
	wgMain.mainLoop();
}