//Declaracion de variables
let mostrarTarjetas= 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador= false;
let tiempo= 30;
let tiemporesId= null;
let tiempoInicial= tiempo;

//Enlaze con HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("tiempo-restante");

//Numeros aleatorios para cada boton
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{
    return Math.random()-0.5
})
console.log(numeros);

//Funciones
//Funcion para cartas tapadas
function cartas(){
    for(let i = 0; i<=15; i++){
        let cartas_bloqueadas = document.getElementById(i);
        cartas_bloqueadas.innerHTML = numeros[i];
        cartas_bloqueadas.disabled = true;
    }
    mostrarAciertos.innerHTML= `Aciertos: ${aciertos} Perdiste 💀`;
    mostrarTiempo.innerHTML= `Tiempo: Se ha agotado ⌛`;
    mostrarMovimientos.innerHTML= `Movimientos: ${movimientos} 👀`;
}
//Funcion para el tiempo
function Cronometro(){
    tiemporesId = setInterval(()=>{
        tiempo--;
        mostrarTiempo.innerHTML= `Tiempo: ${tiempo} seconds`;
        if(tiempo === 0){
            clearInterval(tiemporesId);
            cartas();
        }
    },1000);
}
//Funcion para validad si la opcion seleccionada coincide con la anterior
function show(id){

    if(temporizador === false){
        Cronometro();
        temporizador= true;
    }

    mostrarTarjetas++;
    console.log(mostrarTarjetas);

    if(mostrarTarjetas === 1){
        //Mostrar el primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML = primerResultado;

        //Desactivar el primer botón
        tarjeta1.disabled = true;

    }else if(mostrarTarjetas === 2){
        //Mostrar el segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        //Desactivar el segundo botón
        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado === segundoResultado){
            //reiniciar contador a 0
            mostrarTarjetas = 0;

            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML= `Aciertos: ${aciertos}`;

            if(aciertos === 8){
                clearInterval(tiemporesId);
                mostrarAciertos.innerHTML= `Aciertos: ${aciertos} Ganaste👏`;
                mostrarTiempo.innerHTML= `Tiempo: ${tiempoInicial - tiempo}s ⌛`;
                mostrarMovimientos.innerHTML= `Movimientos: ${movimientos} 💪😱`;
            }
        }else{
            //Mostrar momentáneamente los valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML= "?";
                tarjeta2.innerHTML= "?";
                tarjeta1.disabled= false;
                tarjeta2.disabled= false;
                mostrarTarjetas= 0;
            },800);
        }
    }
}
