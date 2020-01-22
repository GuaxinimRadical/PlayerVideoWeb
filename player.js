
// const css = '<style> [raccon]{ background-color: blue; } </style>'

// document.querySelector('html').src += css

const corpoVideo = document.querySelector('.corpoVideo')

const video = document.querySelector('[raccon]')
const butao = document.querySelector('[raccon_play]')
const barraCompleta = document.querySelector('.barraCompleta')
const barra = document.querySelector('.barra')
const barraMouse = document.querySelector('.mouse')

const botaoMais10 = document.querySelector('[racconMore10]')
const botaoMenos10 = document.querySelector('[racconLess10]')
let segundosParaAvancar = 30

const duracao = document.querySelector('.tempoVideo')

butao.onclick = e => {
    if(video.paused){
        video.play()
        butao.src = '../PlayerVideo/imgs/pause.png'
    } else {
        video.pause()
        butao.src = '../PlayerVideo/imgs/play.png'
    }
}
botaoMais10.onclick = e => video.currentTime += segundosParaAvancar
botaoMenos10.onclick= e => video.currentTime -= segundosParaAvancar
botaoMais10.innerHTML = `+${segundosParaAvancar}`
botaoMenos10.innerHTML= `-${segundosParaAvancar}`

barraCompleta.onmouseleave = e => barraMouse.style.display = 'none'


function atualizacaoStatus() {

    barraCompleta.addEventListener('mousemove' , (event) => {
        const posicaoMouseTela = event.layerX 
        const tamanhoTotalBarra = barraCompleta.clientWidth

        const porcetagemMouseNaBarra = posicaoMouseTela/tamanhoTotalBarra
        
        if(posicaoMouseTela>=5){
            const posicaoPonteiroNaBarra = `${porcetagemMouseNaBarra*100}%`
            barraMouse.style.left = posicaoPonteiroNaBarra
            barraMouse.style.display = 'block'
        } else {
            barraMouse.style.display = 'none'
        }

        barraCompleta.onclick = e => {
            console.log(porcetagemMouseNaBarra)
            video.currentTime = video.duration*porcetagemMouseNaBarra
        }
    });

    barra.style.width = `${(video.currentTime/video.duration)*100}% `
    const zero = tempo => (Math.trunc((tempo%60)))<10 ? '0' : '' ;

    const tempoAtual = `${Math.trunc(((video.currentTime)/60))}:${zero(video.currentTime)}${Math.trunc((video.currentTime%60))}`
    const tempoTotal = `${Math.trunc(((video.duration)/60))}:${zero(video.duration)}${Math.trunc((video.duration%60))}`

    duracao.innerHTML = `${tempoAtual} | ${tempoTotal}`
}

setInterval(atualizacaoStatus,500)



/*
const aparecimentoElementos = e => {
    butao.style.display = 'block'
    botaoMais10.style.display = 'block'
    botaoMenos10.style.display = 'block'
}

corpoVideo.onmouseout = e=> {
    setTimeout(() => {
    butao.style.display = 'none'
    botaoMais10.style.display = 'none'
    botaoMenos10.style.display = 'none'
    },500)
}

video.onmousemove = aparecimentoElementos
butao.onmousemove = aparecimentoElementos
barra.onmousemove = aparecimentoElementos
*/