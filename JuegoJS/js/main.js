var stage, fondo, puntaje,grupoAssets;
var keyboard = {};
var intv;
var personaje;
var grav = 0.8;
var val_reb = 0; //Calor de rebote valor negativo para agregar rebote
var juego = new Game() ;

grupoAssets = new Kinetic.Group({
	x:0,
	y:0
});

stage = new Kinetic.Stage({
	container: 'game',
	width: 960,
	height: 500,
	
});  




puntaje = new Kinetic.Text({
	text:'Puutaje: 0',
	height: 25,
	width: 150,
	x: stage.getWidth() - 150,
	y: 0,
	fill: '#222',
	fontFamily: 'Arial',
	fontSize: 20
});




function nivelUno(){
	
	juego.puntaje=0;

	fondo = new Kinetic.Layer();



	/*Enemigos*/
	grupoAssets.add(new Enemigo(200, stage.getHeight()-75));
	grupoAssets.add(new Enemigo(850, stage.getHeight()/3.9-60));
	grupoAssets.add(new Enemigo(170, stage.getHeight()/3-60));
	grupoAssets.add(new Enemigo(800, stage.getHeight()-75));
	grupoAssets.add(new Enemigo(1120, stage.getHeight()-75));
	grupoAssets.add(new Enemigo(1220, stage.getHeight() -75));


	/*Plataformas*/
	var piso = new Plataforma(0, stage.getHeight()-15);
	piso.setWidth(stage.getWidth() * 2);
	grupoAssets.add(piso); 
	grupoAssets.add(new Plataforma(20, stage.getHeight()/1.5));
	//grupoAssets.add(new Plataforma(190, stage.attrs.height/3));
	grupoAssets.add(new Plataforma(190, stage.getHeight()/3));
	grupoAssets.add(new Plataforma(510, stage.getHeight()/1.6));
	grupoAssets.add(new Plataforma(830, stage.getHeight()/3.9));


	/*Monedas*/
	grupoAssets.add(new Moneda(350, stage.getHeight()/3-130));


	personaje = new Heroe();
	personaje.setX(0);
	personaje.setY(stage.getHeight()-personaje.getHeight());//Se resta al alto del canvas el alto del personaje
	personaje.limiteDer = stage.getWidth()-personaje.getWidth();
	personaje.limiteTope = stage.getHeight();
	fondo.add(personaje);
	fondo.add(grupoAssets); //agregar enemigos
	fondo.add(puntaje);
	stage.add(fondo);
}




function moverPersonaje()
{

	if (keyboard[37]) 
		{
			personaje.retroceder();
		}
	if(keyboard[39])
	{
		personaje.caminar();
	}	
	if(keyboard[38] && personaje.contador < 1)
	{
		personaje.saltar();
	}	
}



function addKeyBoardEvents(){

	addEvent(document, "keydown", function(e){

		keyboard[e.keyCode] = true;
	});


	addEvent(document, "keyup", function(e){

		keyboard[e.keyCode] = false;
	});

	function addEvent (element, eventName, func)
	{
		if(element.addEventListener){ //checar el evento del navegador

			element.addEventListener(eventName,func, false);

		}else if (element.attachEvent)
		{
			element.attachEvent(eventName,func);
		}
			
			
	}
}

function hit(a,b){
	var hit = false;

	//colisiones horizontales
	if(b.getX() + b.getWidth() >= a.getX()  && b.getX() < a.getX() + a.getWidth())
		{
			//colisiones verticales
			if(b.getY() + b.getHeight() >= a.getY() && b.getY() < a.getY() + a.getHeight())
				hit= true;
		}

	//colisiones de a con b
		if(b.getX() <= a.getX() && b.getX() + b.getWidth() >= a.getX() + a.getWidth() )
		{
			
			if(b.getY() <= a.getY() &&  b.getY() + 	b.getHeight() >= a.getY() + a.getHeight())
				hit= true;
		}

	//Colision b con a
		if(a.getX() <= b.getX() && a.getX() + a.getWidth() >= b.getX() + b.getWidth() )
		{
			
			if(a.getY() <= b.getY() &&  a.getY() + 	a.getHeight() >= b.getY() + b.getHeight())
				hit= true;
		}

	return hit;	
} 



function moverEnemigos()
{
	var enemigos = grupoAssets.children;

	for (i in enemigos)
	{
		var enemigo = enemigos[i];

		if (enemigo instanceof Enemigo)
		{
		   enemigo.mover(); 
		}
	}
}

function aplicarFuerzas()
{
	personaje.aplicarGravedad(grav, val_reb);
}


function detectarColPlataformas()
{
	var plataformas = grupoAssets.children;  
	for (i in plataformas)
	{
		var plataforma = plataformas[i];
		if(hit(plataforma,personaje))
		{

			if (plataforma instanceof Enemigo) //Instanceof verifica de que clase es el archivo 
				{
					if(personaje.vy > 2 &&  personaje.getY() < plataforma.getY())//Verificar velocidad de caida y la altura del personaje y plataforma
					{
						plataforma.remove();
						juego.puntaje += 5 ; //Se incrementa el juego en 5 cada vez que se elimine un enmigo
						//console.log(juego.puntaje);
					

					}else
					{
						console.log('Fin del juego');
					}


				}
			else if(plataforma instanceof Plataforma && personaje.getY() < plataforma.getY() && personaje.vy >=0 ) //Las cordenadas 0 de Y estan arriba //vy velocidad de caida del personaje
				{
					//Comportamiento
					personaje.contador = 0; //el contador ayuda con la caida del personaje
					personaje.setY(plataforma.getY() - personaje.getHeight()); //Dejas al personaje excacta,ente arriba de la plataforma
					personaje.vy *=val_reb; //Valor del rebote es 0

				}
			else if (plataforma instanceof Moneda) //si la plataforma con la que hizo colision es moneda
				{	
					plataforma.remove();
					juego.puntaje ++;	
					
				}
		}
	}
	
}


function actualizarTexto()
{
	puntaje.setText('Puntaje: '+ juego.puntaje);
}



nivelUno();
addKeyBoardEvents();


intv = setInterval(frameLoop, 1000/20);

function frameLoop ()
{
	aplicarFuerzas();
	detectarColPlataformas();
	moverPersonaje();
	moverEnemigos();
	stage.draw();
	actualizarTexto();
}