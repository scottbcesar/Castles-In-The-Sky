var gl = Gl.create();
var cubeStack;
window.onload = function(){
	function onresize(){
		gl.canvas.width = window.innerWidth;
		gl.canvas.height= window.innerHeight;
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.matrixMode(gl.PROJECTION);
		gl.loadIdentity();
		gl.perspective(45, gl.canvas.width / gl.canvas.height, 0.01, 100);
		gl.matrixMode(gl.MODELVIEW);
		draw();
	}
	document.body.appendChild(gl.canvas);
	gl.clearColor(0, 0, 0, 1);
	
	document.getElementById('loading').innerHTML = '';
	onresize();
	
	var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function(callback) { setTimeout(callback, 0); };
	
	var prevTime = new Date().getTime();
  function animate() {
    var nextTime = new Date().getTime();
    if (!paused) {
      update((nextTime - prevTime) / 1000);
      draw();
    }
    prevTime = nextTime;
	
    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);

  window.onresize = onresize;
}
