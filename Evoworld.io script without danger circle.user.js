// ==UserScript==
// @name         Evoworld.io script without danger circle
// @name:ru      Evoworld.io скрипт без круга опасности
// @namespace    https://discord.gg/kfvFYwjSrx
// @version      1.3
// @author       jmatg1 and VC clan
// @match        https://evoworld.io/
// @icon         https://i.imgur.com/DnLttR6.png
// @grant        none
// @antifeature  Людей с ником jmatg1 теперь видно в игре.
// @description:ru "Evoworld.io Cheats"
// @description  "Evoworld.io Cheats"
// @updateURL    https://github.com/Kolbasai/Kolbasai/raw/main/Evoworld.io%20script%20without%20danger%20circle.user.js
// @downloadURL  https://github.com/Kolbasai/Kolbasai/raw/main/Evoworld.io%20script%20without%20danger%20circle.user.js
// ==/UserScript==
(function () {
    let oldMethod = false;

    try {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', "https://evoworld.io/api/reportError.php");
        xhr.send();

        xhr.onload = function() {
            alert('Анти-бан не работает! Скачайте анти-бан!');
               location.href='https://modheader.com/profile/5db6e3f0-17c8-45ba-9001-9aff521535da';
        };
        xhr.onerror = function() {
            alert('Анти-бан работает.');
            initscript();
        };
    } catch (e){}
    const initscript = () => {
        let spawnTimeCord = [];
        const showTimeSpawnFood = (val) => {
            //return
            if (game.objectsDef[game.gameObjects[val.a]?.name + '_spawn']) {
                const position = game.gameObjects[val.a].position;

                if (spawnTimeCord.find(el => el.x === position.x && el.y === position.y)) return;
                spawnTimeCord.push(position);
                let delay = game.objectsDef[game.gameObjects[val.a]?.name + '_spawn'].delay;
                let sec = delay / 1000;
                const interval = setInterval(() => {
                    sec -= 2;
                    let time = sec;
                    if (sec > 60) {
                        var minutes = Math.floor(sec / 60);
                        var seconds = sec % 60;
                        time = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
                    }
                    textEffects.push({
                        "posX": position.x,
                        "posY": position.y,
                        "color": "#fe4000",
                        "text": time,
                        "fontSize": 14,
                        "bold": true,
                        "startTime": new Date().getTime() + 100,
                        "static": false
                    });
                }, 2000);

                setTimeout(() => {
                    spawnTimeCord = spawnTimeCord.filter(el => el.x !== position.x && el.y !== position.y);
                    clearInterval(interval);
                }, delay);

            }
        }

        const fixChatMenu = () => {
            showEmotesMenu = function () {
                if (chatDisabled) {
                    return;
                }
                ;
                if (imDead || !joinedGame || Date.now() - joinTime < 1e3 || Date.now() - lastEmotesMenuOpenedTime < 1e3) {
                    return;
                }
                ;
                $($(".wheel-button").attr("href")).showIcon($(".wheel-button"), {
                    animation: "fade",
                    animationSpeed: [0, 250],
                    angle: [0, 360]
                });
                $("#chatmenu").finish().fadeIn();
                $("#scan-players-icon").fadeIn();
                emotesMenuOpened = true;
                lastEmotesMenuOpenedTime = Date.now();
            }
        };

        const zoomHack = (a, aa, aaa, aaaaa, a2) => {
            game.canvas.addEventListener("wheel", function () {
                if (!joinedGame || typeof event == "undefined") {
                    return;
                }
                ;
                var qwe = 0.1;
                if (event.deltaY > 0) {
                    qwe *= -1;
                }
                ;
                gameZoom += qwe;
                event.preventDefault();
            });

            Engine.prototype.setZoom = function (ret) {
                if (ret <= 0.7) {
                    ret = 0.7;
                }
                if (this.zoom == ret) {
                    return;
                }
                this.zoom = ret;
                this.staticCanvasRenderOffset.restX = 0;
                this.staticCanvasRenderOffset.restY = 0;
                this.staticCanvasRenderOffset.x = 0;
                this.staticCanvasRenderOffset.y = 0;
                this.staticCanvasRenderPosition.x = 0;
                this.staticCanvasRenderPosition.y = 0;
                this.context.save();
                this.context.fillStyle = "rgba(0,0,0,1)";
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                this.context.restore();
                this.staticContext.save();
                this.staticContext.fillStyle = "rgba(0,0,0,1)";
                this.staticContext.fillRect(0, 0, this.staticCanvas.width, this.staticCanvas.height);
                this.staticContext.restore();
                this.dynamicContext.clearRect(0, 0, this.dynamicCanvas.width, this.dynamicCanvas.height);
                this.clearStaticObjects();

            }
        }

        const doesntHidePlayersFunc = (value) => {
            petFunc(value);
            if (value?.type === 1 || value?.type === 3) {
                value.zIndex = 999
            }
            if (value['inHide'] == false) {
                value['moveSpeed']['x'] += 300 * game['deltaTime'] * value['flySide'];
                if (value['moveSpeed']['x'] > 500) {
                    value['moveSpeed']['x'] -= abs(350 * game['deltaTime'] * value['flySide'])
                } else {
                    if (value['moveSpeed']['x'] < -500) {
                        value['moveSpeed']['x'] += abs(350 * game['deltaTime'] * value['flySide'])
                    }
                }
                ;
                if (value['moveSpeed']['y'] > 500) {
                    value['moveSpeed']['y'] = 500
                }
            }
            ;
            if (value['flySide'] == 0) {
                var asd = abs(value['moveSpeed']['x']) * 0.7 * game['deltaTime'];
                if (value['moveSpeed']['x'] < 0) {
                    value['moveSpeed']['x'] += asd
                } else {
                    value['moveSpeed']['x'] -= asd
                }
            }
            ;
            if (value['inHide']) {
                if (game['time'] - value['inHideTime'] > 500) {
                    /*value['visible'] = false;
                    if (value['pet']) {
                        value['pet']['visible'] = false
                    } */
                    value.zIndex = 999;
                }
                ;value['moveSpeed']['x'] = 0;
                value['moveSpeed']['y'] = 0
            } else {
                value['visible'] = true;
                if (value['pet']) {
                    value['pet']['visible'] = true
                }
            }
            ;
            if (value['invisibleTime'] > game['time']) {
                var checkFood2 = checkFoodChain(game['me'], value);
                if (checkFood2['check'] == 1 || checkFood2['check'] == -1) {
                    value['opacity'] = 0
                } else {
                    value['opacity'] = 0.2
                }
            } else {
                value['opacity'] = 1
            }
            ;value['interpolateSpeed'] = 0.015;
            if (value['grabbed']) {
                value['interpolateSpeed'] = 0.1
            }
            ;
            if (value['inHide'] == true) {
                if (typeof value['interpolateTo']['x'] != 'undefined' || typeof value['interpolateTo']['y'] != 'undefined') {
                    value['interpolateSpeed'] = 0.05;
                    game['interpolatePosition'](value)
                }
                ;
                return false
            }
        }

        const darkOff = (a, aa, aaa, aaaaa, a2) => {
            return
        }

        let timer = null;

        function hello() {
            if (timer) {
                return;
            }
            timer = true;
            setTimeout(() => {
                timer = false;
            }, 5000)
        }


        const outline = (value) => {
            setAnimations(value);
            if (game.me.inSafeZone || value.inSafeZone) {
                value.outline = null;
            } else {
                var checkFood2 = checkFoodChain(game.me, value);
                if (checkFood2.check == 1) {
                    value.outline = "#00cc44";
                    if (checkFoodChain(value, game.me).check == 1) {
                        value.outline = "orange";
                    }
                    ;
                    value.outlineWeight = 3;
                } else {
                    if (checkFood2.check == -1) {
                        value.outline = "red";
                        value.outlineWeight = 3;
                    } else {
                        value.outline = null;
                    }
                }
            }
            if (value.nick === "-") {
                value.opacity = 0;
                value.visible = 0;
                hello();
            } else {
                if (timer) {
                    clearInterval(timer);
                }
            }
        };


        const styles = `
<style>
#gameContainer .scanPlayers {
  position: fixed;
  left: 72vw;
  top: -20;
  right: 0px;
  background: none;
  display: absolute;
  transform: none;
  padding: 0;
  margin: 0;
}
.scanPlayers div {
    display: flex !important;
    flex-direction: column;
}
#gameContainer .scanPlayers .title{
  display: none;
}

#gameContainer .scanPlayers .player{
    background: none;
    border: 0;
    width: 50px;
    height: 50px;
    margin: 0;
    padding: 0;
}

#gameContainer .scanPlayers .nick,
.scanPlayers .experienceBar,
.scanPlayers .close,
.scanPlayers .title,
.scanPlayers button{
  display: none !important;
}
/* #enemy-detect {
  position: absolute;
  border-radius: 50%;
  /* border: 1px solid red; */
  width: 100px;
  height: 100px;
  left: calc(50% - 50px);
  top: calc(50% - 50px);
  box-shadow: 0px 0px 20px 0px #ff000080;
} */
</style>
`;

        let asd = 0;
        const showServer = () => {
            const val = document.getElementById('selectServer')?.options[document?.getElementById('selectServer')?.selectedIndex]?.text;
            if(!val.includes('(') && asd < 10){
                setTimeout(() => {
                    showServer();
                    asd++;
                }, 200);
            }
            console.log(val);
            $("#gameContainer > div.debugInfo > div.server").html('server: <font color="black">' +val + " </font>");
        }
        let i_i = 0;
        let inj = false;
        const interval = setInterval(() => {


            if(Boolean(document.getElementsByClassName('btnStartGame')[0]) && i_i === 0) {
                document.getElementsByClassName('btnStartGame')[0].addEventListener('click', ev => {
                    showServer();
                });

                i_i++;
            }

            if (window?.objectHandlerFunc_PLAYER) {
                objectHandlerFunc_PLAYER = doesntHidePlayersFunc;
            }

            if (window?.animateObject) {
                animateObject = outline;
            }


            if (window?.removeObject) {
                const orRO = window?.removeObject;
                removeObject = (val) => {
                    showTimeSpawnFood(val);
                    orRO(val);
                };
            }

            if (window?.wasSocketInit && window?.joinedGame && !window?.imDead && !inj) {

                drawDarkness = darkOff;

                gameServer.off(socketMsgType.SCANPLAYERS);
                gameServer.on(socketMsgType.SCANPLAYERS, function (arr) {
                    scanPlayersArr = arr.filter(el => {
                        return checkFoodChain(game.objectsDef[el.evolution], game.me).check === 1
                    });

                    if (scanPlayersArr.length > 0) {
                        $('#enemy-detect').show();
                    } else {
                        $('#enemy-detect').hide();
                    }
                    showPlayersScans();
                });

                setInterval(() => {
                    gameServer.emit(socketMsgType.SCANPLAYERS);
                }, 500)
                let intervalBoost = null;
                document.body.onkeydown = function (e) {
                    if (e.shiftKey && joinedGame && !imDead) {
                        boost();
                    }

                    if ((e.code === 'KeyS' || e.code === 'ArrowDown') && joinedGame && !imDead) {
                        skillUse()
                    }
                }
                document.body.onkeyup = function (e) {
                    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
                        if (joinedGame && imDead) {
                            playAgain();
                        }
                    }
                    if ((e.code === 'KeyS' || e.code === 'ArrowDown') && joinedGame && !imDead) {
                        skillStop();
                    }
                    if (e.keyCode == 49) {
                        if (joinedGame && !imDead) {
                            sendEmote(8); // like
                        }
                    }
                    if (e.keyCode == 50) {
                        if (joinedGame && !imDead) {
                            sendEmote(10); // haha
                        }
                    }
                    if (e.keyCode == 51) {
                        if (joinedGame && !imDead) {
                            sendEmote(4); // broken Heart
                        }
                    }
                    if (e.keyCode == 69) {
                        if (joinedGame && !imDead) {
                            sendEmote(9); // smile
                        }
                    }
                    if (e.keyCode == 81) {
                        if (joinedGame && !imDead) {
                            sendEmote(12); // hlop
                        }
                    }
                    if (e.keyCode == 52) {
                        if (joinedGame && !imDead) {
                            sendEmote(11); // heart
                        }
                    }
                    if (e.keyCode == 82) {
                        if (joinedGame && !imDead) {
                            sendEmote(1); // dislike
                        }
                    }
                    if (e.keyCode == 84) {
                        if (joinedGame && !imDead) {
                            sendChat(29); // rats
                        }
                    }
                    if (e.keyCode == 76) {
                        if (joinedGame && !imDead) {
                            askForDiscord(1); // discord
                        }
                    }
                    if (e.keyCode == 67) {
                        if (joinedGame && !imDead) {
                            sendChat(22); // fight
                        }
                    }
                    if (e.keyCode == 86) {
                        if (joinedGame && !imDead) {
                            sendChat(39); // come
                        }
                    }
                    if (e.keyCode == 70) {
                        if (joinedGame && !imDead) {
                            sendChat(38); // wait
                        }
                    }
                    if (e.keyCode == 53) {
                        if (joinedGame && !imDead) {
                            sendEmote(2); // sadsmile
                        }
                    }
                    if (e.keyCode == 54) {
                        if (joinedGame && !imDead) {
                            sendEmote(13); // goodbye2
                        }
                    }
                    if (e.keyCode == 55) {
                        if (joinedGame && !imDead) {
                            sendEmote(7); // angry
                        }
                    }
                    if (e.keyCode == 56) {
                        if (joinedGame && !imDead) {
                            sendEmote(6); // cry
                        }
                    }
                    if (e.keyCode == 57) {
                        if (joinedGame && !imDead) {
                            sendEmote(5); // dislike
                        }
                    }
                    if (e.keyCode == 48) {
                        if (joinedGame && !imDead) {
                            sendEmote(3); // kill me
                        }
                    }
                    if (e.keyCode == 71) {
                        if (joinedGame && !imDead) {
                            sendChat(15); // lol
                        }
                    }
                    if (e.keyCode == 78) {
                        if (joinedGame && !imDead) {
                            sendChat(40); // forget
                        }
                    }
                    if (e.keyCode == 88) {
                        if (joinedGame && !imDead) {
                            sendChat(42); // go away!
                        }
                    }
                    if (e.keyCode == 90) {
                        if (joinedGame && !imDead) {
                            sendChat(6); // thanks
                        }
                    }
                    if (e.keyCode == 89) {
                        if (joinedGame && !imDead) {
                            sendChat(45); // boss
                        }
                    }
                    if (e.keyCode == 72) {
                        if (joinedGame && !imDead) {
                            sendChat(32); // volcano
                        }
                    }
                    if (e.keyCode == 66) {
                        if (joinedGame && !imDead) {
                            game.me.level="49"; // level
                        }
                    }
                    if (e.keyCode == 113) {
                            alert('Paused'); // pause
                    }
                    if (e.keyCode == 74) {
                        if (joinedGame && !imDead) {
                            sendChat(11) // i kill you!
                        }
                    }
                }

                inj = true;
            }

            if (inj) {
                clearInterval(interval);
                document.head.insertAdjacentHTML("beforeend", styles);
                $('#gameContainer').append('<div id="enemy-detect"></div>');
                zoomHack();
                fixChatMenu();

            }
        }, 500);

        if (joinedGame) {
            (function() {document.title = 'EvoWorld.io | Emoji Script'})()
        }


                }
            }


    )();
