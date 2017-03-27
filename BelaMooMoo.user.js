// ==UserScript==
// @name        BelaMooMoo
// @namespace   buffPenta
// @description buff penta shot
// @version     1.1
// @author      Bela
// @include     http://moomoo.io/*
// @run-at      document-start
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

window.addEventListener('keyup', function(e)
{
    var key = e.keyCode || e.which;
    if(lastFocused && !e.shiftKey)
    {
        GM_setValue("GM_Dobl_Key"+key, 0);
        holdingKey[key] = false;
    }
    if(key == 90)
    {
        callback = true;
    }
});

window.addEventListener('keydown', function(e)
{
    var key = e.keyCode || e.which;
    if(lastFocused && !e.shiftKey)
    {
        GM_setValue("GM_Dobl_Key"+key, 1);
        holdingKey[key] = true;
    }
});

var holdingMouse = {};
var holdingKey = {};
var canvas = null;
var clipX = -1;
var clipY = -1;

function GetCoordClamp(mouseX, mouseY){var ret = {};var hsx = window.innerWidth / 2;var hsy = window.innerHeight / 2;var amx = mouseX - hsx;var amy = mouseY - hsy;var dc = 0.96;if((amx > -hsx * dc) && (amx < hsx * dc) && (amy > -hsy * dc) && (amy < hsy * dc)){ret[0] = mouseX;ret[1] = mouseY;return ret;}else{var fA = (amx * hsy) - (amy * hsx);var fB = (amx * hsy) + (amy * hsx);if(fA > 0){if(fB > 0){amy = amy * (hsx * dc / amx);amx = hsx * dc;}else{amx = amx * (-hsy * dc / amy);amy = -hsy * dc;}}else{if(fB > 0){amx = amx * (hsy * dc / amy);amy = hsy * dc;}else{amy = amy * (-hsx * dc / amx);amx = -hsx * dc;}}ret[0] = amx + hsx;ret[1] = amy + hsy;}return ret;}
function rotateAngle(x, y, deg){var ret = {};if(deg === 0){ret[0] = x;ret[1] = y;}else{var transX = Math.cos(deg * Math.PI / 180);var transY = Math.sin(deg * Math.PI / 180);ret[0] = x * transX - y * transY;ret[1] = y * transX + x * transY;}return ret;}
var timeStart = new Date().getTime();var timeNow = timeStart;var timePassed = 0;var timeLast = timeStart;var timeUnit = 60;
function loop()
{
    timeNow = new Date().getTime();
    timePassed = timeNow - timeStart;
    if(timeNow - timeLast > timeUnit && callback)
    {
        callback = false;
        timeLast = timeNow;
        tick();
        simulateKeyPress(90, true);
        simulateKeyPress(90, false);
    }
}
setInterval(loop, 40);
var callback = true;
var div_allianceButton = null;
var div_allianceMenu = null;
var div_allianceHolder = null;
var div_allianceManager = null;
var div_mainMenu = null;
var div_enterButton = null;
var div_nameInput = null;
var div_leaderboard = null;
var div_noticationDisplay = null;
var div_partyButton = null;
var div_upgradeHolder = null;

var div_actionBarItem = {};

var isInMenu = true;
var hasJoined = false;

var lastFocused = false;
var focusID = -1;

var clickAttemptCounter = 0;

var belacanvas = null;
var belactx = null;

function tick()
{
    if(document.hasFocus())
    {
        focusID = Math.random();
        GM_setValue("GM_Dobl_FocusID", focusID);
    }
    lastFocused = focusID == GM_getValue("GM_Dobl_FocusID");

    if(canvas === null)
    {
        canvas = document.getElementById("gameCanvas");
        if(!canvas)
        {
            return;
        }
        canvas.addEventListener('mousemove', function(e)
        {
            if(lastFocused && !e.shiftKey)
            {
                GM_setValue("GM_Dobl_MouseX", e.clientX / window.innerWidth);
                GM_setValue("GM_Dobl_MouseY", e.clientY / window.innerHeight);
                GM_setValue("GM_Dobl_MouseRelX", e.clientX - (window.innerWidth / 2));
                GM_setValue("GM_Dobl_MouseRelY", e.clientY - (window.innerHeight / 2));
            }
        });
        canvas.addEventListener('mousedown', function(e)
        {
            if(lastFocused && !e.shiftKey)
            {
                var button = e.button;
                GM_setValue("GM_Dobl_Mouse"+button, 1);
                holdingMouse[button] = true;
            }
        });
        canvas.addEventListener('mouseup', function(e)
        {
            if(lastFocused && !e.shiftKey)
            {
                var button = e.button;
                GM_setValue("GM_Dobl_Mouse"+button, 0);
                holdingMouse[button] = false;
            }
        });
    }
    else
    {
        if(div_nameInput === null || div_nameInput === undefined){div_nameInput = document.getElementById("nameInput");}
        if(div_mainMenu === null || div_mainMenu === undefined){div_mainMenu = document.getElementById("mainMenu");}
        if(div_leaderboard === null || div_leaderboard === undefined){div_leaderboard = document.getElementById("leaderboard");}
        if(div_allianceHolder === null || div_allianceHolder === undefined){div_allianceHolder = document.getElementById("allianceHolder");}
        if(div_allianceMenu === null || div_allianceMenu === undefined){div_allianceMenu = document.getElementById("allianceMenu");}
        if(div_allianceButton === null || div_allianceButton === undefined){div_allianceButton = document.getElementById("allianceButton");}
        if(div_allianceManager === null || div_allianceManager === undefined){div_allianceManager = document.getElementById("allianceManager");}
        if(div_noticationDisplay === null || div_noticationDisplay === undefined){div_noticationDisplay = document.getElementById("noticationDisplay");}
        if(div_partyButton === null || div_partyButton === undefined){div_partyButton = document.getElementById("partyButton");}
        if(div_upgradeHolder === null || div_upgradeHolder === undefined){div_upgradeHolder = document.getElementById("upgradeHolder");}

        for(var i = 0; i < 12; i++)
        {
            if(div_actionBarItem[i] === null || div_actionBarItem[i] === undefined){div_actionBarItem[i] = document.getElementById("actionBarItem"+i);}
        }
        if(div_mainMenu !== null && div_mainMenu !== undefined)
        {
            isInMenu = div_mainMenu.style.display !== "none";
        }
        if(div_enterButton === null || div_enterButton === undefined)
        {
            var enterSuper = document.getElementById("setupCard");
            if(enterSuper !== null && enterSuper !== undefined)
            {
                for (var i = 0; i < enterSuper.childNodes.length; i++)
                {
                    if (enterSuper.childNodes[i].className == "menuButton")
                    {
                        div_enterButton = enterSuper.childNodes[i];
                        break;
                    }
                }
            }
        }

        if(div_enterButton !== null && isInMenu && !lastFocused)
        {
            clickAttemptCounter = (clickAttemptCounter + 1) % 60;
            if(clickAttemptCounter === 0)
            {
                div_enterButton.click();
            }
        }
        if(div_partyButton !== null && lastFocused)
        {
            clickAttemptCounter = (clickAttemptCounter + 1) % 60;
            if(clickAttemptCounter === 0)
            {
                div_partyButton.click();
            }
        }

        SyncMouse();
        SyncKeys();
    }
}

function clipArrowBrackets(string)
{
    return string.replace(/ *\<[^>]*\) */g, "");
}

function SyncKeys()
{
    var left = GM_getValue("GM_Dobl_Key37");
    var up = GM_getValue("GM_Dobl_Key38");
    var right = GM_getValue("GM_Dobl_Key39");
    var down = GM_getValue("GM_Dobl_Key40");

    var key_e = GM_getValue("GM_Dobl_Key69");
    var key_w = GM_getValue("GM_Dobl_Key87");
    var key_a = GM_getValue("GM_Dobl_Key65");
    var key_s = GM_getValue("GM_Dobl_Key83");
    var key_d = GM_getValue("GM_Dobl_Key68");

    var num_1 = GM_getValue("GM_Dobl_Key49");
    var num_2 = GM_getValue("GM_Dobl_Key50");
    var num_3 = GM_getValue("GM_Dobl_Key51");
    var num_4 = GM_getValue("GM_Dobl_Key52");
    var num_5 = GM_getValue("GM_Dobl_Key53");
    if(holdingKey[37] != left){holdingKey[37] = left;simulateKeyPress(37, left);}
    if(holdingKey[38] != up){holdingKey[38] = up;simulateKeyPress(38, up);}
    if(holdingKey[39] != right){holdingKey[39] = right;simulateKeyPress(39, right);}
    if(holdingKey[40] != down){holdingKey[40] = down;simulateKeyPress(40, down);}

    if(holdingKey[49] != num_1){holdingKey[49] = num_1;simulateKeyPress(49, num_1);}
    if(holdingKey[50] != num_2){holdingKey[50] = num_2;simulateKeyPress(50, num_2);}
    if(holdingKey[51] != num_3){holdingKey[51] = num_3;simulateKeyPress(51, num_3);}
    if(holdingKey[52] != num_4){holdingKey[52] = num_4;simulateKeyPress(52, num_4);}
    if(holdingKey[53] != num_5){holdingKey[53] = num_5;simulateKeyPress(53, num_5);}

    if(holdingKey[87] != key_w){holdingKey[87] = key_w;simulateKeyPress(87, key_w);}
    if(holdingKey[83] != key_s){holdingKey[83] = key_s;simulateKeyPress(83, key_s);}
    if(holdingKey[68] != key_d){holdingKey[68] = key_d;simulateKeyPress(68, key_d);}
    if(holdingKey[65] != key_a){holdingKey[65] = key_a;simulateKeyPress(65, key_a);}
    if(holdingKey[69] != key_e){holdingKey[69] = key_e;simulateKeyPress(69, key_e);}
}


function SyncMouse()
{
    var dX = GM_getValue("GM_Dobl_MouseRelX");
    var dY = GM_getValue("GM_Dobl_MouseRelY");
    var button0 = GM_getValue("GM_Dobl_Mouse0");
    var button1 = GM_getValue("GM_Dobl_Mouse1");
    var button2 = GM_getValue("GM_Dobl_Mouse2");
    var finalX = dX + window.innerWidth / 2;
    var finalY = dY + window.innerHeight / 2;
    var clamped = GetCoordClamp(finalX, finalY);
    if(lastFocused){return;}
    simulateMouseMove(clamped[0], clamped[1]);
    if(holdingMouse[0] != button0){holdingMouse[0] = button0;simulateMousePress(0, clamped[0], clamped[1], button0);}
    if(holdingMouse[1] != button1){holdingMouse[1] = button1;simulateMousePress(1, clamped[0], clamped[1], button1);}
    if(holdingMouse[2] != button2){holdingMouse[2] = button2;simulateMousePress(2, clamped[0], clamped[1], button2);}
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
