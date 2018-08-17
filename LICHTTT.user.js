// ==UserScript==
// @name         LICHTTTT
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

function loadImage(lolol) {
    var img = new Image();
    img.canvas = document.createElement("canvas");
    img.ctx = img.canvas.getContext("2d");
    img.canvas.style.position = "absolute";
    img.crossOrigin = 'Anonymous';
    document.body.appendChild(img.canvas);
    document.body.insertBefore(img.canvas, document.body.childNodes[document.body.childNodes - 1]);
    img.onload = function () {
        img.crossOrigin = 'Anonymous';
        //img.canvas.width = img.width;
        //img.canvas.height = img.height;
        //img.ctx.drawImage(img, 0, 0, img.width, img.height);
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

var IMG_Advanced = loadImage("https://i.imgur.com/w1Afl2L.png");
var IMG_StackedPenta = loadImage("https://i.imgur.com/m2w3vaz.png");
IMG_StackedPenta.tick = function(){};
var IMG_StackedOcto = loadImage("https://i.imgur.com/UWjpc0K.png");
IMG_StackedOcto.tick = function(){};
var IMG_StackedSpreda = loadImage("https://i.imgur.com/D6b7CUk.png");
IMG_StackedSpreda.tick = function(){};
var IMG_StackedHunter = loadImage("https://i.imgur.com/1It6rz7.png");
IMG_StackedHunter.tick = function(){};
var IMG_StackedGunTrap = loadImage("https://i.imgur.com/EeJq9ot.png");
IMG_StackedGunTrap.tick = function(){};
var IMG_StackedStream = loadImage("https://i.imgur.com/FkUVRdm.png");
IMG_StackedStream.tick = function(){};
var IMG_StackedPreda = loadImage("https://i.imgur.com/Nq4Y242.png");
IMG_StackedPreda.tick = function()
{
    if(isFirstTick)
    {
        function fire(t,w) {
    setTimeout(function(){
        input.keyDown(32);
    }, t*1000);
    setTimeout(function(){
        input.keyUp(32);
    }, t*1000+w);
}

fire(0,100);
fire(0.75,200);
fire(1.5,750);
setTimeout(function(){input.keyDown(69);},2000);
    }
    isFirstTick = false;
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

var lastMouseX = 0;
var lastMouseY = 0;
var stackMode = -1;

IMG_Advanced.canvas.style.pointerEvents = "none";
IMG_Advanced.canvas.addEventListener('mousemove', function(e)
{
    lastMouseX = e.clientX;
    lastMouseX = e.clientY;
    simulateMouseMove(e.clientX, e.clientY);
});

IMG_Advanced.canvas.addEventListener('mousedown', function(e)
{
    var button = e.button;
    simulateMousePress(button, lastMouseX, lastMouseY, true);
});

IMG_Advanced.canvas.addEventListener('mouseup', function(e)
{
    var button = e.button;
    simulateMousePress(button, lastMouseX, lastMouseY, false);
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
        picArray[stackMode].tick();
    }
    advancedTimer -= 1;
}
setInterval(tick, 20);

function getScreenConstant(){if(window.innerWidth > window.innerHeight * 16 / 9){return window.innerWidth;}return window.innerHeight * 16 / 9;}
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
    else
    {
        canvas.dispatchEvent(new MouseEvent('mouseup', { 'clientX': clientX, 'clientY': clientY, 'button': button, 'mozPressure' : 1.0 }));
    }
}

function simulateMouseMove(clientX, clientY)
{
    canvas.dispatchEvent(new MouseEvent('mousemove', { 'clientX': clientX, 'clientY': clientY }));
}
