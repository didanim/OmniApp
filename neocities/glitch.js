const target = document.getElementById('glitchTarget');
  const words = ["CHANGELOG", "UPDATES"];
  let currentIndex = 0;

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&_-+=[]{}";

  function getRandomString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  function triggerTransition() {
    const nextIndex = (currentIndex + 1) % words.length;
    const targetWord = words[nextIndex];
    let frame = 0;
    const totalFrames = 15; 
    
    const glitchInterval = setInterval(() => {
      frame++;
      
      let pseudoWord = '';
      for(let i = 0; i < targetWord.length; i++) {
        if(Math.random() > (frame / totalFrames)) {
          pseudoWord += chars.charAt(Math.floor(Math.random() * chars.length));
        } else {
          pseudoWord += targetWord[i];
        }
      }

      target.innerText = pseudoWord;
      target.setAttribute('data-text', pseudoWord);

      if (frame >= totalFrames) {
        clearInterval(glitchInterval);
        target.innerText = targetWord;
        target.setAttribute('data-text', targetWord);
        currentIndex = nextIndex;
      }
    }, 40); 
  }

  setInterval(triggerTransition, 3500);
