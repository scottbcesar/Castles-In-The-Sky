function webGlStart(){
	var canvas = document.getElementById("CastlesInTheSky");
	initGL(canvas);
	
	gl.clearColor(0.0,0.0,.5,1.0);
	gl.enable(gl.DEPTH_TEST);
	
	drawScene();
}
var gl;
function initGL(canvas){
	try{
	gl = canvas.getContext("experimental-webgl");
	gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
	} catch(e){}
	if (!gl){
	alert("WebGl init failed");
	}
}

function drawScene(){
	gl.viewport(0,0,gl.viewportWidth, gl.viewportHeight);
}