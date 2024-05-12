
/*  
ctx.strokeRect(x,y,width,height) // dibuja un rectángulo
ctx.fillRect(x,y,width,height) // dibuja un rectángulo relleno
ctx.fillStyle = '#d30f0e' // el color  rojo

ctx.lineTo(x,y)
ctx.closePath() // cierra el dibujo
ctx.fillStyle = '#f4c521' // el color amarillo
ctx.fill()
ctx.stroke() //dibuja lineTo

ctx.beginPath() // levanta el lápiz
*/
// setInterval(mostrarLuz, 2000);

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const signal = () => {
    //normalizamos
    for (let i = 0; i < CANTIDAD; i++) {
        semaforos[i].setSecuencia(1);
    }
    for (let i = CANTIDAD; i >= 0; i--) {
        if (circuitos[i].isOcupado()) {
            let secuencia = 5; // Comenzamos con secuencia 5
            for (let j = i -1; j >= 0; j--) {
                semaforos[j].setSecuencia(secuencia);
                secuencia--; // Disminuimos secuencia en cada iteración
                if (secuencia < 1) break; // Aseguramos que no sea menor que 1
            }
            break;
        }
    }
}

const dibujar = () => {
    // Dibujamos
    for (let i = 0; i < semaforos.length; i++) {
        semaforos[i].draw();
    }

    for (let i = 0; i < circuitos.length; i++) {
        circuitos[i].draw();
    }
}

function Semaforo({x = 0,y = 0,secuencia = 0,name=''}) {
    /* Secuencia: 
    10 => Todos los aspecto
    4 y 5 => Rojo
    3 => Naranja
    2 => Doble Naranja
    1 => Verde
    */
    this.x = x;
    this.y = y;
    this.name = name;
    this.secuencia = secuencia;
    this.width = 30;
    this.height = 120;
    this.borderRadius = 10;
    this.rojo = '#ff0000';
    this.naranja = '#ffc800';
    this.verde = '#00ff00';
    
    this.setSecuencia = (secuencia) =>{
        this.secuencia = secuencia;
    }
    this.getSecuencia = ()=>{
        return this.secuencia;
    }
    this.draw = () => {
        // Dibujar el fondo
        ctx.fillStyle = '#bfbfbf';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Dibujar los bordes redondeados
        ctx.beginPath();
        ctx.moveTo(this.x  + this.borderRadius, this.y);  // Iniciar en la esquina superior izquierda
        ctx.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + this.height, this.borderRadius); // Línea derecha
        ctx.arcTo(this.x + this.width, this.y + this.height, this.x, this.y + this.height, this.borderRadius); // Línea inferior
        ctx.arcTo(this.x, this.y + this.height, this.x, this.y, this.borderRadius); // Línea izquierda
        ctx.arcTo(this.x, this.y, this.x + this.width, this.y, this.borderRadius); // Línea superior
        ctx.closePath();
        ctx.fillStyle = '#000000';
        ctx.fill();

        // dibujamos el nombre
        ctx.font = "12px serif";
        ctx.strokeText(this.name, (this.x + this.width / 2) -6, this.y + this.height -5);

        // dibujar mástil
        ctx.fillRect(this.x + this.width / 2 -2, this.y + this.height, 5, 75);

        // Dibujar los círculos rojo, naranja y verde
        //Aspecto 1 VERDE
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + 15, 8, 0, 2 * Math.PI);
        if (this.secuencia === 10  || this.secuencia === 1) {
            ctx.fillStyle = this.verde;
        } else {
            ctx.fillStyle = '#000000'; // Relleno negro para luz apagada
            ctx.strokeStyle = '#ffffff'; // Borde blanco para luz apagada
            ctx.lineWidth = 1; // Grosor del borde
            ctx.stroke();
        }
        ctx.fill();
        
        //Aspecto 2 NARANJA
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + 40, 8, 0, 2 * Math.PI);
        if (this.secuencia === 10 || this.secuencia === 2 || this.secuencia === 3) {
            ctx.fillStyle = this.naranja;
        } else {
            ctx.fillStyle = '#000000'; // Relleno negro para luz apagada
            ctx.strokeStyle = '#ffffff'; // Borde blanco para luz apagada
            ctx.lineWidth = 1; // Grosor del borde
            ctx.stroke();
        }
        ctx.fill();
        
        //Aspecto 3 ROJO
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + 65, 8, 0, 2 * Math.PI);
        if (this.secuencia === 10 || this.secuencia === 4  || this.secuencia === 5) {
            ctx.fillStyle = this.rojo;
        } else {
            ctx.fillStyle = '#000000'; // Relleno negro para luz apagada
            ctx.strokeStyle = '#ffffff'; // Borde blanco para luz apagada
            ctx.lineWidth = 1; // Grosor del borde
            ctx.stroke();
        }
        ctx.fill();
        
        //Aspecto 4 NARANJA 2
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + 90, 8, 0, 2 * Math.PI);
        if (this.secuencia === 10 || this.secuencia === 2) {
            ctx.fillStyle = this.naranja;
        } else {
            ctx.fillStyle = '#000000'; // Relleno negro para luz apagada
            ctx.strokeStyle = '#ffffff'; // Borde blanco para luz apagada
            ctx.lineWidth = 1; // Grosor del borde
            ctx.stroke();
        }
        ctx.fill();
    }
}

function Circuito({x = 0,y = 0,ocupado = false,width = 265}){
    this.x = x;
    this.y = y;
    this.ocupado = ocupado;
    this.width = width;
    this.height = 12;
    this.rojo = '#ff0000';
    this.naranja = '#ffc800';
    this.verde = '#00ff00';

    this.setOcupado = (ocupado) =>{
        this.ocupado = ocupado;
    }
    this.isOcupado = ()=>{
        return this.ocupado;
    }

    this.draw = () => {
        // Dibujar el fondo blanco
        if (this.ocupado){
            ctx.fillStyle = this.rojo;
        }else{
            ctx.fillStyle = this.verde;
        }
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

//instancias
const CANTIDAD = 20

const semaforos = [];
const circuitos = [];

for (let i = 0; i < CANTIDAD; i++) {
    const semaforo = new Semaforo({x: (100 + i * 300), y: 50, secuencia: 1, name: `A${CANTIDAD - i}`});
    semaforos.push(semaforo);
}

circuitos.push(new Circuito({x: 10 ,y:250,width:90}));
const xVia = 110;

for (let i = 0; i < CANTIDAD; i++) {
    const circuito = new Circuito({x: xVia + i * 305, y: 250});
    circuitos.push(circuito);
}


dibujar()
const moverseDerecha = () =>{
        circuitos[aux].setOcupado(false)
        aux =  aux < CANTIDAD ? aux + 1: 0;
        circuitos[aux].setOcupado(true)
        signal()
        dibujar()
}
const moverseIzquierda = () =>{
        circuitos[aux].setOcupado(false)
        aux =  aux > 0 ? aux - 1: CANTIDAD;
        circuitos[aux].setOcupado(true)

        signal()
        dibujar()
}
//eventos
let aux = CANTIDAD
let intervaloActivo = false;
let intervalo;
const h2Intervalo = document.getElementById('intervalo');
document.addEventListener('keydown', function(event) {
    if (event.key === 'm') {
        moverseDerecha()
    }
    if (event.key === 'n') {
        moverseIzquierda()
    }
    
    if (event.key === ' ') { 
        if (!intervaloActivo) {
            intervalo = setInterval(moverseDerecha, 2000);
            intervaloActivo = true;
            h2Intervalo.style.display = 'block'; // Mostrar el elemento h2
            console.log('Intervalo activado');
        } else {
            clearInterval(intervalo);
            intervaloActivo = false;
            h2Intervalo.style.display = 'none'; // Ocultar el elemento h2
            console.log('Intervalo desactivado');
        }
    }
});



    

