class Enemy extends Sprite {
    constructor({
        collisionBlocks = [],
        imageSrc,
        frameRate,
        animations,
        loop = true,
    }) {
        super({ imageSrc, frameRate, animations, loop });
        this.position = {
            x: 250,
            y: 200,
        };

        this.velocity = {
            x: 0,
            y: 0,
        };

        this.gravity = 1.2;

        this.sides = {
            bottom: this.position.y + this.height,
        };

        this.hitbox = {
            position: {
                x: 0,
                y: 0,
            },
            width: 10,
            height: 10,
        };

        this.collisionBlocks = collisionBlocks;
    }

    update() {
        this.width = 64;
        this.height = 64;

        ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        this.position.x += this.velocity.x;

        this.updateHitbox();

        this.checkForHorizontalCollision();

        this.applyGravity();

        this.updateHitbox();

        this.checkForVerticalCollision();
    }

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    switchSprite(_name) {
        if (this.image === this.animations[_name].image) return;
        this.currentFrame = 0;
        this.image = this.animations[_name].image;
        this.frameRate = this.animations[_name].frameRate;
        this.frameBuffer = this.animations[_name].frameBuffer;
        this.loop = this.animations[_name].loop;
        this.currentAnimation = this.animations[_name];
    }

    checkForHorizontalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (
                this.hitbox.position.x <=
                    collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >=
                    collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >=
                    collisionBlock.position.y &&
                this.hitbox.position.y <=
                    collisionBlock.position.y + collisionBlock.height
            ) {
                // X AXIS
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x;
                    this.position.x =
                        collisionBlock.position.x +
                        collisionBlock.width -
                        offset +
                        0.01;
                    break;
                }

                if (this.velocity.x > 0) {
                    const offset =
                        this.hitbox.position.x -
                        this.position.x +
                        this.hitbox.width;
                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    break;
                }
            }
        }
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34,
            },
            width: 50,
            height: 53,
        };
    }

    checkForVerticalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (
                this.hitbox.position.x <=
                    collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >=
                    collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >=
                    collisionBlock.position.y &&
                this.hitbox.position.y <=
                    collisionBlock.position.y + collisionBlock.height
            ) {
                // X AXIS
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y;
                    this.position.y =
                        collisionBlock.position.y +
                        collisionBlock.height -
                        offset +
                        0.01;
                    break;
                }

                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset =
                        this.hitbox.position.y -
                        this.position.y +
                        this.hitbox.height;
                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }
            }
        }
    }
}
