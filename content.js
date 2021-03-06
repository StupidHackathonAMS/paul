var step = 'x';
var t = 0;
var ampl = 1;

function xyas(t) {
  const totalHeight = document.body.scrollHeight;
  const center = totalHeight / 2;
  const currentHeight = document.scrollingElement.scrollTop;
  const screenHeight = window.innerHeight;
  const distanceFromCenterInScreens = (currentHeight - center) / screenHeight;
  const rot_ampl = Math.pow(Math.E, -Math.abs(distanceFromCenterInScreens)) + 0.2;
  const tr_ampl = rot_ampl;
  var fadeIn = t/200;
  if (fadeIn > 1) {
    fadeIn = 1;
  }

  const x = fadeIn * ampl * tr_ampl * 100 * (Math.sin(t/45) + Math.sin(t/135));
  const y = fadeIn * ampl * tr_ampl * 30 * Math.cos(t/63);
  const a = fadeIn * ampl * rot_ampl * 15 * Math.cos(t/90);
  const s = fadeIn * ampl * Math.sqrt(Math.pow(8 * Math.sin(t/320),2)) - 2;
  return [x, y, a, s];
}

function nextStep (event) {
	const myDiv = document.body;
  const [x, y, a, s] = xyas(t);
  switch(step) {
    case 'x':
      myDiv.style.left = x + 'px';
      step = 'y';
      break;
    case 'y':
      myDiv.style.top = y + 'px';
      step = 'r';
      break;
    case 'r':
      myDiv.style.transform = 'rotate('+a+'deg)';
      step = 's';
      break;
    case 's':
      myDiv.style.filter = 'blur('+s+'px)';
      step = 'x';
      break;
  }
  t += 1;
  window.setTimeout(nextStep, 10);
}
window.setTimeout(nextStep, 10)

var oldX = 0;
var oldY = 0;
var olda = 0;
function handleMouse(event) {
  const newX = event.screenX;
  const newY = event.screenY;
  const [x, y, a, s] = xyas(t);
  if ((newX-oldX) > 0) {
    if (a > olda) {
      ampl -= 0.1;
    } else {
      ampl += 0.1;
    }
  } else if ((newX-oldX) < 0) {
    if (a < olda) {
      ampl -= 0.1;
    } else {
      ampl += 0.1;
    }
  }
  if (ampl > 3) {
    ampl = 3;
  }
  if (ampl < 0.2) {
    ampl = 0.2;
  }

  oldX = newX;
  oldY = newY;
  olda = a;
}

function getNextPukeStep(img, targetX, targetY) {
  var currentX = img.offsetLeft;
  var currentY = img.offsetTop;
  const noOfSteps = 20;
  var nextDimension = 'x';
  var stepX = (targetX - currentX) / noOfSteps;
  var stepY = (targetY - currentY) / noOfSteps;
  var reachedX = false;
  var reachedY = false;

  const nextPukeStep = function (event) {
    console.log(nextDimension);
    switch(nextDimension) {
      case 'x':
        currentX += stepX;
        if(currentX < targetX) {
          currentX = targetX;
          reachedX = true;
        }
        img.style.left = currentX + 'px';
        nextDimension = 'y';
        break;
      case 'y':
        currentY += stepY;
        console.log(currentY)
        if(currentY > targetY) {
          currentY = targetY;
          reachedY = true;
        }
        img.style.top = currentY + 'px';
        nextDimension = 'x';
        break;
    }
    if(!(reachedX && reachedY)) {
      window.setTimeout(nextPukeStep, 100);
    }
  }

window.setTimeout(nextPukeStep, 100);
return nextPukeStep;
}

document.addEventListener('mousemove', handleMouse);

function handleClick(event) {
  const img = document.createElement('img');
  img.src = chrome.extension.getURL('images/puke.png');
  img.classList.add('puke');
  document.body.appendChild(img);
  window.setTimeout(getNextPukeStep(img, event.pageX, event.pageY), 100);
  window.setTimeout(function () {
    img.style.display = 'none';
  }, 10000);
}

document.addEventListener('click', handleClick);
