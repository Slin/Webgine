//
//	wgTexture.js
//	Webgine
//
//	Created by Nils Daumann on 29.10.11.
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


var wgTexture = new function()
{
	this.isPowerOfTwo = function(x)
	{
		return (x&(x-1)) == 0;
	};

    this.getTexture = function(filename,mode)
    {
        if(!wgResource.getResource(filename))
		{
            //erstellen und laden einer Textur...
            var texid = wgMain.gl.createTexture();
			texid.size = {x: 1, y: 1};
			wgResource.addResource(filename, texid);
			
            var image = new Image();
            
            image.onload = function()
            {
                wgMain.gl.bindTexture(wgMain.gl.TEXTURE_2D, texid);
                wgMain.gl.pixelStorei(wgMain.gl.UNPACK_FLIP_Y_WEBGL, true);
                
                if(mode) {
                    wgMain.gl.texParameteri(wgMain.gl.TEXTURE_2D, wgMain.gl.TEXTURE_MAG_FILTER, wgMain.gl.NEAREST);
                    wgMain.gl.texParameteri(wgMain.gl.TEXTURE_2D, wgMain.gl.TEXTURE_MIN_FILTER, wgMain.gl.NEAREST);
                } else {
                    wgMain.gl.texParameteri(wgMain.gl.TEXTURE_2D, wgMain.gl.TEXTURE_MAG_FILTER, wgMain.gl.LINEAR);
                    wgMain.gl.texParameteri(wgMain.gl.TEXTURE_2D, wgMain.gl.TEXTURE_MIN_FILTER, wgMain.gl.LINEAR);
                }
				
				if(wgTexture.isPowerOfTwo(image.width) && wgTexture.isPowerOfTwo(image.height))
				{
					wgMain.gl.texParameteri(wgMain.gl.TEXTURE_2D, wgMain.gl.TEXTURE_WRAP_S, wgMain.gl.REPEAT);
					wgMain.gl.texParameteri(wgMain.gl.TEXTURE_2D, wgMain.gl.TEXTURE_WRAP_T, wgMain.gl.CLAMP_TO_EDGE);
				}else
				{
					wgMain.gl.texParameteri(wgMain.gl.TEXTURE_2D, wgMain.gl.TEXTURE_WRAP_S, wgMain.gl.CLAMP_TO_EDGE);
					wgMain.gl.texParameteri(wgMain.gl.TEXTURE_2D, wgMain.gl.TEXTURE_WRAP_T, wgMain.gl.CLAMP_TO_EDGE);
				}
				
				texid.size = {x: image.width, y: image.height};
                
				
                wgMain.gl.texImage2D(wgMain.gl.TEXTURE_2D, 0, wgMain.gl.RGBA, wgMain.gl.RGBA, wgMain.gl.UNSIGNED_BYTE, image);
                wgMain.gl.bindTexture(wgMain.gl.TEXTURE_2D, null);
            }
            
            image.onerror = function()
            {
                alert("Couldn´t load texture "+image.src);
                return 0;
            }
            
            image.src = filename;
        }
        
        return wgResource.getResource(filename);
    };
};