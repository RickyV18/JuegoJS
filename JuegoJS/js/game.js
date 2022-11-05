function Game(){

	this.estado= 'antes';
	this.puntaje = 0;
	this.llave = false;
	this.nivel = 1


	Kinetic.Rect.call(this); //Constructor de la clase heredada
/*

	this.setWidth(60);
	this.setHeight(60);
	this.setX(x);
	this.setY(y);
	this.contador = 0;
	this.setFill('blue');
	
	this.aleatorio = function(inferior, superior)
	{
		var posibilidades = superior - inferior;
		var random = Math.random() * posibilidades;
		random = Math.floor(random); //Redondear resultado
		return parseInt(inferior) + random;

	}
	
	this.mover = function(){
		this.contador++;
		this.setX(this.getX() + Math.sin(this.contador * Math.PI / 50) * 5 );
	}*/
		
}    


Game.prototype = Object.create(Kinetic.Rect.prototype); //Herencia de la clase create de kinetic js