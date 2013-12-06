
parameters = {};
var renderer;
var camera;
var scene;
var angle= Math.PI/2;
var z=7;
var width=12;
var height=12;
r = {};


//list of the cubes in the scene, for now, 10x10x10
var cubes = new Array();

//number of chase cubes
var chaseS = 50;
var chaseD=1;
var chaseSpos=chaseS;
var frames = new Array();
var load = function(){
	
	f = function(x,y){
		if ((x==5 && y==5) || (x==6 && y==5)|| (x==5 && y ==6) || (x==6 && y==6))
			return 1; 
		return 0;
	};
	/*
	f = function(x,y){
		if(Math.random() > .85)
			return 1;
	};
	*/
	init(12,12,f);
	r.live = primes[2];
	r.stay = primes[3];
	
	
	
	parameters.canvas= document.getElementById("CastlesInTheSky");
	renderer = new THREE.WebGLRenderer(parameters);
	var width= parameters.canvas.width, height = parameters.canvas.height;
	var fovy=45, aspect=width/height, near=.1, far=10000;

	
	renderer.setSize(width, height);
	
	camera = new THREE.PerspectiveCamera(
	fovy, aspect, near, far);
	scene = new THREE.Scene();
	scene.add(camera);
	camera.position.z =z;

	prepCubes();
	
	for(var i=0; i<12; i++){
		frames.push(step2d(state2d , r));
	}
	
	render();
}
/* new take: make cubes, add sub based on arrays in lock...
*/
var prepCubes = function(){
	//load some cubes;
	for(var i=0; i< 12; i++){
	cubes[i] = new Array(12);
		for(var j=0; j<width; j++){
			cubes[i][j] = new Array(0);
			for(var k=0; k<height; k++){
				var col = new THREE.Color();
				var dist = Math.sqrt((j-6)*(j-6)+(k-6)*(k-6))/(Math.sqrt(2)*6) ;
				
				col.setRGB(1-dist,dist,i/12.);
				var pos = cubes[i][j].push(new THREE.Mesh(
				new THREE.CubeGeometry(.25,.25,.25),
				new THREE.MeshBasicMaterial({wireframe: false, color: col.getHex()})));
					cubes[i][j][pos-1].position.x = -1.75+j*.25;
					cubes[i][j][pos-1].position.y = -1.75+i*.25;
					cubes[i][j][pos-1].position.z = -1.75+k*.25;
				//scene.add(cubes[i][j][pos-1]);
			}
		}
	}
}
		//if (state2d[j][k]){}
var ctr=0;
var ctrMax=25;
//add a cube chase effect...
/* cube chase requires that we track a list of the currently valid poitns then add new one/remove old ones */
var render = function(){
		requestAnimationFrame(render);
		
		if(ctr==ctrMax){	
			for(var i =0 ; i<12; i++){
				for(var j=0; j<width; j++){
					for(var k=0; k<height; k++){
						if(frames[i][j][k])
							scene.remove(cubes[i][j][k]);
					}
				}
			}
		
			frames.push(step2d(state2d , r));
			frames.pop();
			
			for(var i =0 ; i<12; i++){
				for(var j=0; j<width; j++){
					for(var k=0; k<height; k++){
						if(frames[i][j][k])
							scene.add(cubes[i][j][k]);
					}
				}
			}
		ctr=0;
		}
		ctr+=1;
		angle+=0.01;
		camera.position.x =z* Math.cos(angle);
		camera.position.z =-z* Math.sin(angle);
		camera.lookAt(new THREE.Vector3(0,0,0));
		//camera.rotation.y +=0.01;
		renderer.render(scene, camera);
		};
		