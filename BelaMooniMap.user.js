// ==UserScript==
// @name        BelaMooniMap
// @namespace   lol
// @description buff penta
// @version     1
// @author      Bela
// @include     http://moomoo.io/*
// @run-at      document-start
// @grant       GM_getValue
// @grant       GM_setValue
// @downloadURL none
// @updateURL   none
// ==/UserScript==

var belacanvas = null;
var belactx = null;
var canvas = null;
var timeStart = new Date().getTime();var timeNow = timeStart;var timePassed = 0;var timeLast = timeStart;var timeUnit = 60;
function loop()
{
    timeNow = new Date().getTime();
    timePassed = timeNow - timeStart;
    if(timeNow - timeLast > timeUnit)
    {
        timeLast = timeNow;
        tick();
    }
}
setInterval(loop, 40);

function tick()
{
    decode();
    if(canvas === null)
    {
        canvas = document.getElementById("gameCanvas");
        if(!canvas)
        {
            return;
        }
        belacanvas = document.createElement("canvas");
        belacanvas.id = "belacanvas";
        document.body.appendChild(belacanvas);
        document.body.insertBefore(belacanvas, document.body.childNodes[0]);
        belactx = belacanvas.getContext("2d");
        belacanvas.style.position = "absolute";
    }
}

var player_sid = -1;
var player_x = -1;
var player_y = -1;

//0 wood // 1 food // 2 stone

//2 wood wall //3 stone wall //4 spikes // 5g spikes //6 windmill //7 faster windmill //8 mine //9 pit trap //10 boostpad

function decode()
{
    if(typeof player != "undefined")
    {
        player_sid = player.sid;
        player_x = player.x;
        player_y = player.y;
    }
    if(typeof gameObjects != "undefined" && belacanvas !== null)
    {
        belacanvas.style.top = "0px";
        belacanvas.style.left = "0px";
        belacanvas.width = 150;
        belacanvas.height = 150;
        belactx.clearRect(0, 0, belacanvas.width, belacanvas.height);

        belactx.globalAlpha = 0.43;
        belactx.beginPath();
        belactx.rect(0,0,belacanvas.width,belacanvas.height);
        belactx.fillStyle = "#000000";
        belactx.fill();
        belactx.lineWidth = 7;
        belactx.strokeStyle = '#ffffff';
        belactx.stroke();

        var closestD = 10000000;
        var theObj = null;
        for(var i = 0; i < gameObjects.length; i++)
        {
            var gameObj = gameObjects[i];
            var type = -1;if(typeof gameObj.type != "undefined" && gameObj.type !== null){type = gameObj.type;}
            var sid = -1;if(gameObj.owner){sid = gameObj.owner.sid;}

            var dist = ((player_x - gameObj.x) * (player_x - gameObj.x)) + ((player_y - gameObj.y) * (player_y - gameObj.y));
            if(dist < closestD){closestD = dist;theObj = gameObj;}

            belactx.globalAlpha = 0.4;
            belactx.beginPath();
            if(type === -1)
            {
                belactx.rect((gameObjects[i].x / 12000.0 * 150) -2,(gameObjects[i].y / 12000.0 * 150) -2,4,4);
                belactx.fillStyle = "#ffffff";
            }
            else if(type === 0)
            {
                belactx.rect((gameObjects[i].x / 12000.0 * 150) -2,(gameObjects[i].y / 12000.0 * 150) -2,4,4);
                belactx.fillStyle = "#e7bf5f";
            }
            else if(type === 1)
            {
                belactx.rect((gameObjects[i].x / 12000.0 * 150) -2,(gameObjects[i].y / 12000.0 * 150) -2,4,4);
                belactx.fillStyle = "#50c77f";
            }
            else if(type === 2)
            {
                belactx.rect((gameObjects[i].x / 12000.0 * 150) -2,(gameObjects[i].y / 12000.0 * 150) -2,4,4);
                belactx.fillStyle = "#bfbfbf";
            }

            belactx.fill();
            if((type == -1 || sid != -1))
            {
                belactx.globalAlpha = 1;
                belactx.lineWidth = 1;
                if(sid != -1)
                {
                    if(sid == player_sid)
                    {
                        //belactx.globalAlpha = 1;
                        belactx.strokeStyle = '#ffffff';
                    }
                    else
                    {
                        //belactx.globalAlpha = 1;
                        belactx.strokeStyle = '#000000';
                    }
                }
                else
                {
                    belactx.strokeStyle = '#2f2f2f';
                }
                belactx.stroke();
            }
        }
        if(theObj != null)
        {
            //console.log("Type: " + theObj.type);
            //console.log("ID  : " + theObj.id);
        }
        belactx.globalAlpha = 1;
        belactx.beginPath();
        belactx.rect((player_x / 12000.0 * 150) -2.5,(player_y / 12000.0 * 150) -2.5,5,5);
        belactx.fillStyle = "#ffffff";
        belactx.fill();
        belactx.globalAlpha = 0.8;
        belactx.lineWidth = 1;
        belactx.strokeStyle = '#ffffff';
        belactx.stroke();
    }
}
