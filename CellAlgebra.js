//rules for 2d are passed as a 9 bit string;
var Combinators2d = new Array(9);
	Combinators2d[0] = new Array(9);
var lastDigit = new Array(9);
	lastDigit[0]= new Array(9);
// in a 2d representation, there are three 3 cell rows
// giving a total of 9 cells to check against while moving on... bytes 0-8 are used for this
var init = function(){
	for (var i=0; i<8; i++){
	Combinators2d[0][i] = function(rule){return (rule&i)>0;};
	lastdigit[0][i]=i;
	}
}



var fill = new function(){
	var size;
	for(var i=1; i<9; i++){
		size=choose(9,i+1);
		Combinators3d[i]=new Array(size);
		lastDigit[i]=new Array(size);
		var ctr=0;
		for(var  j=0; j<len(Combinators2d[i-1]); j++){
			for(var k=lastDigit[i-1][j]+i; k<9; k++){
				Combinators2d[i][ctr] = function(rule){Combinators2d[i-1][j](rule)*Combinators2d[0][k](rule);};
				lastDigit[i][ctr] = k;
				ctr=ctr+1;
			}
		}
	}
}
//process is a function which spits out a funtion for a given rule, automating lookups against thecombinators2d table 
var fetch = new function(rule){
	
}

var factorial = new function(x){
	if (x==1)
		return 1;
	else return factorial(x-1)*x;
}

var choose = new function(n, c){
	return factorial(n)/(factorial(c)*factorial(n-c))
}