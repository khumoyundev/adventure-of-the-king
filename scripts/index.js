const ctx = canvas.getContext("2d"),
    overlay = { opacity: 0 },
    keys = {
        w: { pressed: false },
        a: { pressed: false },
        d: { pressed: false },
    },
    height = 100,
    canvasTxt = window.canvasTxt.default,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

let resourceReady = false,
    minWaitDuration = 2,
    parsedCollisions,
    animationId = 0,
    collisionBlocks,
    levels = [],
    background,
    level = 1,
    palm2Lvl5,
    palmLvl5,
    centerY,
    centerX,
    player,
    doors,
    scale;

function init() {
    resizeCanvas();
    scaleCanvas();

    displayIfMobile();

    initializePlayer();
    initializeLevels();

    animate();
}

function scaleCanvas() {
    canvas.style.transform = `scale(${scale})`;
}

function rotateScreen() {
    if (isMobile) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen();
        }

        screen.orientation.lock("landscape-primary")
            .then(function () {
                console.log('landscape-primary');
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

function resizeCanvas() {
    centerX = (canvas.width = 64 * 16) * 0.5;
    centerY = (canvas.height = 64 * 9) * 0.5;
    scale = Math.min(
        innerWidth / canvas.clientWidth,
        innerHeight / canvas.clientHeight
    );
}

function initializePlayer() {
    player = new Player({
        frameRate: 11,
        imageSrc: "./assets/imgs/king/idle.png",
        animations: {
            idleRight: {
                frameRate: 11,
                frameBuffer: 4,
                loop: true,
                imageSrc: "./assets/imgs/king/idle.png",
            },
            idleLeft: {
                frameRate: 11,
                frameBuffer: 4,
                loop: true,
                imageSrc: "./assets/imgs/king/idle.png",
            },
            runLeft: {
                frameRate: 8,
                frameBuffer: 3,
                loop: true,
                imageSrc: "./assets/imgs/king/run_left.png",
            },
            runRight: {
                frameRate: 8,
                frameBuffer: 3,
                loop: true,
                imageSrc: "./assets/imgs/king/run_right.png",
            },
            enterDoor: {
                frameRate: 8,
                frameBuffer: 4,
                loop: false,
                imageSrc: "./assets/imgs/king/enter_door.png",
                onComplete() {
                    nextLevel();
                },
            },
        },
    });
}

function showModal(_message) {
    let modal = new tingle.modal({
        closeMethods: ['overlay', 'escape'],
        onClose: function () {
            initializeAudio();
            rotateScreen();
        },
    });
    modal.setContent(_message);

    modal.open();
}

function initializeLevels() {
    levels = {
        1: {
            init() {
                parsedCollisions = collisionsLevel1.parse2D();
                player.collisionBlocks = collisionBlocks =
                    parsedCollisions.createObjectsFrom2D();

                player.position.x = 200;
                player.position.y = 200;

                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: "./assets/imgs/background_level_1.png",
                });

                doors = [
                    new Sprite({
                        position: {
                            x: 767,
                            y: 270,
                        },
                        imageSrc: "./assets/imgs/door_open.png",
                        frameRate: 5,
                        frameBuffer: 5,
                        loop: false,
                        autoplay: false,
                    }),
                ];
            },
        },
        2: {
            init() {
                parsedCollisions = collisionsLevel2.parse2D();
                player.collisionBlocks = collisionBlocks =
                    parsedCollisions.createObjectsFrom2D();

                player.position.x = 96;
                player.position.y = 140;

                if (player.currentAnimation)
                    player.currentAnimation.isActive = false;

                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: "./assets/imgs/background_level_2.png",
                });

                doors = [
                    new Sprite({
                        position: {
                            x: 772,
                            y: 336,
                        },
                        imageSrc: "./assets/imgs/door_open.png",
                        frameRate: 5,
                        frameBuffer: 5,
                        loop: false,
                        autoplay: false,
                    }),
                ];
            },
        },
        3: {
            init() {
                parsedCollisions = collisionsLevel3.parse2D();
                player.collisionBlocks = collisionBlocks =
                    parsedCollisions.createObjectsFrom2D();

                player.position.x = 783.67;
                player.position.y = 270.67;

                if (player.currentAnimation)
                    player.currentAnimation.isActive = false;

                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: "./assets/imgs/background_level_5.png",
                });

                doors = [
                    new Sprite({
                        position: {
                            x: 176.67,
                            y: 335.67,
                        },
                        imageSrc: "./assets/imgs/door_open.png",
                        frameRate: 5,
                        frameBuffer: 5,
                        loop: false,
                        autoplay: false,
                    }),
                ];
            },
        },
        4: {
            init() {
                parsedCollisions = collisionsLevel4.parse2D();
                player.collisionBlocks = collisionBlocks =
                    parsedCollisions.createObjectsFrom2D();

                player.position.x = 120.67;
                player.position.y = 146.67;

                if (player.currentAnimation)
                    player.currentAnimation.isActive = false;

                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: "./assets/imgs/background_level_4.png",
                });

                doors = [
                    new Sprite({
                        position: {
                            x: 159.67,
                            y: 400.67,
                        },
                        imageSrc: "./assets/imgs/door_open.png",
                        frameRate: 5,
                        frameBuffer: 5,
                        loop: false,
                        autoplay: false,
                    }),
                ];
            }
        },
        5: {
            init() {
                canvas.style.border = "3px solid white";

                palmLvl5 = new Sprite({
                    position: {
                        x: 126,
                        y: 472.34
                    },
                    imageSrc: "./assets/imgs/back_palm_tree_left_01.png",
                    frameRate: 1,
                    frameBuffer: 0,
                    autoplay: false
                });

                palm2Lvl5 = new Sprite({
                    position: {
                        x: 575,
                        y: 431.72
                    },
                    imageSrc: "./assets/imgs/back_palm_tree_left_01.png",
                    frameRate: 1,
                    frameBuffer: 0,
                    autoplay: false
                });

                parsedCollisions = collisionsLevel5.parse2D();
                player.collisionBlocks = collisionBlocks =
                    parsedCollisions.createObjectsFrom2D();

                player.position.x = 25.39;
                player.position.y = 248.91;

                if (player.currentAnimation)
                    player.currentAnimation.isActive = false;

                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: "./assets/imgs/background_level_6.png",
                });

                doors = [
                    new Sprite({
                        position: {
                            x: -159.67,
                            y: -400.67,
                        },
                        imageSrc: "./assets/imgs/door_open.png",
                        frameRate: 5,
                        frameBuffer: 5,
                        loop: false,
                        autoplay: false,
                    }),
                ];
            }
        },
        6: {
            init() {
                canvas.style.border = "3px solid white";

                parsedCollisions = collisionsLevel7.parse2D();
                player.collisionBlocks = collisionBlocks =
                    parsedCollisions.createObjectsFrom2D();

                player.position.x = 26.39;
                player.position.y = 40.37;

                if (player.currentAnimation)
                    player.currentAnimation.isActive = false;

                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: "./assets/imgs/background_level_8.png",
                });

                doors = [
                    new Sprite({
                        position: {
                            x: -159.67,
                            y: -400.67,
                        },
                        imageSrc: "./assets/imgs/door_open.png",
                        frameRate: 5,
                        frameBuffer: 5,
                        loop: false,
                        autoplay: false,
                    }),
                ];
            }
        },
        7: {
            init() {
                canvas.style.border = "3px solid white";

                parsedCollisions = collisionsLevel6.parse2D();
                player.collisionBlocks = collisionBlocks =
                    parsedCollisions.createObjectsFrom2D();

                player.position.x = 26.39;
                player.position.y = 40.37;

                if (player.currentAnimation)
                    player.currentAnimation.isActive = false;

                background = new Sprite({
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: "./assets/imgs/background_level_7.png",
                });

                doors = [
                    new Sprite({
                        position: {
                            x: -159.67,
                            y: -400.67,
                        },
                        imageSrc: "./assets/imgs/door_open.png",
                        frameRate: 5,
                        frameBuffer: 5,
                        loop: false,
                        autoplay: false,
                    }),
                ];
            }
        }
    };

    levels[level].init();
}

function gotoLevel(_level) {
    if (!levels[_level]) return;

    level = _level;
    buttons.style.opacity = 0;
    gsap.to(overlay, {
        opacity: 1,
        onComplete() {
            canvas.style.border = "none";
            levels[level].init();
            player.switchSprite("idleRight");
            player.preventInput = false;
            const interval = setInterval(() => {
                if (loaded()) {
                    buttons.style.opacity = 1;
                    gsap.to(overlay, {
                        opacity: 0,
                    });
                    clearInterval(interval);
                }
            }, minWaitDuration * 1000);
        },
    });
}

function displayIfMobile() {
    if (!(window.innerWidth < 750)) return;

    if (isMobile) {
        dialogs.mobileDetect();
        touchControls.style.display = "flex";
    }

    scale = Math.min(
        innerWidth / canvas.clientHeight,
        innerHeight / canvas.clientWidth
    );

    canvas.style.transform = "scale(" + scale + ")";
}

function checkIfLoaded() {
    if (loaded() && !resourceReady) {
        resourceReady = true;
        hideLoadingAnimation();
        dialogs.welcome();
    }
}

function nextLevel() {
    if (!levels[level + 1]) return;

    level++;
    buttons.style.opacity = 0;
    gsap.to(overlay, {
        opacity: 1,
        onComplete() {
            canvas.style.border = "none";
            levels[level].init();
            player.switchSprite("idleRight");
            player.preventInput = false;
            const interval = setInterval(() => {
                if (loaded()) {
                    buttons.style.opacity = 1;
                    gsap.to(overlay, {
                        opacity: 0,
                    });
                    clearInterval(interval);
                }
            }, minWaitDuration * 1000);
        },
    });
}


function prevLevel() {
    if (!levels[level - 1]) return;

    level--;
    buttons.style.opacity = 0;
    gsap.to(overlay, {
        opacity: 1,
        onComplete() {
            canvas.style.border = "none";
            levels[level].init();
            player.switchSprite("idleRight");
            player.preventInput = false;
            const interval = setInterval(() => {
                if (loaded()) {
                    buttons.style.opacity = 1;
                    gsap.to(overlay, {
                        opacity: 0,
                    });
                    clearInterval(interval);
                }
            }, minWaitDuration * 1000);
        },
    });
}

function displayOverlay() {
    ctx.save();
    ctx.globalAlpha = overlay.opacity;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    ctx.fillStyle = 'white';
    canvasTxt.font = 'myFont';
    canvasTxt.fontSize = 60;
    canvasTxt.align = 'center';
    canvasTxt.vAlign = "middle";
    canvasTxt.lineHeight = 60;
    canvasTxt.justify = true;
    canvasTxt.drawText(ctx, "Loading...", centerX - 100, centerY - 120, 200, 200);

    ctx.restore();
}

function checkAdditionalLevels() {
    if (level === 5) {
        palmLvl5.draw();
        palm2Lvl5.draw();
        if (player.position.x -
            player.velocity.x
            <= -110 ||
            player.position.y +
            player.velocity.y +
            player.height
            >= canvas.height + 200) {
            player.position.x = 0;
            player.position.y = 128;
        } else if (player.position.x + player.velocity.x +
            player.width >= canvas.width + 70) {
            player.position.x = -126.39;
            player.position.y = -3040.37;
            nextLevel();
        }
    } else if (level === 6) {
        if (player.position.x - player.width <=
            -400 ||
            player.position.y +
            player.height
            >= canvas.height +
            player.height) {
            player.position.x = 26;
            player.position.y = 20.37;
        }
        if (player.position.x + player.width >= canvas.width - 20) nextLevel();

    } else if (level === 7) {
        if (player.position.x -
            player.velocity.x <=
            -110) {
            player.position.x = 26;
            player.position.y = 20.37;
        } else if (player.position.y +
            player.velocity.y +
            player.height >= canvas.height + 20000
            && player.position.x +
            player.velocity.x + player.width
            >= 50) {
            dialogs.oops();
            player.velocity.y = 22;
            gotoLevel(1);
        }
    }
}

function animate() {
    animationId = requestAnimationFrame(animate);

    /* Checks whether resource are ready to be displayed on canvas */
    checkIfLoaded();

    background.draw();

    doors.forEach((_door) => {
        _door.draw();
    });

    player.velocity.x = 0;

    player.handleInput(keys);
    player.update();

    checkAdditionalLevels();

    displayOverlay();
}

/* Khumoyun, 2022 */
