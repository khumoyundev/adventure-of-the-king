let bgMusic = null;

function playerJump() {
    for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

        if (
            player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
            player.hitbox.position.x >=
            door.position.x &&
            player.hitbox.position.y + player.hitbox.height >=
            door.position.y &&
            player.hitbox.position.y <=
            door.position.y + door.height
        ) {
            player.velocity.x = 0;
            player.velocity.y = 0;
            player.switchSprite("enterDoor");
            player.preventInput = true;
            door.play();
            return;
        }
    }
    if (player.velocity.y === 0) player.velocity.y = -22;
}

function initializeAudio() {
    if (!bgMusic) {
        bgMusic = new Audio("./assets/audios/bg.wav");

        bgMusic.loop = true;
        bgMusic.autoplay = true;
        bgMusic.volume = 0.4;

        bgMusic.preload = "true";

        bgMusic.oncanplay = function () {
            bgMusic.play();
        };
    }
}

function handleKeyUp(_event) {
    switch (_event.key.toLowerCase()) {
        case "w":
            if (player.velocity.y === 0) player.velocity.y = 0;
            break;
        case "arrowup":
            if (player.velocity.y === 0) player.velocity.y = 0;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "arrowleft":
            keys.a.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
        case "arrowright":
            keys.d.pressed = false;
            break;
    }
}

function handleKeyDown(_event) {
    initializeAudio();

    if (player.preventInput) return;

    switch (_event.key.toLowerCase()) {
        case "w":
            playerJump();
            break;
        case " ":
            playerJump();
            break;
        case "arrowup":
            playerJump();
            break;
        case "a":
            playerMoveLeft();
            break;
        case "arrowleft":
            playerMoveLeft();
            break;
        case "d":
            playerMoveRight();
            break;
        case "arrowright":
            playerMoveRight();
            break;
    }
}

function handleMouseUp() {
    if (player.velocity.y === 0) player.velocity.y = 0
}

function playerMoveLeft() {
    keys.a.pressed = true;
}

function playerMoveRight() {
    keys.d.pressed = true;
}

leftButton.addEventListener("touchstart", playerMoveLeft);
rightButton.addEventListener("touchstart", playerMoveRight);
upButton.addEventListener("touchstart", playerJump);
rightButton.addEventListener("touchend", () => keys.d.pressed = false);
leftButton.addEventListener("touchend", () => keys.a.pressed = false);
rightButton.addEventListener("mouseup", () => keys.d.pressed = false);
leftButton.addEventListener("mouseup", () => keys.a.pressed = false);
leftButton.addEventListener("mousedown", playerMoveLeft);
rightButton.addEventListener("mousedown", playerMoveRight);
upButton.addEventListener("mousedown", playerJump);
upButton.addEventListener("mouseup", () => handleMouseUp);
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
contactBtn.addEventListener("click", dialogs.form)
aboutBtn.addEventListener("click", dialogs.about)
helpBtn.addEventListener("click", dialogs.help)
document.addEventListener("DOMContentLoaded", init);