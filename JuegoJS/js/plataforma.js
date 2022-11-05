function Plataforma(x, y){


	Kinetic.Rect.call(this); //Constructor de la clase heredada


	this.setWidth(200);
	this.setHeight(40);
	this.setX(x);
	this.setY(y);
	this.setFill('black');
	
	
}    


Plataforma.prototype = Object.create(Kinetic.Rect.prototype); //Herencia de la clase create de kinetic js