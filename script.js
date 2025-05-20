  const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const MAX_KEY_SIZE = SYMBOLS.length;

  // Wait for the DOM to fully load
  window.onload = function() {
    // Smooth scroll to game area
    function scrollToGameArea() {
      document.getElementById("game-area").scrollIntoView({ behavior: "smooth" });
    }

    // JS Game Button Logic
    const jsBtn = document.getElementById("js-btn");
    if (jsBtn) {
      jsBtn.addEventListener("click", function () {
        document.getElementById("game-area").innerHTML = `
          <h2>JavaScript DUNK GAME</h2>
          <p>Don't hit the cones!</p>
          <div style="position:relative;height:calc(300px + 5em);width:100%;overflow:hidden;">
            <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" 
              src="https://arcade.makecode.com/---codeembed#pub:S37045-27779-82729-92944"
              allowfullscreen="allowfullscreen"
              frameborder="0"
              sandbox="allow-scripts allow-same-origin">
            </iframe>
          </div>
        `;
        scrollToGameArea();
      });
    }

    // Cipher Logic
    const runCipher = () => {
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
    };

    // Hook up cipher button (if present)
    const cipherBtn = document.getElementById("cipher-btn");
    if (cipherBtn) {
      cipherBtn.addEventListener("click", runCipher);
    }

    // Caesar Cipher translation logic
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

    // Surprise Button
    const surpriseBtn = document.getElementById('surprise-btn');
    const closeBtn = document.getElementById('close-surprise');
    const surpriseScreen = document.getElementById('surprise-screen');

    if (surpriseBtn && closeBtn && surpriseScreen) {
      surpriseBtn.addEventListener('click', function () {
        surpriseScreen.style.display = 'block';
      });

      closeBtn.addEventListener('click', function () {
        surpriseScreen.style.display = 'none';
      });
    }
  };
