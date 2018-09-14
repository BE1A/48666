// ==UserScript==
// @name         LICHTTTT2
// @namespace    LICHH!!!?!T?
// @version      0.1
// @description  LIHTCCHTHTCTHTC!?!??!
// @author       LICHTCTCTC!!
// @include      http://diep.io/*
// @include      https://diep.io/*
// @grant        none
// ==/UserScript==

var picsLoaded = 0;
var picArray = [];

var lastButtonClicked;
var timeNow;
var isFirstTick = true;
var ticksPassed = 0;
var mouseOverriden = false;

var lastMouseX = 0;
var lastMouseY = 0;
var stackMode = -1;


function loadImage(lolol) {
    var img = new Image();
    img.canvas = document.createElement("canvas");
    img.ctx = img.canvas.getContext("2d");
    img.canvas.style.position = "absolute";
    img.crossOrigin = 'Anonymous';
    document.body.appendChild(img.canvas);
    document.body.insertBefore(img.canvas, document.body.childNodes[document.body.childNodes - 1]);
    img.onload = function ()
    {
        img.crossOrigin = 'Anonymous';
    };
    if(picsLoaded > 0)
    {
        var num = picsLoaded - 1;
        picArray[num] = img;
        img.canvas.addEventListener('mousedown', function(e){var button = e.button;if(button == 0){stackMode = num; lastButtonClicked = new Date().getTime(); isFirstTick = true;}});
    }
    picsLoaded += 1;
    img.src = lolol;
    return img;
}

function fire(t,w)
{
    setTimeout(function(){simulateKeyPress(32, true);}, t*1000*reloadMult);
    setTimeout(function(){simulateKeyPress(32, false);}, (t+w)*1000*reloadMult);
}

function hold(t,w)
{
    setTimeout(function(){simulateKeyPress(69, true);}, t*1000*reloadMult);
    setTimeout(function(){simulateKeyPress(69, false);}, (t+w)*1000*reloadMult);
}

var reload = 7;
var reloadMult = (2 - reload / 7);

function overrideMouse(boo)
{
    mouseOverriden = boo;
    if(boo)
    {
        IMG_Advanced.canvas.style.pointerEvents = "all";
    }
    else
    {
        IMG_Advanced.canvas.style.pointerEvents = "none";
    }
}

function mouseRotate(x,y,ang)
{
    var newXY = rotateAngle(x - window.innerWidth / 2, y - window.innerHeight / 2, ang);
    newXY[0] += window.innerWidth / 2;
    newXY[1] += window.innerHeight / 2;
    newXY = GetCoordClamp(newXY[0], newXY[1]);
    simulateMouseMove(newXY[0], newXY[1]);
}

var IMG_Advanced = loadImage("https://i.imgur.com/w1Afl2L.png");
var IMG_StackedPenta = loadImage("https://i.imgur.com/m2w3vaz.png");
IMG_StackedPenta.tick = function()
{
    if(isFirstTick)
    {
        hold(0.000,0.050);
        isFirstTick = false;
        overrideMouse(true);
    }
    var timeCog = ((ticksPassed) / 106.84) % 6;
    if(timeCog >= 3)
    {
        timeCog = -timeCog + 3;
    }
    mouseRotate(lastMouseX,lastMouseY,timeCog * 22.5);
};
var IMG_StackedOcto = loadImage("https://i.imgur.com/UWjpc0K.png");
IMG_StackedOcto.tick = function(){};
var IMG_StackedSpreda = loadImage("https://i.imgur.com/D6b7CUk.png");
IMG_StackedSpreda.tick = function(){};
var IMG_StackedHunter = loadImage("https://i.imgur.com/1It6rz7.png");
IMG_StackedHunter.tick = function()
{
    if(isFirstTick)
    {
        fire(0.000,0.050);
        hold(0.666,0.200);
        isFirstTick = false;
        overrideMouse(false);
    }
};
var IMG_StackedGunTrap = loadImage("https://i.imgur.com/EeJq9ot.png");
IMG_StackedGunTrap.tick = function()
{
    if(isFirstTick)
    {
        hold(0.000,0.050);
        isFirstTick = false;
        overrideMouse(true);
    }
    var timeCog = ((ticksPassed - 115) / 106.84) % 8;
    if(timeCog > 7 || timeCog < 2)
    {
        timeCog = 1;
    }
    else
    {
        timeCog = 0;
    }
    mouseRotate(lastMouseX,lastMouseY,timeCog * 180);
};
var IMG_StackedStream = loadImage("https://i.imgur.com/FkUVRdm.png");
IMG_StackedStream.tick = function()
{
    if(isFirstTick)
    {
        var unit = 0.04;
        var delay = 0.05;
        fire(0.000,delay);
        fire(unit,delay);
        fire(unit*2,delay);
        fire(unit*3,delay);
        hold(unit*4,delay);
        isFirstTick = false;
        overrideMouse(false);
    }
};
var IMG_StackedPreda = loadImage("https://i.imgur.com/Nq4Y242.png");
IMG_StackedPreda.tick = function()
{
    if(isFirstTick)
    {
        fire(0.000,0.100);
        fire(0.750,0.200);
        hold(1.500,0.200);
        isFirstTick = false;
        overrideMouse(false);
    }
};
var IMG_StackedTwin1 = loadImage("https://i.imgur.com/ytqRMkq.png");
IMG_StackedTwin1.tick = function(){};
var IMG_StackedTwin2 = loadImage("https://i.imgur.com/ecY0wGg.png");
IMG_StackedTwin2.tick = function(){};
var IMG_StackedTriplet1 = loadImage("https://i.imgur.com/f04tPwA.png");
IMG_StackedTriplet1.tick = function(){};
var IMG_StackedTriplet2 = loadImage("https://i.imgur.com/bnlgMI4.png");
IMG_StackedTriplet2.tick = function(){};
var IMG_StackedTriplet3 = loadImage("https://i.imgur.com/RkvvqK4.png");
IMG_StackedTriplet3.tick = function(){};

IMG_Advanced.canvas.style.pointerEvents = "none";
IMG_Advanced.canvas.addEventListener('mousemove', function(e)
{
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    if(!mouseOverriden)
    {
        simulateMouseMove(e.clientX, e.clientY);
    }
});

IMG_Advanced.canvas.addEventListener('mousedown', function(e)
{
    var button = e.button;
    if(!mouseOverriden)
    {
        simulateMousePress(button, lastMouseX, lastMouseY, true);
    }
});

IMG_Advanced.canvas.addEventListener('mouseup', function(e)
{
    var button = e.button;
    if(!mouseOverriden)
    {
        simulateMousePress(button, lastMouseX, lastMouseY, false);
    }
});

var advancedMode = false;
var screenPercentage = 0;
var advancedTimer = 0;

document.addEventListener('keyup', function(e)
{
    var key = e.keyCode || e.which;
    if(key == 20)
    {
        advancedMode = !advancedMode;
        if(advancedMode)
        {
            advancedTimer = 30;
        }
    }
});

function tick()
{
    var exp = 0.88;
    if(advancedMode)
    {
        screenPercentage = exp * screenPercentage + (1 - exp);
    }
    else
    {
        screenPercentage = exp * screenPercentage;
    }
    var sc = getScreenConstant();
    var sizi = sc / 18;
    var pOff = sc / 3 * (1 - screenPercentage);
    for(var i = 0; i < picsLoaded - 1; i++)
    {
        var moduloX = i % 4;
        var moduloY = Math.floor(i / 4);
        var offX = window.innerWidth - (moduloX) * (sizi + sc * 0.0045) - sc * 0.0045 - sc * 0.055 - sizi / 2 + pOff;
        var offY = (moduloY) * (sizi + sc * 0.0015) + sc * 0.064 - sizi / 2;
        picArray[i].canvas.width = sizi;
        picArray[i].canvas.height = sizi;
        picArray[i].canvas.style.left = offX + "px";
        picArray[i].canvas.style.top = offY + "px";
        picArray[i].ctx.drawImage(picArray[i], 0, 0, picArray[i].canvas.width, picArray[i].canvas.height);
    }

    IMG_Advanced.canvas.width = window.innerWidth;
    IMG_Advanced.canvas.height = window.innerHeight;
    IMG_Advanced.canvas.style.left = 0 + "px";
    IMG_Advanced.canvas.style.top = 0 + "px";
    IMG_Advanced.ctx.clearRect(0, 0, IMG_Advanced.canvas.width, IMG_Advanced.canvas.height);
    IMG_Advanced.ctx.globalAlpha = Math.max(0, advancedTimer / 15);
    var wid = 2560 / 2560 * sc / 1.5
    var height = 270 / 2560 * sc / 1.5;
    IMG_Advanced.ctx.drawImage(IMG_Advanced, (window.innerWidth - wid) / 2, (window.innerHeight - height) / 2, wid, height);

    if(stackMode != -1)
    {
        timeNow = new Date().getTime();
        ticksPassed = timeNow - lastButtonClicked;
        picArray[stackMode].tick();
    }
    advancedTimer -= 1;
}
setInterval(tick, 20);

function getScreenConstant(){if(window.innerWidth > window.innerHeight * 16 / 9){return window.innerWidth;}return window.innerHeight * 16 / 9;}
function rotateAngle(x, y, deg){var ret = {};if(deg === 0){ret[0] = x;ret[1] = y;}else{var transX = Math.cos(deg * Math.PI / 180);var transY = Math.sin(deg * Math.PI / 180);ret[0] = x * transX - y * transY;ret[1] = y * transX + x * transY;}return ret;}
function GetCoordClamp(mouseX, mouseY){var ret = {};var hsx = window.innerWidth / 2;var hsy = window.innerHeight / 2;var amx = mouseX - hsx;var amy = mouseY - hsy;var dc = 0.96;if((amx > -hsx * dc) && (amx < hsx * dc) && (amy > -hsy * dc) && (amy < hsy * dc)){ret[0] = mouseX;ret[1] = mouseY;return ret;}else{var fA = (amx * hsy) - (amy * hsx);var fB = (amx * hsy) + (amy * hsx);if(fA > 0){if(fB > 0){amy = amy * (hsx * dc / amx);amx = hsx * dc;}else{amx = amx * (-hsy * dc / amy);amy = -hsy * dc;}}else{if(fB > 0){amx = amx * (hsy * dc / amy);amy = hsy * dc;}else{amy = amy * (-hsx * dc / amx);amx = -hsx * dc;}}ret[0] = amx + hsx;ret[1] = amy + hsy;}return ret;}

function simulateKeyPress(key, press)
{
    if(press)
    {
        input.keyDown(key);
    }
    else
    {
        input.keyUp(key);
    }
}

function simulateMousePress(button, clientX, clientY, press)
{
    if(press)
    {
        canvas.dispatchEvent(new MouseEvent('mousedown', { 'clientX': clientX, 'clientY': clientY, 'button': button, 'mozPressure' : 1.0 }));
    }
    else
    {
        canvas.dispatchEvent(new MouseEvent('mouseup', { 'clientX': clientX, 'clientY': clientY, 'button': button, 'mozPressure' : 1.0 }));
    }
}

function simulateMouseMove(clientX, clientY)
{
    canvas.dispatchEvent(new MouseEvent('mousemove', { 'clientX': clientX, 'clientY': clientY }));
}
