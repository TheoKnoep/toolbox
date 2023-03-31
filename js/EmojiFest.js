/**
 * Feature : ajouter un feu d'artifice d'emoji au clic sur un endroit de la page
 * 😊😂🥰😍😆
 * ... TO DO 
 */


class EmojiFest {
    constructor(options = null) {
        console.log(options); 
        this.id = 'aaa'; 
        this.options = {
            emoji: options ? options.emoji || '😍' : '😍',
            size: options ? options.size || '32px' : '32px'
        }; 
        this.zIndex = 1000; 
        
    }

    on() {
        document.querySelector('*').style.cursor = 'none';
        window.addEventListener('click', event => {
            console.log(event); 
            console.log(event.x, event.y); 
            console.log(event.clientX, event.clientY); 
            document.querySelectorAll('.emoji-fest').forEach(emoji => emoji.remove()); 
        })
        window.addEventListener('mousemove', event => {
            // console.log(event); 
            // console.log(event.x, event.y); 
            // console.log(event.clientX, event.clientY); 
            this.displayEmoji(event.clientX, event.clientY); 
        }, true)
    }

    /** ... TO DO  */
    off() { // fails
        window.removeEventListener('mousemove', event => {
            // console.log(event); 
            // console.log(event.x, event.y); 
            // console.log(event.clientX, event.clientY); 
            this.displayEmoji(event.clientX, event.clientY); 
        }, true)
    }

    displayEmoji(x, y) {
        let emojiCharacter = this.options.emoji; 
        let $emoji = `<div class="emoji-fest"
                style="
                    font-size: ${Math.random() * 100}px;
                    position: fixed; 
                    top: ${y}px; 
                    left: ${x}px; 
                    z-index: ${this.zIndex}; 
                ">
                    ${this.randomEmoji()}
                </div>`; 
        document.body.insertAdjacentHTML('afterbegin', $emoji); 
        this.zIndex ++; 
    }

    randomEmoji() {
        let length = this.possibleEmojis().length; 
        let random = Math.floor(Math.random()*length); 
        return this.possibleEmojis()[random]; 
    }

    possibleEmojis() {
        return [
            '😂', '🤣', '🤩', '😍', '😚', '😛', '🥰'
        ]
    }
}