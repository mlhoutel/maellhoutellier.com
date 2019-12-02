var d = new dragon();

function setup() {
	createCanvas(2000,2000)
	background(255);

	d.load();
	d.next(15)
	d.show();
	
}

function dragon() {

	var liste = [];
	var step = 1;
	var len = 5;

	this.load = function() {

		liste[0] = new segment(height/2,width/2,len,270);
		var origin = liste[liste.length - 1].end();
		liste[1] = new segment(origin[0],origin[1],len,180);
	
	}

	this.next = function(iterations=1) {
		
		for (var it = 0; it < iterations; it ++)
		{

			for (var i = (Math.pow(2,step)-1); i >= 0; i--) {
				var sorigin = liste[liste.length-1].end();
				var temp = liste[i].morph(-90,sorigin[0],sorigin[1]);
				liste.push(temp);
			}

			step ++;
		}

	}	
	
	this.show = function() {
		for (var i = 0; i < liste.length; i++) {
			liste[i].show();
		}
	}

}

class segment {

	constructor(x,y,size,angle) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.angle = angle;
	}

	show() {
		angleMode(DEGREES);
		var vec = createVector(this.size,0);
		vec.rotate(this.angle);

	 	push();
		stroke('black');
		strokeWeight(3);
		fill('black');
		translate(this.x, this.y);
		line(0, 0, vec.x, vec.y);
		rotate(this.angle);
		pop();
	}

	end() {
		angleMode(DEGREES);
		var fx = floor(this.x + this.size * cos(this.angle));
		var fy = floor(this.y + this.size * sin(this.angle));
		var temp = [fx,fy];
		return temp;
	}

	start() {
		angleMode(DEGREES);
		var fx = this.x;
		var fy = this.y;
		var temp = [fx,fy];
		return temp;
	}

	morph(angle, x, y) {
		var temp = new segment(x, y, this.size, this.angle + angle);
		return temp;
	}

}