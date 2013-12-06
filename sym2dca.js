//implment an ecnoding scheme for symetric ca's
//uses 2 numeric sets: 123/456. the first set denotes white to black transitions, the second denotes black to black/ white to white transitions, all others numbers are
//added to the hidden third set which goes black->white or white to white.

// gen rule genreates a bivariate ruleset with a set chosen from between 0 and max in each half, sum is not gaurenteed to befunction shuffle(o){ //v1.0

var shuffle = function(o){
	for(var i= 0; i<o.length; i++){
			var ct = Math.floor(Math.random()*(o.length-i));
			var tmp = o[i];
			o[i]=o[ct];
			o[ct]=tmp;
	}
	return o;
}

var primes = [2,3,5,7,11,13,17,19,23];
	
var genRule2d = function(){
	var k = Math.floor(Math.random()*7)+1;
	var j = Math.floor(Math.random()*(8-k))+1;
	var list = new Array(8);
	res = {};
	var l1 = 1;
	var l2 = 1;
	list = shuffle(primes);
	for(var i =0; i<k; i++){
		l1 = l1*primes[i];
	}
	for(var i=0; i<j; i++){
		l2 = l2*primes[i+k];
	}
	console.log(k);
	console.log(j);
	console.log(list);
	res.live = l1;
	res.stay = l2;
	return res;
}

/*
Compute the new state that we tick into...
expects to be working on a 2d plane with 2d symetric data
*/
var state2d;
//f is the initialization function, takes an x,y coord, tells you whether its alive or dead in the inital state.
var init = function(x,y, f){
	state2d= new Array(y);
	for(var i=0; i<y; i++){	
		state2d[i] = new Array(x);
		for(var j=0; j<x; j++)
			state2d[i][j]=f(j,i);
	}
}

var step2d = function(state, rule){
	var deltaL = new Array();
	var deltaD = new Array();
	for (var i=0; i< state.length; i++){
		for (var j=0; j< state[0].length; j++){
			var k = neighbors2d(state, j, i);
			if (rule.live%primes[k] ==0){
				deltaL.push(new Array(j,i));
			}
			else if (rule.stay%primes[k] ==0){
			}
			else{
				deltaD.push(new Array(j,i));
			}
		}
	}
	
	for (var i=0; i<deltaL.length; i++){
		state2d[(deltaL[i])[1]][(deltaL[i])[0]] = 1;
	}
	for (var i=0; i<deltaD.length; i++){
		state2d[(deltaD[i])[1]][(deltaD[i])[0]] = 0;
	}
	delta = {};
	delta.L= deltaL;
	delta.D= deltaD;
	return state2d;
}

//non periodic
var neighbors2d = function(grid, x, y){
	var ct =0;
	var width = grid.length;
	var height = grid[0].length;
	for (var i=-1; i<2; i++){
		for (var j=-1; j<2; j++){
			if ((i==0 && j ==0) || i+y>=height || i+y<0 || j+x>=width || j+x<0)
				continue;
			ct += grid[i+y][j+x]
		}
	}
	return ct;
}

//uses periodic bounding conditions
var neighbors2dp = function(grid, x, y){
	var ct =0;
	var width = grid.length;
	var height = grid[0].length;
	for (var i=0; i<3; i++){
		for (var j=0; j<3; j++){
			if (i==1 && j ==1)
				continue;
			ct += grid[(height+(i+(y-1))%height)%height][(width+(j+(x-1))%width)%width]
		}
	}
	return ct;
}