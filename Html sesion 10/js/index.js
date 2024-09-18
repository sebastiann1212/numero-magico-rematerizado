let numberRandom = Math.floor(Math.random() * 100) + 1;
let numIntentos = 0;
let tiempoRestante = 30;
let intervalo;
let historialIntentos = [];



function iniciarJuego() {
    clearInterval(intervalo); // Clear any existing interval
    intervalo = setInterval(actualizarTemporizador, 1000);
    historialIntentos = [];
    actualizarHistoriaIntentos();
}

function actualizarTemporizador() {
    tiempoRestante--;
    document.querySelector("#temporizador").innerHTML = "Tiempo restante: " + tiempoRestante + " segundos";

    if (tiempoRestante <= 0) {
        clearInterval(intervalo);
        mostrarRechazoSocial("Se acabó el tiempo");
        mostrarBotonReiniciar();
        document.querySelector("#button").disabled = true;
    }
}

function adivinarNumero() {
    console.log(numberRandom);

    let ingresado = parseInt(document.querySelector('#numIngresado').value);

    if (ingresado <= 0) {
        numeroNegativo();
        return;
    }

    if (ingresado > 100) {
        numeroMayor100();
        return;
    }

    if (isNaN(ingresado)) {
        document.querySelector("#resultado").innerHTML = "Ingrese un numero";
        return;
    }

    historialIntentos.push(ingresado);
    actualizarHistoriaIntentos();


    if (numIntentos < 10) {
        if (ingresado === numberRandom) {
            clearInterval(intervalo);
            mostrarBotonReiniciar();
            mostrarFelicitaciones();
        } else {
            numIntentos++;
            if (ingresado < numberRandom) {
                document.querySelector("#predictor").innerHTML = "El numero es mayor";
            } else {
                document.querySelector("#predictor").innerHTML = "El numero es menor";
            }
            document.querySelector("#resultado").innerHTML = "No es, intenta de nuevo. Te quedan " + (10 - numIntentos) + " intentos.";
        }
    }

    if (numIntentos === 10 && ingresado !== numberRandom) {
        clearInterval(intervalo);
        mostrarRechazoSocial("Se acabaron los intentos");
        mostrarBotonReiniciar();
    }
}

function actualizarHistoriaIntentos(){
    let historial = document.querySelector("#historialIntentos");
    if(historial){
        historial.innerHTML = "Numeros intentados: "+historialIntentos.join(", ");
    }
}

function numeroMayor100(){
    swal.fire({
        title: '¡ Numero no permitido !',
        text: 'No permitimos numeros mayores a 100',
        icon:'question',
        confirmButtonText:'Ok'
    });
    document.querySelector("#resultado").innerHTML = "No permitimos numeros mayores a 100";
}

function numeroNegativo(){

    swal.fire({
        title: '¡ Numero no permitido !',
        text: 'No se permiten numeros negatvios.',
        icon: 'question',
        confirmButtonText: 'Ok'
    });
    document.querySelector("#resultado").innerHTML = "No permitidos numeros negativos:(";

}

function mostrarRechazoSocial(razon){
    swal.fire({
        title: '¡Fallaste!',
        text: razon +' \n ¡El numero correcto era: '+numberRandom+"!",
        icon: 'error',
        confirmButtonText:'Que mal'

    });
    document.querySelector("#resultado").innerHTML = "Perdiste, El número correcto era: " + numberRandom;

}



function mostrarBotonReiniciar() {
    document.querySelector("#buttonReiniciar").style.display = "inline";
    document.querySelector("#button").disabled = true;
}

function mostrarFelicitaciones() {
    Swal.fire({
        title: '¡Felicidades!',
        text: '¡Has adivinado el número ' + numberRandom + '!',
        icon: 'success',
        confirmButtonText: 'Genial'
    });
    document.querySelector("#resultado").innerHTML = "¡Felicidades! Adivinaste, el número era: " + numberRandom;
}



function reiniciarJuego() {
    clearInterval(intervalo);
    numberRandom = Math.floor(Math.random() * 100) + 1;
    numIntentos = 0;
    tiempoRestante = 30;
    historialIntentos =[];
    document.querySelector("#resultado").innerHTML = "";
    document.querySelector("#predictor").innerHTML = "";
    document.querySelector("#numIngresado").value = "";
    document.querySelector("#buttonReiniciar").style.display = "none";
    document.querySelector("#button").disabled = false;
    document.querySelector("#temporizador").innerHTML = "Tiempo restante: 30 segundos";
    actualizarHistoriaIntentos();
    iniciarJuego();
}

// Initialize the game when the page loads
window.onload = iniciarJuego;
