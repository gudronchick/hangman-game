const canv = document.getElementById('canvas');
const context = canv.getContext('2d');
const text = document.querySelector('.text');
const words = ['hello', 'key', 'name', 'kitten', 'wall', 'to', 'the'];
let count = 0;
let word;
let insription = 'You died';

const getRandomWord = (words) => {
  word = words[Math.round(Math.random() * (words.length - 1))];
  return word;
}

const drawSymbolOfWord = (word) => {
  let designation = word.replace(/\w/g, '<span>_</span>');
  text.innerHTML = designation;
  console.log(word);
}

drawSymbolOfWord(getRandomWord(words));

// sticks
context.lineWidth = 4;
context.moveTo(200, 20);
context.lineTo(200, 250);
context.stroke();
context.moveTo(196, 24);
context.lineTo(400, 24);
context.stroke();
context.moveTo(200, 70);
context.lineTo(250, 24);
context.stroke();


const drawHangman = () => {

  const first = () => {
    context.lineWidth = 3;
    context.moveTo(300, 24);
    context.lineTo(300, 60);
    context.stroke();
    context.lineWidth = 2;
    context.beginPath();
    context.arc(300, 80, 20, 0, Math.PI * 2);
    context.stroke();
  };

  const second = () => {
    context.moveTo(300, 100);
    context.lineTo(300, 110);
    context.stroke();
  };

  const third = () => {
    context.beginPath();
    context.ellipse(300, 150, 20, 40, 0, 0, Math.PI * 2);
    context.stroke();
  };

  const fourth = () => {
    context.moveTo(290, 115);
    context.lineTo(250, 90);
    context.stroke();
  };

  const fifth = () => {
    context.moveTo(310, 115);
    context.lineTo(350, 90);
    context.stroke();
  };

  const sixth = () => {
    context.moveTo(290, 185);
    context.lineTo(270, 220);
    context.stroke();
  };

  const seventh = () => {
    context.moveTo(310, 185);
    context.lineTo(330, 220);
    context.stroke();
  };

  const eigth = () => {
    context.beginPath();
    context.font = '30px sans-serif';
    context.fillText(insription, 320, 350);
    context.fill();
  };

  switch (count) {
    case 1:
      first();
      break;
    case 2:
      second();
      break;
    case 3:
      third();
      break;
    case 4:
      fourth();
      break;
    case 5:
      fifth();
      break;
    case 6:
      sixth();
      break;
    case 7:
      seventh();
      break;
    case 8:
      eigth();
      document.removeEventListener('keyup', guessKey);
  }
};

drawHangman();

const guessKey = (e) => {
  if (e.keyCode < 60 || e.keyCode > 90) return;
  if (~word.indexOf(e.key)) {
    word = [...word];
    word.forEach((letter, i) => {
      if (letter === e.key) {
        word[i] = '_';
        text.children[i].innerHTML = e.key;
      }
    });
    if (!word.join('').match(/[a-zA-Z]/g)) {
      insription = 'You won!!!'
      count = 8;
      drawHangman();
    }
  } else {
    count++;
    drawHangman();
  }
}

document.addEventListener('keyup', guessKey);