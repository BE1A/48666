// ==UserScript==
// @name        OWOP
// @namespace   buff penta
// @description hax
// @version     1
// @author      Bela
// @include     http://ourworldofpixels.com/
// @run-at      document-start
// @grant       GM_getValue
// @grant       GM_setValue
// @downloadURL none
// @updateURL   none
// ==/UserScript==
var lastcursorx = 0;
var lastcursory = 0;
var undefPut = true;
var canNext = true;
var offX = 0;
var offY = 0;
window.addEventListener('keyup', function(e)
{
    var key = e.keyCode || e.which;
    if(key == 90)
    {
        canNext = true;
    }
    else if(key == 87)
    {
        offY -= 1;
    }
    else if(key == 83)
    {
        offY += 1;
    }
    else if(key == 68)
    {
        offX += 1;
    }
    else if(key == 65)
    {
        offX -= 1;
    }
});

function loop()
{
    if(!canNext || typeof socket == "undefined")
    {
        return;
    }
    canNext = false;
    if(!undefPut || typeof put != "undefined")
    {
        if(document.hasFocus())
        {
            GM_setValue("camx", camx);
            GM_setValue("camy", camy);
            GM_setValue("cursorx", cursorx);
            GM_setValue("cursory", cursory);
            GM_setValue("chnkx", chnkx);
            GM_setValue("chnky", chnky);
            GM_setValue("pixlx", pixlx);
            GM_setValue("pixly", pixly);
            GM_setValue("r", rgb[rgbn][0]);
            GM_setValue("g", rgb[rgbn][1]);
            GM_setValue("b", rgb[rgbn][2]);
        }
        else
        {
            var maincamx = GM_getValue("camx");
            var maincamy = GM_getValue("camy");
            var maincursorx = GM_getValue("cursorx");
            var maincursory = GM_getValue("cursory");
            var mainchnkx = GM_getValue("chnkx");
            var mainchnky = GM_getValue("chnky");
            var mainpixlx = GM_getValue("pixlx");
            var mainpixly = GM_getValue("pixly");
            rgb[rgbn][0] = GM_getValue("r");
            rgb[rgbn][1] = GM_getValue("g");
            rgb[rgbn][2] = GM_getValue("b");
            if(camx != maincamx || camy != maincamy)
            {
                camx = maincamx;
                camy = maincamy;
                updatevisible();
            }
            cursorx = maincursorx + offX * 16;
            cursory = maincursory + offY * 16;
            chnkx = mainchnkx;
            chnky = mainchnky;
            pixlx = mainpixlx;
            pixly = mainpixly;
            var xOffset = offX;
            var yOffset = offY;
            pixlx += xOffset;
            pixly += yOffset;
            if(pixlx > 15)
            {
                chnkx += Math.floor(pixlx / 16);
                pixlx = pixlx % 16;
            }
            if(pixly > 16)
            {
                chnky += Math.floor(pixly / 16);
                pixly = pixly % 16;
            }
            if(pixlx < 0)
            {
                chnkx -= Math.ceil(-pixlx / 16);
                pixlx = -(-pixlx % 16);
            }
            if(pixly < 0)
            {
                chnky -= Math.ceil(-pixly / 16);
                pixly = -(-pixly % 16);
            }
        }
        put2(0);
        undefPut = false;
        //clicking = true;
        //dragnpaint = true;
    }
    simulateKeyPress(90, true);
    simulateKeyPress(90, false);
}
setInterval(loop, 80);

function put2(btn){
	var ref = map[[chnkx, chnky]];
	if(socket.readyState != socket.OPEN || !ref) {return;};
	switch(tool){
		case 0:
			var paint = true;
			var sel = rgb[rgbn];
			switch(btn){
				case 1:
					var nrgb = new Uint8Array(
						[ref[0][(pixly * 16 + pixlx) * 3],
						ref[0][(pixly * 16 + pixlx) * 3 + 1],
						ref[0][(pixly * 16 + pixlx) * 3 + 2]]);
					var i = findrgb(nrgb);
					if(i == -1){
						rgbn = 0;
						rgb.unshift(nrgb);
					} else {
						rgbn = i;
					}
					paint = false;
					break;
				case 2:
					sel = [255, 255, 255];
					break;
			}
			if(paint && !(ref[0][(pixly * 16 + pixlx) * 3] == sel[0] &&
				ref[0][(pixly * 16 + pixlx) * 3 + 1] == sel[1] &&
				ref[0][(pixly * 16 + pixlx) * 3 + 2] == sel[2]) && pbuckt.canspend(1)){
				undos.push([cursorx >> 4, cursory >> 4, pixlx << 4 | pixly,
					ref[0][(pixly * 16 + pixlx) * 3],
					ref[0][(pixly * 16 + pixlx) * 3 + 1],
					ref[0][(pixly * 16 + pixlx) * 3 + 2]]);
				updatechunk(ref, pixlx, pixly, sel);
				var arr = new ArrayBuffer(11);
				var dv = new DataView(arr);
				dv.setInt32(0, cursorx >> 4, true);
				dv.setInt32(4, cursory >> 4, true);
				dv.setUint8(8, sel[0]);
				dv.setUint8(9, sel[1]);
				dv.setUint8(10, sel[2]);
				socket.send(arr);
			}
			break;
		case 2:
			var nrgb = new Uint8Array(
				[ref[0][(pixly * 16 + pixlx) * 3],
				ref[0][(pixly * 16 + pixlx) * 3 + 1],
				ref[0][(pixly * 16 + pixlx) * 3 + 2]]);
			var i = findrgb(nrgb);
			if(i == -1){
				rgbn = 0;
				rgb.unshift(nrgb);
			} else {
				rgbn = i;
			}
			break;

		case 3:
			var cl = false;
			for(var i = ref[0].length; i--;){
				if(ref[0][i] != 255){
					cl = true;
					break;
				}
			}
			if(cl){
				var arr = new ArrayBuffer(9);
				var dv = new DataView(arr);
				dv.setInt32(0, chnkx, true);
				dv.setInt32(4, chnky, true);
				dv.setUint8(8, 0);
				socket.send(arr);
			}
			break;
	}
}

function simulateKeyPress(key, hold)
{
    var eventObj;
    if(hold)
    {
        eventObj = document.createEvent("Events"); eventObj.initEvent("keydown", true, true); eventObj.keyCode = key; window.dispatchEvent(eventObj);
    }
    else
    {
        eventObj = document.createEvent("Events"); eventObj.initEvent("keyup", true, true); eventObj.keyCode = key; window.dispatchEvent(eventObj);
    }
}
function simulateMousePress(button, clientX, clientY, press)
{
    if(press)
    {
        canvas.dispatchEvent(new MouseEvent('mousedown', { 'clientX': clientX, 'clientY': clientY, 'button': button, 'mozPressure' : 1.0 }));
    }
    else{
        canvas.dispatchEvent(new MouseEvent('mouseup', { 'clientX': clientX, 'clientY': clientY, 'button': button, 'mozPressure' : 1.0 }));
    }
}
function simulateMouseMove(clientX, clientY)
{
    canvas.dispatchEvent(new MouseEvent('mousemove', { 'clientX': clientX, 'clientY': clientY }));
}
