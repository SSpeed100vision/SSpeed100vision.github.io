const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const MAX_KEY_SIZE = SYMBOLS.length;

window.onload = function() {
  function scrollToGameArea() {
    document.getElementById("game-area").scrollIntoView({ behavior: "smooth" });
  }

  document.getElementById("js-btn").addEventListener("click", function() {
    document.getElementById("game-area").innerHTML = `
      <h2>JavaScript DUNK GAME</h2>
      <p>Don't hit the cones!</p>
      <div style="position:relative;height:0;padding-bottom:117.6%;overflow:hidden;">
        <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" 
          src="https://arcade.makecode.com/---run?id=S95547-23029-57786-48488" 
          allowfullscreen sandbox="allow-popups allow-forms allow-scripts allow-same-origin">
        </iframe>
      </div>
    `;
    scrollToGameArea();
  });

  document.getElementById("python-btn").addEventListener("click", function() {
    document.getElementById("game-area").innerHTML = `
      <h2>Python Tag Multiplayer</h2>
      <p>Have fun with friends!!</p>
      <div style="position:relative;height:0;padding-bottom:117.6%;overflow:hidden;">
        <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" 
          src="<div style="position:relative;height:0;padding-bottom:117.6%;overflow:hidden;">
          <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://arcade.makecode.com/---run?id=S37045-27779-82729-92944"
          allowfullscreen="allowfullscreen" 
          sandbox="allow-popups allow-forms allow-scripts allow-same-origin" 
          frameborder="0">
        </iframe>
      </div>
    `;
    scrollToGameArea();
  })

function runCipher() {
  const mode = document.getElementById('mode').value;
  const message = document.getElementById('message').value;
  let key = parseInt(document.getElementById('key').value, 10);

  if (!message) {
    document.getElementById('result').innerText = "Please enter a message.";
    return;
  }

  if (isNaN(key) || key < 1 || key > MAX_KEY_SIZE) {
    document.getElementById('result').innerText = "Please enter a valid key between 1 and 52.";
    return;
  }

  const translated = getTranslatedMessage(mode, message, key);
  document.getElementById('result').innerText = translated;
}

function getTranslatedMessage(mode, message, key) {
  if (mode === 'decrypt') {
    key = -key;
  }

  let translated = '';
  for (let symbol of message) {
    const symbolIndex = SYMBOLS.indexOf(symbol);
    if (symbolIndex === -1) {
      translated += symbol;
    } else {
      let newIndex = symbolIndex + key;
      if (newIndex >= SYMBOLS.length) {
        newIndex -= SYMBOLS.length;
      } else if (newIndex < 0) {
        newIndex += SYMBOLS.length;
      }
      translated += SYMBOLS[newIndex];
    }
  }

  return translated;
}
