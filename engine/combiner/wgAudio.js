//
//	wgAudio.js
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

var wgAudio = new function()
{
	this.maxchannels = 10;
	this.channels = new Array();
	for(i = 0; i < this.maxchannels; i++)
	{
		this.channels[i] = {audio : new Audio(), finished : -1};
	}

	this.playAudio = function(name)
	{
		document.getElementById(name).play();
	};
	
	this.stopAudio = function(name)
	{
		document.getElementById(name).pause();
		document.getElementById(name).currentTime = 0;
	};
	
	this.playSound = function(name)
	{
		var time = new Date();
		for(i = 0; i < this.channels.length; i++)
		{
			if(this.channels[i].finished < time.getTime())
			{
				var player = document.getElementById(name);
				var sources = player.getElementsByTagName("source");
				var source = 0;
				for(i = 0; i < sources.length; i++)
				{
					if(player.canPlayType(sources[i].type))
					{
						source = sources[i].src;
					}
				}
				
				this.channels[i].finished = time.getTime()+document.getElementById(name).duration*1000;
				this.channels[i].audio.src = source;
				this.channels[i].audio.load();
				this.channels[i].audio.play();
				break;
			}
		}
	};
};