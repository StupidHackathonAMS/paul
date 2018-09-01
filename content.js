function foo (event) {
  const myDiv = document.body;
  console.log(myDiv);
  /*if (myDiv.style.transform) {
  	myDiv.style.transform = '';
  } else*/ {
		myDiv.style.transform = 'rotate('+(Math.floor(Math.random()*360))+'deg)';
  }
  console.log(myDiv.style.transform);
}
document.addEventListener('mousemove', foo);
