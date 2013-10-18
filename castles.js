engine={};

//this step is meant to run from start to finish updating the system according to rulesets
//key values 
engine.ruleSet = function(cellState, neighbors){
	switch(neighbors){
	case 0:
	case 1:
	case 2:
	case 3:
		return 0;
	case 4:
	case 5:
	case 6:
		return 1;
	case 19:
	case 20:
	case 21:
	case 22:
	case 23:
	case 24:
	case 25:
	case 26:
		return 0;
	default:
		return cellState
		break;
	}
}

engine.computeStep = function(){
	for(var i=0; i<dim; i++){
		for(var j=0; j<dim; j++){
			for(var k=0; k<dim; k++){
				engine.core[i][j][k]=engine.ruleSet(engine.core[i][j][k],engine.neighbors(engine.core[i][j][k]));
			}
		}
	}
}

engine.init = function(dim){
	var engine.core = new Array();
	var engine.processed = new Array();
	for(var i=0; i<dim; i++){
		engine.core[i] = new Array();
		engine.processed[i] = new Array();
		for(var j=0; j<dim; j++){
			engine.core[i][j] = new Array();
			engine.processed[i][j] = new Array();
			for(var k=0; k<dim; k++){
				engine.core[i][j][k] = 0;
			}
		}
	} 
}
//k is meant to bind the k-neighborhood to search
//Computes live neighbors of any value
engine.neighbors = function(x,y,z,k){
	//a 3 pass loop to find the cube of neighbors based on the size of neighbors+current location
	y-=k;
	x-=k;
	z-=k;
	var total=0;
	for(var i=0; i<2*k+1; i++){
		for(var j=0; j<2*k+1; j++){
			for(var v=0; v<2*k+1; v++){
				if(engine.core[x+i][y+j][z+v]>0)
					total+=1;
			}
		}
	}
	return total;
}