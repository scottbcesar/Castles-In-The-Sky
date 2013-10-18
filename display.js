function webGlStart(){
	var canvas = document.getElementById("CastlesInTheSky");
	initGL(canvas);
	initBuffers();
	
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

  var mvMatrix = mat4.create();
  var pMatrix = mat4.create();
  var tirangleVertexPosBuff;
function initBuffers(){
	triangleVertPosBuff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertPosBuff);
	var vertices = [
		0,1,0,
		-1,-1,-
		1,-1,0
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	triangleVertPosBuff.itemSize = 3;
	triangleVertPosBuff.numItems = 3;
}

function drawScene(){
	gl.viewport(0,0,gl.viewportWidth, gl.viewportHeight);
	gl.clearColor(0,0,0,1.0);
	mat4.perspective(45,gl.viewportWidth/gl.viewportHeight,0.1,100,pMatrix);
	mat4.identity(mvMatrix);
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertPosBuff);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertPosBuff.itemSize, gl.FLOAT, false, 0, 0);
	setMatrixUniforms();

}