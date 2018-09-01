function handleMotion (event) {
  const myDiv = document.body;
  
  myDiv.style.transform = 'rotate('+(event.accelerationIncludingGravity.x*36)+'deg)';
}
document.addEventListener('devicemotion', handleMotion);

