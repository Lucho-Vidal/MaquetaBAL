// /*
// ctx.strokeRect(x,y,width,height) // dibuja un rectángulo
// ctx.fillRect(x,y,width,height) // dibuja un rectángulo relleno
// ctx.fillStyle = '#d30f0e' // el color  rojo

// ctx.lineTo(x,y)
// ctx.closePath() // cierra el dibujo
// ctx.fillStyle = '#f4c521' // el color amarillo
// ctx.fill()
// ctx.stroke() //dibuja lineTo

// ctx.beginPath() // levanta el lápiz
// */
// // setInterval(mostrarLuz, 2000);

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

class Semaforo {
    constructor({
        x = 0,
        y = 0,
        width = 20,
        height = 60,
        secuencia = 0,
        name = "",
    }) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.secuencia = secuencia;
        this.width = width;
        this.height = height;
        this.borderRadius = 10;
        this.rojo = "#ff0000";
        this.naranja = "#ffc800";
        this.verde = "#00ff00";
        this.espacioEntreAspectos = this.height / 6;
    }
    /* Secuencia: 
    10 => Todos los aspecto
    4 y 5 => Rojo
    3 => Naranja
    2 => Doble Naranja
    1 => Verde
    */

    setSecuencia = (secuencia) => {
        this.secuencia = secuencia;
    };
    getSecuencia = () => {
        return this.secuencia;
    };
    draw = (ctx) => {
        // Dibujar el fondo
        ctx.fillStyle = "#bfbfbf";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Dibujar los bordes redondeados
        ctx.beginPath();
        ctx.moveTo(this.x + this.borderRadius, this.y); // Iniciar en la esquina superior izquierda
        ctx.arcTo(
            this.x + this.width,
            this.y,
            this.x + this.width,
            this.y + this.height,
            this.borderRadius
        ); // Línea derecha
        ctx.arcTo(
            this.x + this.width,
            this.y + this.height,
            this.x,
            this.y + this.height,
            this.borderRadius
        ); // Línea inferior
        ctx.arcTo(
            this.x,
            this.y + this.height,
            this.x,
            this.y,
            this.borderRadius
        ); // Línea izquierda
        ctx.arcTo(
            this.x,
            this.y,
            this.x + this.width,
            this.y,
            this.borderRadius
        ); // Línea superior
        ctx.closePath();
        ctx.fillStyle = "#000000";
        ctx.fill();

        // dibujamos el nombre
        ctx.font = "10px serif";
        ctx.strokeText(
            this.name,
            this.x + this.width / 2 - 6,
            this.y + this.height - 5
        );

        // dibujar mástil
        ctx.fillRect(this.x + this.width / 2 - 2, this.y + this.height, 5, 50);

        // Dibujar los círculos rojo, naranja y verde
        //Aspecto 1 VERDE
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2,
            this.y + this.espacioEntreAspectos,
            this.height / 20,
            0,
            2 * Math.PI
        );
        if (this.secuencia === 10 || this.secuencia === 1) {
            ctx.fillStyle = this.verde;
        } else {
            ctx.fillStyle = "#000000"; // Relleno negro para luz apagada
            ctx.strokeStyle = "#ffffff"; // Borde blanco para luz apagada
            ctx.lineWidth = 1; // Grosor del borde
            ctx.stroke();
        }
        ctx.fill();

        //Aspecto 2 NARANJA
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2,
            this.y + this.espacioEntreAspectos * 2,
            this.height / 20,
            0,
            2 * Math.PI
        );
        if (
            this.secuencia === 10 ||
            this.secuencia === 2 ||
            this.secuencia === 3
        ) {
            ctx.fillStyle = this.naranja;
        } else {
            ctx.fillStyle = "#000000"; // Relleno negro para luz apagada
            ctx.strokeStyle = "#ffffff"; // Borde blanco para luz apagada
            ctx.lineWidth = 1; // Grosor del borde
            ctx.stroke();
        }
        ctx.fill();

        //Aspecto 3 ROJO
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2,
            this.y + this.espacioEntreAspectos * 3,
            this.height / 20,
            0,
            2 * Math.PI
        );
        if (
            this.secuencia === 10 ||
            this.secuencia === 4 ||
            this.secuencia === 5
        ) {
            ctx.fillStyle = this.rojo;
        } else {
            ctx.fillStyle = "#000000"; // Relleno negro para luz apagada
            ctx.strokeStyle = "#ffffff"; // Borde blanco para luz apagada
            ctx.lineWidth = 1; // Grosor del borde
            ctx.stroke();
        }
        ctx.fill();

        //Aspecto 4 NARANJA 2
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2,
            this.y + this.espacioEntreAspectos * 4,
            this.height / 20,
            0,
            2 * Math.PI
        );
        if (this.secuencia === 10 || this.secuencia === 2) {
            ctx.fillStyle = this.naranja;
        } else {
            ctx.fillStyle = "#000000"; // Relleno negro para luz apagada
            ctx.strokeStyle = "#ffffff"; // Borde blanco para luz apagada
            ctx.lineWidth = 1; // Grosor del borde
            ctx.stroke();
        }
        ctx.fill();
    };
}
class Circuito {
    constructor({ x = 0, y = 0, ocupado = false, width = 170 }) {
        this.x = x;
        this.y = y;
        this.ocupado = ocupado;
        this.width = width;
        this.height = 10;
        this.rojo = "#ff0000";
        this.naranja = "#ffc800";
        this.verde = "#00ff00";
    }

    setOcupado(ocupado) {
        this.ocupado = ocupado;
    }

    isOcupado() {
        return this.ocupado;
    }

    draw(ctx) {
        // Dibujar el fondo blanco
        if (this.ocupado) {
            ctx.fillStyle = this.rojo;
        } else {
            ctx.fillStyle = this.verde;
        }
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const signal = (semaforos, circuitos) => {
    //Esta función maneja la secuencia de los semaforos
    //normalizamos
    for (let i = 0; i < CANTIDAD; i++) {
        semaforos[i].setSecuencia(1);
    }
    for (let i = CANTIDAD ; i >= 0; i--) {
        if (circuitos[i].isOcupado()) {
            let secuencia = 5; // Comenzamos con secuencia 5
            for (let j = i - 1; j >= 0; j--) {
                semaforos[j].setSecuencia(secuencia);
                secuencia--; // Disminuimos secuencia en cada iteración
                if (secuencia < 1) break; // Aseguramos que no sea menor que 1
            }
            // break;
        }
    }
};

const dibujar = (elemento) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de dibujar
    // Dibujamos
    for (let i = 0; i < elemento.length; i++) {
        elemento[i].draw(ctx);
    }
};

//instancias
const CANTIDAD = 8;
const semaforos1 = [];
const circuitos1 = [];
const semaforos2 = [];
const circuitos2 = [];
const xVia1 = 250;
const xVia2 = 250;
const separationX = 180;

//Semaforos via 1
for (let i = 0; i < CANTIDAD; i++) {
    const semaforo = new Semaforo({
        x: xVia1 - 10 + i * separationX,
        y: 30,
        secuencia: 1,
        name: `A${CANTIDAD - i}`,
    });
    semaforos1.push(semaforo);
}

//Circuitos via 1
circuitos1.push(new Circuito({ x: 70, y: 150 }));
for (let i = 0; i < CANTIDAD; i++) {
    const circuito = new Circuito({ x: xVia1 + i * 180, y: 150 });
    circuitos1.push(circuito);
}

//Semaforos via 2
for (let i = 0; i < CANTIDAD; i++) {
    const semaforo = new Semaforo({
        x: 1500 - i * separationX,
        y: 350,
        secuencia: 1,
        name: `A${CANTIDAD - i}`,
    });
    semaforos2.push(semaforo);
}

//Circuitos via 2
for (let i = 0; i < CANTIDAD; i++) {
    const circuito = new Circuito({ 
        x: 1500 - i * 180, 
        y: 480 
    });
    circuitos2.push(circuito);
}
circuitos2.push(new Circuito({ x: 60, y: 480 }));

//eventos
dibujar([...semaforos1, ...circuitos1, ...semaforos2, ...circuitos2]);

let aux = CANTIDAD; // asi arranca en 0
let auxDes = CANTIDAD;
const lapso = 1000
// let nextAux = 0;
// let prevAux = 0;
let intervaloActivo = true;
const h2Intervalo = document.getElementById("avanzando");
const h2detenido = document.getElementById("detenido");
h2Intervalo.style.display = "block";
h2detenido.style.display = "none";


const moverseAscendente = (semaforos, circuitos) => {
    // Calcular el próximo índice
    const nextAux = aux < CANTIDAD  ? aux + 1 : 0;
    // Ocupar el nuevo circuito
    circuitos[nextAux].setOcupado(true);
    // Llamar a signal y dibujar
    signal(semaforos, circuitos);
    // Desocupar el circuito actual después de un retraso
    dibujar([...semaforos1, ...circuitos1, ...semaforos2, ...circuitos2]);
    setTimeout(() => {
        circuitos[aux].setOcupado(false);
        signal(semaforos, circuitos);
        aux = nextAux; // Actualizar 'aux' al nuevo índice ocupado
        dibujar([...semaforos1, ...circuitos1, ...semaforos2, ...circuitos2]);
    }, lapso+1000); // Desocupa el circuito después de 1 segundo
};
const moverseDescendente = (semaforos, circuitos) => {
    console.log(semaforos);
    console.log(circuitos);
    // Calcular el próximo índice
    // const prevAux  = auxDes > 0 ? auxDes - 1 : CANTIDAD;
    const nextAux = auxDes < CANTIDAD  ? auxDes + 1 : 0;
    // Ocupar el nuevo circuito
    circuitos[nextAux].setOcupado(true);
    // Llamar a signal y dibujar
    signal(semaforos, circuitos);
    // Desocupar el circuito actual después de un retraso
    dibujar([...semaforos1, ...circuitos1, ...semaforos2, ...circuitos2]);
    setTimeout(() => {
        //Desocupar
        circuitos[auxDes].setOcupado(false);
        signal(semaforos, circuitos);
        auxDes = nextAux; // Actualizar 'aux' al nuevo índice ocupado
        dibujar([...semaforos1, ...circuitos1, ...semaforos2, ...circuitos2]);
    }, lapso); // Desocupa el circuito después de 1 segundo
};

let intervalo = setInterval(() => {
    moverseAscendente(semaforos1, circuitos1);
    moverseDescendente(semaforos2, circuitos2);
}, 3000);
document.addEventListener("keydown", function (event) {
    if (event.key === "m") {
        moverseAscendente(semaforos1, circuitos1);
    }
    if (event.key === "n") {
        moverseDescendente(semaforos2, circuitos2);
    }

    if (event.key === " ") {
        if (!intervaloActivo) {
            intervalo = setInterval(() => {
                moverseAscendente(semaforos1, circuitos1);
                moverseDescendente(semaforos2, circuitos2);
            }, 3000);
            intervaloActivo = true;
            h2Intervalo.style.display = "block"; // Mostrar el elemento h2
            h2detenido.style.display = "none";
            console.log("Intervalo activado");
        } else {
            clearInterval(intervalo);
            intervaloActivo = false;
            h2Intervalo.style.display = "none"; // Ocultar el elemento h2
            h2detenido.style.display = "block";
            console.log("Intervalo desactivado");
        }
    }
});
