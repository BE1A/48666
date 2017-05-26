// ==UserScript==
// @name         BelaHorde
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://hordes.io/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
if(GM_getValue("GM_Horde_ServerLock") != false && GM_getValue("GM_Horde_ServerLock") != true)
{
    GM_setValue("GM_Horde_ServerLock", true);
}
if(GM_getValue("GM_Horde_MoveLock") != false && GM_getValue("GM_Horde_MoveLock") != true)
{
    GM_setValue("GM_Horde_MoveLock", true);
}

var holdingKey = [];
document.body.addEventListener('keyup', function(e)
{
    var key = e.keyCode || e.which;
    if(key == 73)
    {
        simulateKeyPress(38, false);
    }
    else if(key == 74)
    {
        simulateKeyPress(37, false);
    }
    else if(key == 75)
    {
        simulateKeyPress(40, false);
    }
    else if(key == 76)
    {
        simulateKeyPress(39, false);
    }
    if(e.artificial)
    {

    }
    else
    {
        GM_setValue("GM_Horde_Key"+key, 0);
        holdingKey[key] = false;
    }
});

document.body.addEventListener('keydown', function(e)
{
    var key = e.keyCode || e.which;
    if(key == 73)
    {
        simulateKeyPress(38, true);
    }
    else if(key == 74)
    {
        simulateKeyPress(37, true);
    }
    else if(key == 75)
    {
        simulateKeyPress(40, true);
    }
    else if(key == 76)
    {
        simulateKeyPress(39, true);
    }
    if(e.artificial)
    {

    }
    else
    {
        if(key == 9)
        {
            GM_setValue("GM_Horde_MoveLock", !GM_getValue("GM_Horde_MoveLock"));
        }
        if(key == 192)
        {
            GM_setValue("GM_Horde_ServerLock", !GM_getValue("GM_Horde_ServerLock"));
        }
        GM_setValue("GM_Horde_Key"+key, 1);
        holdingKey[key] = true;
    }
});

//d = pickup
//u = press button, position, rotation
var antiJam = 0;
function loop()
{
    antiJam += 1;
    if(!document.playerX)
    {
        return;
    }
    if(document.hasFocus())
    {
        if(systembar.style.display != "none" && !GM_getValue("GM_Horde_ServerLock"))
        {
            GM_setValue("GM_Horde_Channel",cleanString(channelname.innerHTML).charAt(0));
        }
        GM_setValue("GM_Horde_PlayerX",document.playerX);
        GM_setValue("GM_Horde_PlayerY",document.playerZ);
        GM_setValue("GM_Horde_Angle",document.playerRotation);
    }
    else
    {
        var mainChannel = GM_getValue("GM_Horde_Channel");
        var theChannelString = cleanString(channelname.innerHTML).charAt(0);
        if(mainChannel != theChannelString)
        {
            var index = 0;
            if(mainChannel == "A"){index = 0;}
            if(mainChannel == "B"){index = 1;}
            if(mainChannel == "C"){index = 2;}
            if(mainChannel == "D"){index = 3;}
            //if(antiJam % 20 === 0){serverselectionlist[0].childNodes[index].childNodes[0].click();}
            //return;
        }
    }
    var tab = GM_getValue("GM_Horde_Key9");
    var key_a = GM_getValue("GM_Horde_Key65");
    var key_w = GM_getValue("GM_Horde_Key87");
    var key_d = GM_getValue("GM_Horde_Key68");
    var key_s = GM_getValue("GM_Horde_Key83");
    var left = GM_getValue("GM_Horde_Key37");
    var up = GM_getValue("GM_Horde_Key38");
    var right = GM_getValue("GM_Horde_Key39");
    var down = GM_getValue("GM_Horde_Key40");
    if(!document.hasFocus())
    {
        var mainPlayerX = GM_getValue("GM_Horde_PlayerX");
        var mainPlayerY = GM_getValue("GM_Horde_PlayerY");
        var mainPlayerAngle = GM_getValue("GM_Horde_Angle");
        if(document.playerX != -1 && document.playerZ != -1 && document.playerRotation != -1)
        {
            var difX = mainPlayerX - document.playerX;
            var difY = mainPlayerY - document.playerZ;
            var retted = rotateAngleRad(difX, difY, document.playerRotation);
            difX = retted[0];
            difY = retted[1];
            var retted2 = movementArray([0, 0], [difX, difY], 1.4);
            left = retted2[0];
            right = retted2[1];
            up = retted2[2];
            down = retted2[3];
            key_a = false;
            key_w = false;
            key_s = false;
            key_d = false;
            var modularAng = ((document.playerRotation - mainPlayerAngle) + (Math.PI * 2)) % (Math.PI * 2);
            if(modularAng > Math.PI && modularAng < (Math.PI * 2) - 0.3)
            {
                key_a = true;
            }
            if(modularAng > 0.3 && modularAng < Math.PI)
            {
                key_d = true;
            }
        }
        if(antiJam % 40 === 0)
        {
            right = false;
            up = false;
            left = false;
            down = false;
            key_a = false;
            key_w = false;
            key_s = false;
            key_d = false;
        }
    }
    if(GM_getValue("GM_Horde_MoveLock"))
    {
            right = false;
            up = false;
            left = false;
            down = false;
            key_a = false;
            key_w = false;
            key_s = false;
            key_d = false;
    }
    if(holdingKey[9] != tab){holdingKey[9] = tab;simulateKeyPress(9, tab);}
    if(holdingKey[65] != key_a){holdingKey[65] = key_a;simulateKeyPress(65, key_a);}
    if(holdingKey[68] != key_d){holdingKey[68] = key_d;simulateKeyPress(68, key_d);}
    if(holdingKey[83] != key_s){holdingKey[83] = key_s;simulateKeyPress(83, key_s);}
    if(holdingKey[87] != key_w){holdingKey[87] = key_w;simulateKeyPress(87, key_w);}
    if(holdingKey[37] != left){holdingKey[37] = left;simulateKeyPress(37, left);}
    if(holdingKey[38] != up){holdingKey[38] = up;simulateKeyPress(38, up);}
    if(holdingKey[39] != right){holdingKey[39] = right;simulateKeyPress(39, right);}
    if(holdingKey[40] != down){holdingKey[40] = down;simulateKeyPress(40, down);}

    if(deathScreen.style.display && deathScreen.style.display != "none")
    {
        //respawnButton.click();
    }
}

setInterval(loop, 60);

function cleanString(string)
{
    return string.replace(/<.*?>/g, "");
}

function simulateKeyPress(key, hold, indiv)
{
    var eventObj;
    eventObj = document.createEvent("Events");
    if(hold)
    {
        eventObj.initEvent("keydown", true, true);
    }
    else
    {
        eventObj.initEvent("keyup", true, true);
    }
    eventObj.keyCode = key;
    eventObj.indiv = indiv;
    eventObj.artificial = true;
    document.body.dispatchEvent(eventObj);
}

function simulateMousePress(button, clientX, clientY, press)
{
    if(press)
    {
        document.dispatchEvent(new MouseEvent('mousedown', { 'clientX': clientX, 'clientY': clientY, 'button': button, 'mozPressure' : 1.0 }));
    }
    else
    {
        document.dispatchEvent(new MouseEvent('mouseup', { 'clientX': clientX, 'clientY': clientY, 'button': button, 'mozPressure' : 1.0 }));
    }
}
function simulateMouseMove(clientX, clientY)
{
    document.dispatchEvent(new MouseEvent('mousemove', { 'clientX': clientX, 'clientY': clientY, 'pageX': clientX, 'pageY': clientY}));
}
function simulateMouseClick(button, clientX, clientY)
{
    document.dispatchEvent(new MouseEvent('click', { 'clientX': clientX, 'clientY': clientY, 'button': button, 'mozPressure' : 1.0 }));
}

var const_PI = Math.PI;
function movementArray(thisPosition, targetPosition, radius){var ret = {};var deficitX = targetPosition[0] - thisPosition[0];var deficitY = targetPosition[1] - thisPosition[1];var left = false;var right = false;var up = false;var down = false;if(deficitX * deficitX + deficitY * deficitY > radius * radius){L1 = deficitY * 0.923 - deficitX * 0.382;L2 = deficitY * 0.382 - deficitX * 0.923;L3 = -deficitX * 0.923 - deficitY * 0.382;L4 = -deficitX * 0.382 - deficitY * 0.923;if(L4 >= 0 && L1 >= 0){left = true;}else if(L1 <= 0 && L2 >= 0){left = true;up = true;}else if(L2 <= 0 && L3 >= 0){up = true;}else if(L3 <= 0 && L4 >= 0){up = true;right = true;}else if(L4 <= 0 && L1 <= 0){right = true;}else if(L1 >= 0 && L2 <= 0){right = true;down = true;}else if(L2 >= 0 && L3 <= 0){down = true;}else{down = true;left = true;}}ret[0] = left;ret[1] = right;ret[2] = up;ret[3] = down;return ret;}
function rotateAngleDeg(x, y, deg){var ret = {};if(deg === 0){ret[0] = x;ret[1] = y;}else{var transX = Math.cos(deg * const_PI / 180);var transY = Math.sin(deg * const_PI / 180);ret[0] = x * transX - y * transY;ret[1] = y * transX + x * transY;}return ret;}
function rotateAngleRad(x, y, rad){var ret = {};if(rad === 0){ret[0] = x;ret[1] = y;}else{var transX = Math.cos(rad);var transY = Math.sin(rad);ret[0] = x * transX - y * transY;ret[1] = y * transX + x * transY;}return ret;}
