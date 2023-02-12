//Nota: por buenas practicas se nombran las variables en ingles.

// Crear variables.
let  tarjetasDestapadas = 0,
tarjeta1 = null,
tarjeta2 = null,
primerResultado = null,
segundoResultado = null,
movimientos = 0,
aciertos = 0,
temporizador = false,
timer = 40,
timerInicial = timer,
tiempoRegresivoId = null,

//Array para sortear números
numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8],

//Variables sonidos
gameOver = new Audio('./sounds/GameOver.mp3'),
click = new Audio('./sounds/Click_3.mp3'),
logro = new Audio('./sounds/Winn.mp3'),
error = new Audio('./sounds/error.mp3'),
over = new Audio('./sounds/Over.mp3'),
good = new Audio('./sounds/Good.mp3'),
song = new Audio('./sounds/DC.mp3'),

//Variables apundan al html
mostrarMovimientos = document.getElementById('movimientos'),
mostrarAciertos = document.getElementById('aciertos'),
mostrarTiempo = document.getElementById('t-restante'),
music = document.getElementById('music'),

countMusic = 0

music.addEventListener('click', () => {
    if (countMusic === 0) {
        countMusic = 1
        song.play()
        music.innerHTML = `<span class="material-symbols-outlined" style="color: aliceblue;"> music_note </span>`
    } else {
        countMusic = 0
        song.pause()
        music.innerHTML =`<span class="material-symbols-outlined" style="color: aliceblue;"> Play_Arrow </span>`
    }
})

function bloquearTarejetas() {
    for (let i = 0; i <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i)
        tarjetaBloqueada.innerHTML = `<img src ="./img/${numeros[i]}.png" alt="Icono">`
        tarjetaBloqueada.disabled = true
        over.play()
    }
}

// 1 Crear metodo para sortear el orden del arrelgo.
numeros = numeros.sort(() => { return Math.random() - 0.7 })
console.log(numeros)

//Funciones
function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--
        mostrarTiempo.innerHTML = `Tiempo: ${timer}s`
        if (timer === 0) {
            clearInterval(tiempoRegresivoId)
            bloquearTarejetas()
            gameOver.play()
        }
    },1000)
}


function bloquearTarejetas() {
    for (let i = 0; i <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i)
        tarjetaBloqueada.innerHTML = `<img src ="./img/${numeros[i]}.png" alt="Icono">`
        tarjetaBloqueada.disabled = true
        over.play()
    }
}


//2  Declaro la funcion principal (destapar).
function destapar(id) {

    if (temporizador === false) {
        contarTiempo()
        temporizador = true
    }

    tarjetasDestapadas++
    console.log(tarjetasDestapadas)

    if (tarjetasDestapadas === 1) {
        // Mostrar primer número.
        tarjeta1 = document.getElementById(id)
        primerResultado = numeros[id]
        tarjeta1.innerHTML = `<img src ="./img/${primerResultado}.png" alt=" ">`
        click.play()
        // Desabilitar el primer botón.
        tarjeta1.disabled = true
    } else if (tarjetasDestapadas === 2) {
        //Mostrar Segundo número.
        tarjeta2 = document.getElementById(id)
        segundoResultado = numeros[id]
        tarjeta2.innerHTML = `<img src ="./img/${segundoResultado}.png" alt=" ">`
        error.play()
        //Desabilitar segundo botón.
        tarjeta2.disabled = true

        //Incrementar movimientos.
        movimientos++
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`

        if (primerResultado === segundoResultado) {
            //Encerrar el contador de tarjetas destapadas.
            tarjetasDestapadas = 0
            good.play()
            //Aumentar aciertos.
            aciertos++
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`

            if (aciertos === 8) {
                logro.play()
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 👌`
                mostrarTiempo.innerHTML = `Tu tiempo\nfue: ${timerInicial - timer}s`
                mostrarMovimientos.innerHTML = `Moviemientos ${movimientos} 🙌`
                clearInterval(tiempoRegresivoId)

            }
        } else {
            // Mostrarr valores y volver a tapar.
            setTimeout(() => {
                tarjeta1.innerHTML = ''
                tarjeta2.innerHTML = ''
                tarjeta1.disabled = false
                tarjeta2.disabled = false
                tarjetasDestapadas = 0
            },500)
        }
    }
}

