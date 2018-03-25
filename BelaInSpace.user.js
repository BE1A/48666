// ==UserScript==
// @name         BelaInSpace
// @namespace    http://warin.space/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @grant        GM_getValue
// @grant        GM_setValue
// @match        http://warin.space/
// ==/UserScript==
function GetCoordClamp(mouseX, mouseY){var ret = {};var hsx = window.innerWidth / 2;var hsy = window.innerHeight / 2;var amx = mouseX - hsx;var amy = mouseY - hsy;var dc = 0.96;if((amx > -hsx * dc) && (amx < hsx * dc) && (amy > -hsy * dc) && (amy < hsy * dc)){ret[0] = mouseX;ret[1] = mouseY;return ret;}else{var fA = (amx * hsy) - (amy * hsx);var fB = (amx * hsy) + (amy * hsx);if(fA > 0){if(fB > 0){amy = amy * (hsx * dc / amx);amx = hsx * dc;}else{amx = amx * (-hsy * dc / amy);amy = -hsy * dc;}}else{if(fB > 0){amx = amx * (hsy * dc / amy);amy = hsy * dc;}else{amy = amy * (-hsx * dc / amx);amx = -hsx * dc;}}ret[0] = amx + hsx;ret[1] = amy + hsy;}return ret;}
var holdingMouse = [];
var holdingKey = [];
var isLoggedIn = true;
var numpadSelect = -1;
var rep = false;
var PRE_render = null;
document.addEventListener('mousedown', function(e)
                          {
    var button = e.button;
    holdingMouse[button] = true;
    GM_setValue("GM_Warin_Mouse"+button, 1);
});

document.addEventListener('mouseup', function(e)
                          {
    var button = e.button;
    holdingMouse[button] = false;
    GM_setValue("GM_Warin_Mouse"+button, 0);
});

document.addEventListener('keyup', function(e)
                          {
    var key = e.keyCode || e.which;
    if(key >= 97 && key <= 105) { numpadSelect = key - 96; } //numpad
    GM_setValue("GM_Warin_Key"+key, 0);
    holdingKey[key] = false;
});

document.addEventListener('keydown', function(e)
                          {
    var key = e.keyCode || e.which;
    GM_setValue("GM_Warin_Key"+key, 1);
    holdingKey[key] = true;
});


function Sync()
{
    if(typeof pc != "undefined")
    {
        if(!rep)
        {
            PRE_render = render;
            render = function()
            {
                if(document.hasFocus())
                {
                    PRE_render();
                }
            };
            rep = true;
            adblock = false;
            Yf = function() {
                adblock = false;
            };
            Zf = function() {
                adblock= false;
            };
            Ke = function(){
                var a = c.width;
                c.height > a && (a = c.height);
                Xc = (a / sd) / 1.8;
            };
            Uf = function() {
                var a = (new Date).getTime(),
                    b = (a - Md) / 1E3;
                Md = a;
                if ("getGamepads" in navigator)
                    if (Oa) {
                        gamepads = navigator.getGamepads();
                        null != Z && (Z.buttons[6].pressed && !Vf[4] && (Ef(), Cc = [playerX, playerY]), Z.buttons[2].pressed && !Vf[0] ? Ff({
                            keyCode: 81
                        }) : Z.buttons[0].pressed && !Vf[1] ? Ff({
                            keyCode: 87
                        }) : Z.buttons[1].pressed && !Vf[2] ? Ff({
                            keyCode: 69
                        }) : Z.buttons[3].pressed && !Vf[3] && Ff({
                            keyCode: 82
                        }), Vf = [Z.buttons[2].pressed, Z.buttons[0].pressed, Z.buttons[1].pressed, Z.buttons[3].pressed, Z.buttons[6].pressed]);
                        firing && (Z =
                                   null);
                        for (var e in gamepads)
                            if (null != gamepads[e] && gamepads[e].buttons && gamepads[e].buttons[7].pressed) {
                                Z = gamepads[e];
                                gc && vd && !IsMobile && (gc = !1);
                                break
                            }
                    } else Z = null;
                if (vd && !gc && !(0 >= selfHealth)) {
                    e = (new Date).getTime();
                    var d = 80;
                    if (Gc) var f, g, d = 160;
                    a = selfMoveSpeed;
                    Yc || (e < Fc && (a /= 1), Gc && Hc || (e = !1, null != Z ? (f = Z.axes[0], g = Z.axes[1], d = Math.atan2(g, f), f = Math.sqrt(f * f + g * g), .15 < f && (selfAngle > d + y && (selfAngle -= 2 * y), selfAngle < d - y && (selfAngle += 2 * y), selfAngle = (4 * selfAngle + d) / 5), .9 < f && (e = !0)) : !IsMobile && (Math.abs(qc -
            window.innerHeight / 2) > d || Math.abs(pc - window.innerWidth / 2) > d) && (e = !0), IsMobile && sf && (e = !0), Ic && (e = !1), e && (playerX += Math.cos(selfAngle) * a * b, playerY += Math.sin(selfAngle) * a * b, 0 > playerX && (playerX = 0), playerX > td && (playerX = td), 0 > playerY && (playerY = 0), playerY > ud && (playerY = ud), currentX = playerX, currentY = playerY, Jc = !1)), Gc && Hc && entities[Hc] && (currentX = playerX = entities[Hc].a, currentY = playerY = entities[Hc].b))
                }
                if (!Gc)
                    for (var h in scraps) b = scraps[h], a = 80 * (1 + Bb[F]) / 2, Xd(playerX, playerY, b.x, b.y) < a * a + 400 && ($a("collectScrap",
                                                                                                                                       .2), delete scraps[h], delete entities[h]);
                window.requestAnimationFrame || render()
            }
            Qf = function()
            {
                var a = selfAngle;
                var e = null;
                var d;
                var distance = 999999999;
                for (d in players)
                {
                    var f = players[d];
                    var difX = f.a - playerX;
                    var difY = f.b - playerY;
                    difX *= difX;
                    difY *= difY;
                    var newDist = difX + difY;
                    if(0 < f.i)
                    {
                        f = Tf(a, 6.29, f);
                        if(f && newDist < distance)
                        {
                            distance = newDist;
                            e = d;
                        }
                    }
                }
                if(soccerBall)
                {
                    var f = Tf(a, 0.7, soccerBall);
                    var difX = soccerBall.a - playerX;
                    var difY = soccerBall.b - playerY;
                    difX *= difX;
                    difY *= difY;
                    var newDist = difX + difY;
                    if(f && newDist < distance)
                    {
                        distance = newDist;
                        e = soccerBallID;
                    }
                }
                for (d in turrets)
                {
                    var f = Tf(a, 6.29, turrets[d]);
                    var difX = turrets[d].a - playerX;
                    var difY = turrets[d].b - playerY;
                    difX *= difX;
                    difY *= difY;
                    var newDist = difX + difY;
                    if(f && newDist < distance)
                    {
                        distance = newDist;
                        e = d;
                    }
                }
                for (d in controlPoints)
                {
                    var f = Tf(a, 6.29, controlPoints[d]);
                    var difX = controlPoints[d].a - playerX;
                    var difY = controlPoints[d].b - playerY;
                    difX *= difX;
                    difY *= difY;
                    var newDist = difX + difY;
                    if(f && newDist < distance)
                    {
                        distance = newDist;
                        e = d;
                    }
                }
                d = bb(1 - selfTeam);
                if(Yd(Math.atan2(d[1] - playerY, d[0] - playerX), a) < 6.29)
                {
                    var f = Xd(d[0], d[1], playerX, playerY);
                    var difX = d[0] - playerX;
                    var difY = d[1] - playerY;
                    difX *= difX;
                    difY *= difY;
                    var newDist = difX + difY;
                    if(newDist < distance)
                    {
                        e = 1 - selfTeam;
                    }
                }
                //console.log(e,b);
                return [e, null];
            };
            Pf = function() {
                if (vd && !(0 >= selfHealth)) {
                    Bf(null);
                    APIHook();
                    var a = (new Date).getTime();
                    if (null != u && u.readyState == u.OPEN) {
                        var b = false;
                        if (sc)
                        {
                            var b = Qf();
                            var e = b[0];
                            b = (b[1] < selfFiringRange * selfFiringRange || true) && null != e;
                        }
                        if (0 <= scrap && (null != Z && Z.buttons[7].pressed || firing || Ec || b) && a > Dc + 100) {
                            if (null != u && u.readyState == u.OPEN) {
                                e = Qf();
                                b = e[0];
                                if ((e[1] < selfFiringRange * selfFiringRange || true) && null != b) {
                                    shot = !0;
                                    Of(b);
                                    var e = new ArrayBuffer(7),
                                        d = new DataView(e);
                                    d.setUint8(0, 9);
                                    d.setUint16(1, b);
                                    d.setUint16(3, playerX);
                                    d.setUint16(5, playerY);
                                    u.send(e)
                                } else e = new ArrayBuffer(5), d = new DataView(e), d.setUint8(0, 10), d.setUint16(1, playerX), d.setUint16(3, playerY), u.send(e), Of(null);
                                Fc = (new Date).getTime() + 350
                            }
                            Dc = a
                        } else Dd != playerX || Ed != playerY ? (a = new ArrayBuffer(5), b = new DataView(a), b.setUint8(0, 0), b.setUint16(1, playerX), b.setUint16(3, playerY), u.send(a), Dd = playerX, Ed = playerY) : Fd != selfAngle && (a = new ArrayBuffer(2), b = new DataView(a), b.setUint8(0, 3), b.setUint8(1, selfAngle % (2 * y) * Nd), u.send(a), Fd = selfAngle);
                        Bc && (Bc = !1, selfDrones != selfMaxDrones && null !=
                               u && u.readyState == u.OPEN && (a = Db[F][0], b = sb[a], null == b ? (b = new ArrayBuffer(5), e = new DataView(b), e.setUint8(0, 7), e.setInt16(1, Cc[0]), e.setInt16(3, Cc[1]), u.send(b), zc = -100) : (d = Df(Cc[0], Cc[1], b), null != d && (b = new ArrayBuffer(3), e = new DataView(b), e.setUint8(0, 8), e.setInt16(1, d), u.send(b), zc = -100)), (a = rb[a]) && a()))
                    }
                    Ec = !1
                }
            };
        }
        //console.log(Hc);
        if(loggedInShown.style.visibility == "visible")
        {
            isLoggedIn = true;
        }
        else if(connecting.style.display == "none" && !isLoggedIn)
        {
            console.log('im tryingggg');
            loginUsernameField.value = "[BP]Bela";
            loginPasswordField.value = "swing250";
            Da();
        }
        if(isLoggedIn)
        {
            var e = [];
            e.keyCode = 52;
            Ff(e);
            gc = false;
            if(document.hasFocus())
            {
                GM_setValue("GM_Warin_pc", pc);
                GM_setValue("GM_Warin_qc", qc);
                GM_setValue("GM_Warin_playerX", playerX);
                GM_setValue("GM_Warin_playerY", playerY);
                GM_setValue("GM_Warin_mouseWorldPosX", mouseWorldPosX);
                GM_setValue("GM_Warin_mouseWorldPosY", mouseWorldPosY);
                GM_setValue("GM_Warin_firing", firing);
                GM_setValue("GM_Warin_selfTeam", selfTeam);
                GM_setValue("GM_Warin_selfHealth", selfHealth);
                GM_setValue("GM_Warin_selfServer", selfServer);
                GM_setValue("GM_Warin_isInGame", vd);
                if(ServerSelectionCombo.options[ServerSelectionCombo.selectedIndex])
                {
                    GM_setValue("GM_Warin_server", ServerSelectionCombo.options[ServerSelectionCombo.selectedIndex].text);
                }
                var ingame = false;
                if(content.style.display == "none")
                {
                    ingame = true;
                }
                GM_setValue("GM_Warin_isIngame", ingame);
            }
            else
            {
                //mouseWorldPosX = (pc - window.innerWidth / 2) / Xc + playerX
                var mainTeam = GM_getValue("GM_Warin_selfTeam");
                var mainHealth = GM_getValue("GM_Warin_selfHealth");
                var mainIngame = GM_getValue("GM_Warin_isIngame");
                var mainMousePosX = GM_getValue("GM_Warin_mouseWorldPosX");
                var mainMousePosY = GM_getValue("GM_Warin_mouseWorldPosY");
                var mainSelfServer = GM_getValue("GM_Warin_selfServer");
                var mainServer = GM_getValue("GM_Warin_server");
                var isInGame = GM_getValue("GM_Warin_isInGame");
                firing = GM_getValue("GM_Warin_firing");
                pc = ((mainMousePosX - playerX) * Xc) + (window.innerWidth / 2);
                qc = ((mainMousePosY - playerY) * Xc) + (window.innerHeight / 2);
                var reArr = GetCoordClamp(pc, qc);
                pc = reArr[0];
                qc = reArr[1];
                var e = [];
                e.clientX = pc;
                e.clientY = qc;
                Bf(e);
                mouseWorldPosX = (pc - window.innerWidth / 2) / Xc + playerX;
                mouseWorldPosY = (qc - window.innerHeight / 2) / Xc + playerY;
                var button0 = GM_getValue("GM_Warin_Mouse0");
                var button2 = GM_getValue("GM_Warin_Mouse2");
                var key_q = GM_getValue("GM_Warin_Key81");
                var key_w = GM_getValue("GM_Warin_Key87");
                var key_e = GM_getValue("GM_Warin_Key69");
                var numpad_1 = GM_getValue("GM_Warin_Key97");
                var numpad_2 = GM_getValue("GM_Warin_Key98");
                var numpad_3 = GM_getValue("GM_Warin_Key99");
                var numpad_4 = GM_getValue("GM_Warin_Key100");
                var numpad_5 = GM_getValue("GM_Warin_Key101");
                var numpad_6 = GM_getValue("GM_Warin_Key102");
                var numpad_7 = GM_getValue("GM_Warin_Key103");
                var numpad_8 = GM_getValue("GM_Warin_Key104");
                var numpad_9 = GM_getValue("GM_Warin_Key105");
                if(holdingMouse[0] != button0)
                {
                    holdingMouse[0] = button0;
                    if(button0)
                    {
                        Cf();
                    }
                }
                if(holdingMouse[2] != button2)
                {
                    holdingMouse[2] = button2;
                    if(button2)
                    {
                        Ef();
                    }
                }
                if(holdingKey[97] != numpad_1){holdingKey[97] = numpad_1;if(numpad_1){numpadSelect = 1;}}
                if(holdingKey[98] != numpad_2){holdingKey[98] = numpad_2;if(numpad_2){numpadSelect = 2;}}
                if(holdingKey[99] != numpad_3){holdingKey[99] = numpad_3;if(numpad_3){numpadSelect = 3;}}
                if(holdingKey[100] != numpad_4){holdingKey[100] = numpad_4;if(numpad_4){numpadSelect = 4;}}
                if(holdingKey[101] != numpad_5){holdingKey[101] = numpad_5;if(numpad_5){numpadSelect = 5;}}
                if(holdingKey[102] != numpad_6){holdingKey[102] = numpad_6;if(numpad_6){numpadSelect = 6;}}
                if(holdingKey[103] != numpad_7){holdingKey[103] = numpad_7;if(numpad_7){numpadSelect = 7;}}
                if(holdingKey[104] != numpad_8){holdingKey[104] = numpad_8;if(numpad_8){numpadSelect = 8;}}
                if(holdingKey[105] != numpad_9){holdingKey[105] = numpad_9;if(numpad_9){numpadSelect = 9;}}
                if(holdingKey[81] != key_q)
                {
                    holdingKey[81] = key_q;
                    if(key_q){kd(0);}
                }
                if(holdingKey[87] != key_w)
                {
                    holdingKey[87] = key_w;
                    if(key_w){kd(1);}
                }
                if(holdingKey[69] != key_e)
                {
                    holdingKey[69] = key_e;
                    if(key_e){kd(2);}
                }
                if(ServerSelectionCombo.options[ServerSelectionCombo.selectedIndex] && ServerSelectionCombo.options[ServerSelectionCombo.selectedIndex].text != mainServer)
                {
                    for(var iii = 0; iii < ServerSelectionCombo.options.length; iii++)
                    {
                        if(ServerSelectionCombo.options[iii].text == mainServer)
                        {
                            ServerSelectionCombo.selectedIndex = iii;
                            ServerSelectionCombo.onchange();
                            break;
                        }
                    }
                }
                if(mainTeam !== selfTeam || !isInGame)
                {
                    var e = [];
                    e.keyCode = 27;
                    Ff(e);
                }
                if(mainTeam == 0)
                {
                    radioBlue.click();
                }
                else
                {
                    radioRed.click();
                }
                if(mainSelfServer != selfServer)
                {
                    if(mainSelfServer == 0){SS0.click();}
                    else if(mainSelfServer == 1){SS1.click();}
                    else if(mainSelfServer == 2){SS2.click();}
                    else if(mainSelfServer == 3){SS3.click();}
                    else if(mainSelfServer == 4){SS4.click();}
                    else if(mainSelfServer == 5){SS5.click();}
                    else if(mainSelfServer == 6){SS6.click();}
                    else if(mainSelfServer == 7){SS7.click();}
                    else if(mainSelfServer == 8){SS8.click();}
                    else if(mainSelfServer == 9){SS9.click();}
                    else if(mainSelfServer == 10){SS10.click();}
                    else if(mainSelfServer == 11){SS11.click();}
                    else if(mainSelfServer == 12){SS12.click();}
                    else if(mainSelfServer == 13){SS13.click();}
                    else if(mainSelfServer == 14){SS14.click();}
                    else if(mainSelfServer == 15){SS15.click();}
                    else if(mainSelfServer == 16){SS16.click();}
                    else if(mainSelfServer == 17){SS17.click();}
                    else if(mainSelfServer == 18){SS18.click();}
                    else if(mainSelfServer == 19){SS19.click();}
                }
                if(mainIngame)
                {
                    playButton.click();
                }
            }
            if(numpadSelect != -1)
            {
                if(1 <= numpadSelect && 3 >= numpadSelect)
                {
                    if(F === 0)
                    {
                        kd(3, numpadSelect - 1);
                    }
                }
                else if(4 <= numpadSelect && 6 >= numpadSelect)
                {
                    if(1 <= F && 3 >= F)
                    {
                        kd(3, numpadSelect - 4);
                    }
                }
                else if(7 <= numpadSelect && 9 >= numpadSelect)
                {
                    if(3 <= F)
                    {
                        kd(3, numpadSelect - 7);
                    }
                }
                numpadSelect = -1;
            }
        }
    }
}
setInterval(Sync, 75);
