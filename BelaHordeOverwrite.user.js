// ==UserScript==
// @name         BelaHordeOverwrite
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://hordes.io/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
var script = document.createElement("script");
script.src = "https://drive.google.com/uc?export=download&id=0B8M8DXO0ZcU0QzhOR2I3MmJzTWs";
script.dataType = "js";
document.body.appendChild(script)
