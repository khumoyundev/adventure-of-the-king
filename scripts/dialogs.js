const dialogs = {
    help() {
        showModal(`
            <h1 style="color: #133; margin-top: -20px;">Help</h1>
            <p>If you're on computer:</p>
            <p class="space">Use <kbd>W</kbd> to jump or enter a door.</p>
            <p>Use <kbd>A</kbd> to move left.</p>
            <p>Use <kbd>D</kbd> to move right.</p>
            <p class="space">If you're using a mobile device, use arrow keys that are displayed at the bottom right side of the screen</p>
        `);
    },
    welcome() {
        showModal(`
            <h1 style="margin-top: -20px">Welcome!</h1>
            <p>Are you ready for an exciting, tile based adventure game? With over 10 levels to explore, you'll be able to traverse through a gaming world unlike no other. So what are you waiting for? Embark on your journey and discover the mysteries that await you!</p>
        `);
    },
    about() {
        showModal(`
            <h1 style="color: #133; margin-top: -20px;">About</h1>
            <p>This game doesn't rely on any gaming libraries. Pure JavaScript!</p>
            <p class="space">Collaborate with me: <a href="https://t.me/XumoyunSattoraliyev">@XumoyunSat...</a></p>
            <p class="space">Follow my channel: <a href="https://t.me/HumoyunProjects">t.me/HumoyunProjects</a></p>
            <p class="space" style="color: #133">Created by Khumoyun · Game Resources by <a href="itch.io">itch.io</a></p>
        `);
    },
    mobileDetect() {
        showModal(`We detected that you are probably using a mobile device. We
        recommend that you play the game in landscape mode. In order to
        accomplish that, please click anywhere outside of this modal box and we'll switch to
        full-screen & landscape mode for you :)`)
    },
    form() {
        showModal(`
            <h1 style="color: #133; margin-top: -20px;">Contact</h1>
            <p class="space">Did you find a bug? you want to talk to developer? alright.. use this form below:</p>
            <div class="form">
            <input placeholder="Your name..." id="name">
            <textarea placeholder="Your message..." id="message"></textarea>
            <div class="buttons-2"><button class="green" id="send" onclick="javascript:bot.sendMessage(document.querySelector('#name').value + ': ' + document.querySelector('#message').value, 5624193323, null, true).then(res => {alert('Your message has been sent to the developer!', res);})">Submit</button><button class="red" id="reset" onclick="javascript:(document.querySelector('#name').value = '', document.querySelector('#message').value = '')">Reset</button></div>
            </div>
        `);
    },
    oops() {
        showModal(`
            <h1 style="color: #133; margin-top: -20px;">Oops...</h1>
            <p>Did you really think you couldn't make it? Nah, don't worry! it was just the end of the game. Even though you could make it, there are no more levels left HAHAH! :/ </p>
            <p>Thanks for playing! See ya chum!</p>
        `);
    }
}