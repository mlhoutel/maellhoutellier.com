var population; 
var lifespan = 100;
var PopulationSize = 200;
var count = 0;
var lifeP;
var ratio = 0;
var target;


function setup() {
	createCanvas(600,1000);
	population = new Population();
	lifeP = createP('default');
	target = createVector(width/2, 50);
}

function draw() {
	background(0);

	population.run();

	lifeP.html('Generation: ' + count + '  - Ratio: ' + ratio + ' / ' + PopulationSize + ' (' + ((ratio/PopulationSize)*100).toFixed(2) + '%)');

	count++;

	if (count == lifespan)
	{
		population.evaluate();
		population.selection();

		//population = new Population();
		count = 0;
	}

	ellipse(target.x,target.y,16,16);
}

function Population() {
	this.rockets = [];
	this.popsize = PopulationSize;
	this.matingpool= [];

	for (var i = 0; i <this.popsize; i++)
	{
		this.rockets[i] = new Rocket();
	}

	this.evaluate = function() {

		ratio = 0;
		var maxfit = 0;

		for (var i = 0; i <this.popsize; i++)
		{
			this.rockets[i].calcFitness();

			if (this.rockets[i].fitness > maxfit)
			{
				maxfit = this.rockets[i].fitness;
			}

			if (this.rockets[i].reached == true)
			{
				ratio++;
			}
		}
		
		//console.log(this.rockets);
		
		for (var i = 0; i <this.popsize; i++)
		{
			this.rockets[i].fitness = this.rockets[i].fitness / maxfit;
		}

		this.matingpool = [];

		for (var i = 0; i <this.popsize; i++)
		{
			var n = this.rockets[i].fitness * 100;

			for (var j = 0; j < n; j++)
			{
				this.matingpool.push(this.rockets[i]);
			}
		}
	}

	this.selection = function() {
		var newRockets = [];

		for (var i = 0; i < this.popsize; i++)
		{
			var parentA = random(this.matingpool);
			var parentB = random(this.matingpool);
			var child = parentA.dna.crossover(parentB.dna);
			child.mutation();

			var childColor = parentA.crosscolor(parentB);

			newRockets[i] = new Rocket(child,childColor);
		}

		this.rockets = newRockets;
	}

	this.run = function() {
		for (var i = 0; i < this.popsize; i++)
		{
			this.rockets[i].update();
			this.rockets[i].show();
		}
	}
}

function DNA(newGenes) {

	if (newGenes)
	{
		this.genes = newGenes;
	}
	else
	{
		this.genes = [];
		for (var i= 0; i < lifespan; i++)
		{
			this.genes[i]=p5.Vector.random2D();
		}
	}

	this.crossover = function(partner) {
		var newgenes = [];
		var mid = floor(random(lifespan));

		for (var i = 0; i < lifespan; i++)
		{
			if (i > mid)
			{
				newgenes[i] = this.genes[i];
			} 
			else
			{
				newgenes[i] = partner.genes[i];
			}
		}
		return new DNA(newgenes);
	}

	this.mutation = function() {
		for (var i = 0; i < lifespan; i++)
		{
			if (random(1) < 0.01) {
				this.genes[i] = p5.Vector.random2D();
				//this.genes[i].setMag(0.1);
			}
		}
	}
}

function Rocket(dna, fcolor) {
	this.pos = createVector(width/2, height);
	this.vel = createVector();
	this.acc = createVector();
	this.reached = false;

	if (dna)
	{
		this.dna = dna;
	}
	else
	{
		this.dna = new DNA();
	}

	this.fitness;

	//Size Array = [bodyHeight,bodyWidth,trusterHeight,trusterWidth,trusterBottom]
	this.size = [20,5,10,3,5];

	if (fcolor)
	{
		this.fillColor = fcolor;
	}
	else
	{
		this.fillColor = [random(255),random(255),random(255)];
	}

	this.crosscolor = function(partner) {

		var cColor = [];

		for (i=0; i<3; i++)
		{
			cColor[i] = this.fillColor[i];
			//cColor[i] = abs(this.fillColor[i]-partner.fillColor[i]);
		}
		return cColor;
	}

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.calcFitness = function() {
		var d = dist(this.pos.x, this.pos.y, target.x, target.y)
		this.fitness = map(d, 0, width, width, 0);

		if (this.reached)
		{
			this.fitness = this.fitness * 10;
		}
	}

	this.update = function() {
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		if (d < 10)
		{
			this.reached = true;
			this.pos = target.copy();
		}

		this.applyForce(this.dna.genes[count]);

		if (!this.reached)
		{
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
		}
	}

	this.show = function() {

		push();
		translate(this.pos.x,this.pos.y);
		rotate(this.vel.heading());
		rectMode(CENTER);
		noStroke();
		fill(this.fillColor);
		rect(0,0,this.size[0],this.size[1]);
		rect(-this.size[3]-this.size[4], (this.size[1]/6)+this.size[3], this.size[2], this.size[3]);
		rect(-this.size[3]-this.size[4],-(this.size[1]/6)-this.size[3], this.size[2], this.size[3]);		
		pop();

	}
}