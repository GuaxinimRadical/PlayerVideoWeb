const corpoVideo = document.querySelector('.corpoVideo')

const video = document.querySelector('[raccon]')
const butao = document.querySelector('[raccon_play]')

const barraCompleta = document.querySelector('.barraCompleta')
const barraProgresso = document.querySelector('.barraProgesso')
const barraMouse = document.querySelector('.mouse')
const caixaTempoMouse = document.querySelector('.caixaTempoMouse')

const botaoMais10 = document.querySelector('[racconMore10]')
const botaoMenos10 = document.querySelector('[racconLess10]')
const botaoAbrirMenu = document.querySelector('.openMenu')
const menuTempoAvancar = document.querySelectorAll('.menu')

const iconePlay = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-play" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
</svg>`
const iconePause = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pause" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
</svg>`
const iconeMenos10 = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-clockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M3.17 6.706a5 5 0 0 1 7.103-3.16.5.5 0 1 0 .454-.892A6 6 0 1 0 13.455 5.5a.5.5 0 0 0-.91.417 5 5 0 1 1-9.375.789z"/>
<path fill-rule="evenodd" d="M8.147.146a.5.5 0 0 1 .707 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 1 1-.707-.708L10.293 3 8.147.854a.5.5 0 0 1 0-.708z"/>
</svg>`
const iconeMais10 = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-counterclockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M12.83 6.706a5 5 0 0 0-7.103-3.16.5.5 0 1 1-.454-.892A6 6 0 1 1 2.545 5.5a.5.5 0 1 1 .91.417 5 5 0 1 0 9.375.789z"/>
<path fill-rule="evenodd" d="M7.854.146a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 0 0 0 .708l2.5 2.5a.5.5 0 1 0 .708-.708L5.707 3 7.854.854a.5.5 0 0 0 0-.708z"/>
</svg>`

let segundosParaAvancar = 30

let mouseAtivo = true

butao.innerHTML = iconePlay

const duracao = document.querySelector('.tempoVideo')

butao.onclick = e => {
    if(video.paused){
        video.play()
        butao.innerHTML = iconePause
    } else {
        video.pause()
        butao.innerHTML = iconePlay
    }
}
botaoMais10.onclick = e => video.currentTime += segundosParaAvancar
botaoMenos10.onclick= e => video.currentTime -= segundosParaAvancar
botaoMais10.innerHTML = `+${segundosParaAvancar}`
botaoMenos10.innerHTML= `-${segundosParaAvancar}`

botaoAbrirMenu.onclick = e => {
    const displayMenu = menuTempoAvancar[0].style.display

    if(!displayMenu || displayMenu==='none'){
        menuTempoAvancar.forEach( h => h.style.display='flex')
    } else {
        menuTempoAvancar.forEach( h => h.style.display='none')
    }
}

menuTempoAvancar.forEach( h => { 
    h.onclick = e =>{
        const tempo = h.innerText.replace('s','')
        segundosParaAvancar = Number(tempo)

        botaoMais10.innerHTML = `+${segundosParaAvancar}`
        botaoMenos10.innerHTML= `-${segundosParaAvancar}`

        menuTempoAvancar.forEach( h => h.style.display='none')
    }
})

// Quando o mouse sai
corpoVideo.onmouseleave = e => mouseAtivo = false

// Quando o mouse entra
corpoVideo.onmouseenter = e => mouseAtivo = true


barraCompleta.onmouseleave = e => {
    barraMouse.style.display = 'none'
    caixaTempoMouse.style.display = 'none'
}

function formatarSegundos (i) {
    const minutos = Math.trunc(i/60)
    const segundos = Math.trunc(i%60)
    let zeroAdicional = ''
    
    if(segundos<10){
        zeroAdicional = '0'
    } 
    
    const tempoFormatado = `${minutos}:${zeroAdicional}${segundos}`
    
    return tempoFormatado
}

function displayGeral(display) {
    butao.style.display = display
    botaoMais10.style.display = display
    botaoMenos10.style.display = display
    botaoAbrirMenu.style.display = display
    duracao.style.display = display
    menuTempoAvancar.forEach( e =>{ 
        e.style.display = display==='none' ? display : e.style.display
    })

    if(display === 'none'){
        barraCompleta.style.height = '2%'
    } else {
        barraCompleta.style.height = '5%'
    }
}

video.addEventListener('mouseleave', event => {
    setTimeout(()=>{
        if(!mouseAtivo){
            displayGeral('none')
        } 
    },1000)  
})

video.addEventListener('mouseenter', event => displayGeral('block') )

barraCompleta.addEventListener('mousemove', event => {
    console.log(event.layerX)

    const posicaoMouseTela = event.layerX 
    const tamanhoTotalBarra = barraCompleta.clientWidth
    
    const porcetagemMouseNaBarra = posicaoMouseTela/tamanhoTotalBarra
    
    if(posicaoMouseTela>=2){
        const posicaoPonteiroNaBarra = `${porcetagemMouseNaBarra*100}%`
        barraMouse.style.left = posicaoPonteiroNaBarra
        barraMouse.style.display = 'block'


        const tempoMouse = video.duration*porcetagemMouseNaBarra
        caixaTempoMouse.style.left = `${porcetagemMouseNaBarra*100}%`
        caixaTempoMouse.style.display = 'block'
        caixaTempoMouse.innerHTML = formatarSegundos(tempoMouse)

        //Função que desse a barraProgresso com o tempo do mouse para baixo no começo
        if(porcetagemMouseNaBarra<=0.12){
            caixaTempoMouse.style.top = `100%`
        } else {
            caixaTempoMouse.style.top = `-100%`
        }

        //Função que não permite a barraProgresso passar do limite da esquerda
        if((porcetagemMouseNaBarra*100)>92){
            caixaTempoMouse.style.left = '92%'
        }
    } else {
        barraMouse.style.display = 'none'
        caixaTempoMouse.style.display = 'none'
    }

    barraCompleta.onclick = e => {
        if(porcetagemMouseNaBarra*100>=5){
            console.log(porcetagemMouseNaBarra)
            video.currentTime = video.duration*porcetagemMouseNaBarra
        }
    }
})

barraCompleta.addEventListener('click', event => {
    barraProgresso.style.width = `${(video.currentTime/video.duration)*100}% `
    
    const tempoAtual = formatarSegundos(video.currentTime)
    const tempoTotal = formatarSegundos(video.duration)
    
    duracao.innerHTML = `${tempoAtual} | ${tempoTotal}`
})

setInterval(
    () => {
        barraProgresso.style.width = `${(video.currentTime/video.duration)*100}% `
    
        const tempoAtual = formatarSegundos(video.currentTime)
        const tempoTotal = formatarSegundos(video.duration)
        
        duracao.innerHTML = `${tempoAtual} | ${tempoTotal}`
    } ,500)