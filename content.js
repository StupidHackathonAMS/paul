var step = 'x';
var t = 0;

function xyas(t) {
  const x = 5 * (Math.sin(t/45) + Math.sin(t/135));
  const y = -3 * Math.cos(t/63);
  const a = 10 * Math.cos(t/90);
  const s = Math.sqrt(Math.pow(4 * Math.sin(t/320),2)) - 2;
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
  window.setTimeout(nextStep, 0.1);
}
window.setTimeout(nextStep, 0.1)
